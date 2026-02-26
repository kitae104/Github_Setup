import {
    FaArrowRight,
    FaCirclePlay,
    FaShieldHalved,
    FaBolt,
    FaLayerGroup,
} from "react-icons/fa6";
import PropTypes from "prop-types";

function LandingPage({ onLoginClick, onRegisterClick }) {
    return (
        <section className="space-y-6">
            <article className="relative overflow-hidden rounded-2xl bg-slate-900 text-white shadow-sm">
                <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80"
                    alt="팀이 협업하는 랜딩 페이지 배경"
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-900/65" />
                <div className="relative z-10 px-6 py-12 sm:px-8 sm:py-16">
                    <p className="text-sm font-semibold text-slate-200">
                        2026 Product Launch
                    </p>
                    <h1 className="mt-2 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
                        인증과 프로젝트 관리를 하나의 워크스페이스에서 빠르게
                        시작하세요
                    </h1>
                    <p className="mt-4 max-w-2xl text-sm text-slate-200 sm:text-base">
                        안정적인 JWT 인증, 직관적인 대시보드, 확장 가능한 API
                        구조를 기반으로 팀 생산성을 높일 수 있습니다.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={onRegisterClick}
                            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                        >
                            <FaArrowRight />
                            시작하기
                        </button>
                        <button
                            type="button"
                            onClick={onLoginClick}
                            className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                        >
                            <FaCirclePlay />
                            로그인
                        </button>
                    </div>
                </div>
            </article>

            <article className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <FaShieldHalved />
                    </div>
                    <h2 className="mt-3 text-base font-semibold text-slate-900">
                        보안 중심 인증
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        토큰 기반 인증 흐름과 인터셉터 구조로 안전한 요청 체계를
                        유지합니다.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <FaBolt />
                    </div>
                    <h2 className="mt-3 text-base font-semibold text-slate-900">
                        빠른 개발 속도
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        React + Vite + Tailwind 기반으로 기능 개발부터 배포까지
                        빠르게 진행할 수 있습니다.
                    </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                        <FaLayerGroup />
                    </div>
                    <h2 className="mt-3 text-base font-semibold text-slate-900">
                        확장 가능한 구조
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                        페이지/컴포넌트/API 모듈이 분리되어 기능 추가와
                        유지보수가 용이합니다.
                    </p>
                </div>
            </article>
        </section>
    );
}

LandingPage.propTypes = {
    onLoginClick: PropTypes.func,
    onRegisterClick: PropTypes.func,
};

export default LandingPage;
