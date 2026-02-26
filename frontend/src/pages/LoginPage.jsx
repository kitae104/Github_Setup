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

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 id={headingId} className="text-lg font-semibold text-slate-900">
                로그인
            </h2>
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
                <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-1.5 block">이메일</span>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
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
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                </label>
                {error && (
                    <p className="text-sm font-medium text-red-600">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
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
};

export default LoginPage;
