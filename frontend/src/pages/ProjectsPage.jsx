import { useMemo, useState } from "react";

const SAMPLE_PROJECTS = [
    {
        id: 1,
        name: "인증 고도화",
        owner: "Backend Team",
        status: "진행 중",
        updatedAt: "2026-02-26",
        description: "JWT 만료/재발급 및 보안 정책 정비",
    },
    {
        id: 2,
        name: "프론트 UI 정리",
        owner: "Frontend Team",
        status: "대기",
        updatedAt: "2026-02-24",
        description: "공통 컴포넌트/페이지 레이아웃 통일",
    },
    {
        id: 3,
        name: "통합 테스트 확장",
        owner: "QA Team",
        status: "완료",
        updatedAt: "2026-02-20",
        description: "핵심 인증 플로우 E2E 시나리오 추가",
    },
];

const statusClassName = {
    "진행 중": "bg-blue-100 text-blue-700",
    대기: "bg-amber-100 text-amber-700",
    완료: "bg-emerald-100 text-emerald-700",
};

function ProjectsPage() {
    const [keyword, setKeyword] = useState("");

    const filteredProjects = useMemo(() => {
        const normalizedKeyword = keyword.trim().toLowerCase();
        if (!normalizedKeyword) {
            return SAMPLE_PROJECTS;
        }

        return SAMPLE_PROJECTS.filter((project) => {
            return (
                project.name.toLowerCase().includes(normalizedKeyword) ||
                project.owner.toLowerCase().includes(normalizedKeyword) ||
                project.description.toLowerCase().includes(normalizedKeyword)
            );
        });
    }, [keyword]);

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-slate-900">
                        프로젝트 대시보드
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        프로젝트 진행 상태를 확인하고 빠르게 검색할 수 있습니다.
                    </p>
                </div>
                <div className="w-full sm:w-72">
                    <label
                        htmlFor="project-search"
                        className="block text-xs font-medium text-slate-500"
                    >
                        프로젝트 검색
                    </label>
                    <input
                        id="project-search"
                        type="text"
                        value={keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        placeholder="프로젝트명, 담당팀"
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                </div>
            </div>

            <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700">
                총{" "}
                <strong className="font-semibold text-slate-900">
                    {filteredProjects.length}
                </strong>{" "}
                개의 프로젝트
            </div>

            <div className="mt-4 grid gap-3">
                {filteredProjects.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">
                        검색 결과가 없습니다.
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <article
                            key={project.id}
                            className="rounded-lg border border-slate-200 p-4"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div>
                                    <h3 className="text-sm font-semibold text-slate-900">
                                        {project.name}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-600">
                                        {project.description}
                                    </p>
                                </div>
                                <span
                                    className={`rounded-full px-2 py-1 text-xs font-medium ${
                                        statusClassName[project.status] ||
                                        "bg-slate-100 text-slate-700"
                                    }`}
                                >
                                    {project.status}
                                </span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                                <span>담당: {project.owner}</span>
                                <span>업데이트: {project.updatedAt}</span>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </section>
    );
}

export default ProjectsPage;
