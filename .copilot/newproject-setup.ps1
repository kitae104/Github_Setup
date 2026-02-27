[CmdletBinding(SupportsShouldProcess = $true)]
param(
    [string]$RepoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path,

    [string]$OldBasePackage = "com.example.backend",
    [string]$NewBasePackage,

    [string]$OldBackendGroupId = "com.example",
    [string]$NewBackendGroupId,

    [string]$OldBackendArtifactId = "backend",
    [string]$NewBackendArtifactId,

    [string]$OldBrandText = "Setup PM",
    [string]$NewBrandText,

    [string]$OldDbName = "setup",
    [string]$NewDbName,
    [string]$NewDbUser,
    [string]$NewDbPassword,

    [string]$OldFrontendOrigin = "http://localhost:5173",
    [string]$NewFrontendOrigin,

    [string]$OldBackendUrl = "http://localhost:8080",
    [string]$NewBackendUrl,

    [string]$NewProjectName,
    [string]$NewJwtSecret,
    [string]$NewJwtExpSeconds,

    [ValidateSet("update", "validate", "none")]
    [string]$JpaDdlAuto,

    [switch]$MovePackageDirectories,
    [switch]$RunVerify
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Convert-PackageToPath {
    param([Parameter(Mandatory = $true)][string]$Package)
    return ($Package -replace "\.", [IO.Path]::DirectorySeparatorChar)
}

function Update-FileContent {
    param(
        [Parameter(Mandatory = $true)][string]$Path,
        [Parameter(Mandatory = $true)][scriptblock]$Updater,
        [ref]$ChangedCount
    )

    if (-not (Test-Path $Path)) {
        return
    }

    $original = Get-Content -Path $Path -Raw -Encoding UTF8
    $updated = & $Updater $original

    if ($updated -ne $original) {
        if ($PSCmdlet.ShouldProcess($Path, "Update file content")) {
            Set-Content -Path $Path -Value $updated -Encoding UTF8
        }
        $ChangedCount.Value++
        Write-Host "Updated: $Path"
    }
}

function Move-PackageDirectory {
    param(
        [Parameter(Mandatory = $true)][string]$JavaRoot,
        [Parameter(Mandatory = $true)][string]$OldPackage,
        [Parameter(Mandatory = $true)][string]$NewPackage,
        [ref]$MovedCount
    )

    $oldPath = Join-Path $JavaRoot (Convert-PackageToPath -Package $OldPackage)
    $newPath = Join-Path $JavaRoot (Convert-PackageToPath -Package $NewPackage)

    if (-not (Test-Path $oldPath)) {
        return
    }

    if (-not (Test-Path $newPath)) {
        if ($PSCmdlet.ShouldProcess($newPath, "Create package directory")) {
            New-Item -Path $newPath -ItemType Directory -Force | Out-Null
        }
    }

    $children = Get-ChildItem -Path $oldPath -Force
    foreach ($child in $children) {
        if ($PSCmdlet.ShouldProcess($child.FullName, "Move into $newPath")) {
            Move-Item -Path $child.FullName -Destination $newPath -Force
        }
    }

    if ($PSCmdlet.ShouldProcess($oldPath, "Remove old package directory")) {
        Remove-Item -Path $oldPath -Recurse -Force
    }

    $current = Split-Path -Path $oldPath -Parent
    while ($current -and ($current -ne $JavaRoot) -and (Test-Path $current)) {
        $remaining = @(Get-ChildItem -Path $current -Force)
        if ($remaining.Count -gt 0) {
            break
        }

        if ($PSCmdlet.ShouldProcess($current, "Remove empty directory")) {
            Remove-Item -Path $current -Force
        }
        $current = Split-Path -Path $current -Parent
    }

    $MovedCount.Value++
    Write-Host "Moved package directory: $oldPath -> $newPath"
}

$RepoRoot = (Resolve-Path $RepoRoot).Path
Set-Location $RepoRoot

$changedFiles = 0
$movedPackages = 0

$textReplacements = [ordered]@{}

if ($NewBasePackage) {
    $textReplacements[$OldBasePackage] = $NewBasePackage
}
if ($NewBrandText) {
    $textReplacements[$OldBrandText] = $NewBrandText
}
if ($NewBackendUrl) {
    $textReplacements[$OldBackendUrl] = $NewBackendUrl
}
if ($NewFrontendOrigin) {
    $textReplacements[$OldFrontendOrigin] = $NewFrontendOrigin
}
if ($NewDbName) {
    $textReplacements["jdbc:mysql://localhost:3306/$OldDbName"] = "jdbc:mysql://localhost:3306/$NewDbName"
}

$includeExtensions = @(
    ".java", ".xml", ".properties", ".md", ".js", ".jsx", ".json", ".yml", ".yaml", ".txt"
)

$allFiles = Get-ChildItem -Path $RepoRoot -Recurse -File | Where-Object {
    $extAllowed = $includeExtensions -contains $_.Extension.ToLowerInvariant()
    $isIgnored = $_.FullName -match "\\node_modules\\|\\backend\\target\\|\\frontend\\dist\\|\\.git\\|\\.copilot\\"
    $extAllowed -and (-not $isIgnored)
}

foreach ($file in $allFiles) {
    Update-FileContent -Path $file.FullName -Updater {
        param($content)
        $next = $content
        foreach ($entry in $textReplacements.GetEnumerator()) {
            $next = $next.Replace([string]$entry.Key, [string]$entry.Value)
        }
        return $next
    } -ChangedCount ([ref]$changedFiles)
}

$pomPath = Join-Path $RepoRoot "backend\pom.xml"
Update-FileContent -Path $pomPath -Updater {
    param($content)
    $next = $content

    if ($NewBackendGroupId) {
        $next = $next.Replace("<groupId>$OldBackendGroupId</groupId>", "<groupId>$NewBackendGroupId</groupId>")
    }

    if ($NewBackendArtifactId) {
        $next = $next.Replace("<artifactId>$OldBackendArtifactId</artifactId>", "<artifactId>$NewBackendArtifactId</artifactId>")
        $next = $next.Replace("<name>$OldBackendArtifactId</name>", "<name>$NewBackendArtifactId</name>")
    }

    if ($NewProjectName) {
        $next = [regex]::Replace($next, "<description>.*?</description>", "<description>$NewProjectName</description>", "Singleline")
    }

    return $next
} -ChangedCount ([ref]$changedFiles)

$secretPath = Join-Path $RepoRoot "backend\src\main\resources\secret.properties"
Update-FileContent -Path $secretPath -Updater {
    param($content)
    $next = $content

    if ($NewDbUser) {
        $next = [regex]::Replace($next, "(?m)^spring\.datasource\.username=.*$", "spring.datasource.username=$NewDbUser")
    }

    if ($NewDbPassword) {
        $next = [regex]::Replace($next, "(?m)^spring\.datasource\.password=.*$", "spring.datasource.password=$NewDbPassword")
    }

    if ($NewJwtSecret) {
        $next = [regex]::Replace($next, "(?m)^app\.jwt\.secret=.*$", "app.jwt.secret=$NewJwtSecret")
    }

    if ($NewJwtExpSeconds) {
        $next = [regex]::Replace($next, "(?m)^app\.jwt\.expiration-seconds=.*$", "app.jwt.expiration-seconds=$NewJwtExpSeconds")
    }

    return $next
} -ChangedCount ([ref]$changedFiles)

$appPropPath = Join-Path $RepoRoot "backend\src\main\resources\application.properties"
Update-FileContent -Path $appPropPath -Updater {
    param($content)
    $next = $content

    if ($JpaDdlAuto) {
        $next = [regex]::Replace($next, "(?m)^spring\.jpa\.hibernate\.ddl-auto=.*$", "spring.jpa.hibernate.ddl-auto=$JpaDdlAuto")
    }

    return $next
} -ChangedCount ([ref]$changedFiles)

if ($MovePackageDirectories -and $NewBasePackage) {
    $mainJavaRoot = Join-Path $RepoRoot "backend\src\main\java"
    $testJavaRoot = Join-Path $RepoRoot "backend\src\test\java"

    Move-PackageDirectory -JavaRoot $mainJavaRoot -OldPackage $OldBasePackage -NewPackage $NewBasePackage -MovedCount ([ref]$movedPackages)
    Move-PackageDirectory -JavaRoot $testJavaRoot -OldPackage $OldBasePackage -NewPackage $NewBasePackage -MovedCount ([ref]$movedPackages)
}

if ($RunVerify) {
    Push-Location (Join-Path $RepoRoot "backend")
    try {
        if ($PSCmdlet.ShouldProcess("backend", "Run mvn -q test")) {
            & mvn -q test
        }
    }
    finally {
        Pop-Location
    }

    Push-Location (Join-Path $RepoRoot "frontend")
    try {
        if ($PSCmdlet.ShouldProcess("frontend", "Run npm install")) {
            & npm install
        }
        if ($PSCmdlet.ShouldProcess("frontend", "Run npm run build")) {
            & npm run build
        }
    }
    finally {
        Pop-Location
    }
}

Write-Host ""
Write-Host "Completed new project setup script."
Write-Host "Changed files: $changedFiles"
Write-Host "Moved package directories: $movedPackages"
Write-Host "Repo root: $RepoRoot"
