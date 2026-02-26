import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { loginUser } from "../api/auth";
import { setToken } from "../api/client";

function LoginPage({
    isModal = false,
    headingId,
    onSwitchToRegister,
    onLoginSuccess,
    onClose,
}) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setLoading(true);

        try {
            const data = await loginUser(form);
            setToken(data.accessToken);
            if (onLoginSuccess) {
                onLoginSuccess(data);
            } else {
                navigate("/me");
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error?.message ||
                "로그인에 실패했습니다.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    const onCloseClick = () => {
        if (onClose) {
            onClose();
            return;
        }
        navigate("/", { replace: true });
    };

    return (
        <section className="glass-panel rounded-xl p-6">
            <div className="flex items-start justify-between gap-3">
                <h2
                    id={headingId}
                    className="text-lg font-semibold text-slate-900"
                >
                    로그인
                </h2>
                <button
                    type="button"
                    onClick={onCloseClick}
                    className="glass-subtle rounded-md px-2 py-1 text-sm text-slate-700 transition hover:bg-white/70 hover:text-slate-900"
                    aria-label="로그인 닫기"
                >
                    ✕
                </button>
            </div>
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-1.5 block">이메일</span>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        required
                        className="glass-input w-full rounded-lg px-3 py-2 outline-none transition"
                    />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-1.5 block">비밀번호</span>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        required
                        className="glass-input w-full rounded-lg px-3 py-2 outline-none transition"
                    />
                </label>
                {error && (
                    <p className="text-sm font-medium text-red-600">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="glass-button w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {loading ? "로그인 중..." : "로그인"}
                </button>
            </form>
            {isModal ? (
                <p className="mt-4 text-sm text-slate-600">
                    계정이 없나요?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                    >
                        회원가입
                    </button>
                </p>
            ) : (
                <p className="mt-4 text-sm text-slate-600">
                    계정이 없나요?{" "}
                    <Link
                        to="/register"
                        className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                    >
                        회원가입
                    </Link>
                </p>
            )}
        </section>
    );
}

LoginPage.propTypes = {
    isModal: PropTypes.bool,
    headingId: PropTypes.string,
    onSwitchToRegister: PropTypes.func,
    onLoginSuccess: PropTypes.func,
    onClose: PropTypes.func,
};

export default LoginPage;
