import { Link, NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function Navbar({ onLoginClick, onRegisterClick }) {
    const navigate = useNavigate();

    const onProjectMenuChange = (event) => {
        const value = event.target.value;
        if (!value) {
            return;
        }
        navigate(value);
        event.target.value = "";
    };

    return (
        <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
            <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="text-lg font-bold tracking-tight text-slate-900"
                >
                    Setup PM
                </Link>

                <div className="flex items-center gap-2 sm:gap-3">
                    <nav className="flex items-center gap-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >
                            홈
                        </NavLink>
                        <NavLink
                            to="/me"
                            className={({ isActive }) =>
                                `rounded-lg px-3 py-2 text-sm font-medium transition ${
                                    isActive
                                        ? "bg-slate-900 text-white"
                                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                                }`
                            }
                        >
                            내 정보
                        </NavLink>
                        <button
                            type="button"
                            onClick={onLoginClick}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            로그인
                        </button>
                        <button
                            type="button"
                            onClick={onRegisterClick}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            회원가입
                        </button>
                    </nav>

                    <select
                        defaultValue=""
                        onChange={onProjectMenuChange}
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    >
                        <option value="" disabled>
                            프로젝트 메뉴
                        </option>
                        <option value="/projects">프로젝트 대시보드</option>
                    </select>
                </div>
            </div>
        </header>
    );
}

Navbar.propTypes = {
    onLoginClick: PropTypes.func,
    onRegisterClick: PropTypes.func,
};

export default Navbar;
