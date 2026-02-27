드라이런(변경 없이 미리보기):
.[newproject-setup.ps1](http://_vscodecontentref_/0) -NewProjectName "Acme Workspace" -NewBrandText "Acme PM" -NewBackendGroupId "com.acme" -NewBackendArtifactId "acme-backend" -NewBasePackage "com.acme.workspace" -NewDbName "acme_db" -NewDbUser "acme_user" -NewDbPassword "change-me" -NewFrontendOrigin "http://localhost:5173" -NewBackendUrl "http://localhost:8080" -NewJwtSecret "REPLACE_WITH_LONG_RANDOM_SECRET" -NewJwtExpSeconds "3600" -JpaDdlAuto "validate" -MovePackageDirectories -WhatIf

실제 적용:
.[newproject-setup.ps1](http://_vscodecontentref_/1) -NewProjectName "Acme Workspace" -NewBrandText "Acme PM" -NewBackendGroupId "com.acme" -NewBackendArtifactId "acme-backend" -NewBasePackage "com.acme.workspace" -NewDbName "acme_db" -NewDbUser "acme_user" -NewDbPassword "change-me" -NewFrontendOrigin "http://localhost:5173" -NewBackendUrl "http://localhost:8080" -NewJwtSecret "REPLACE_WITH_LONG_RANDOM_SECRET" -NewJwtExpSeconds "3600" -JpaDdlAuto "validate" -MovePackageDirectories -RunVerify

 지금 값(프로젝트명/패키지명/DB명)만 알려주시면, 네 프로젝트 기준으로 완성본 1줄로 다시 맞춰 작성해줘.