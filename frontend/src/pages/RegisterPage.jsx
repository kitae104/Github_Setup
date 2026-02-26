import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { registerUser } from "../api/auth";

function RegisterPage({
    isModal = false,
    headingId,
    onSwitchToLogin,
    onRegisterSuccess,
}) {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "", fullName: "" });
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
            await registerUser(form);
            if (onRegisterSuccess) {
                onRegisterSuccess();
            } else {
                navigate("/login");
            }
        } catch (err) {
            const message =
                err?.response?.data?.message ||
                err?.response?.data?.error?.message ||
                "회원가입에 실패했습니다.";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 id={headingId} className="text-lg font-semibold text-slate-900">
                회원가입
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
                    <span className="mb-1.5 block">비밀번호 (8자 이상)</span>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        minLength={8}
                        required
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
                    />
                </label>
                <label className="block text-sm font-medium text-slate-700">
                    <span className="mb-1.5 block">이름</span>
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
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
                    {loading ? "가입 중..." : "회원가입"}
                </button>
            </form>
            {isModal ? (
                <p className="mt-4 text-sm text-slate-600">
                    이미 계정이 있나요?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                    >
                        로그인
                    </button>
                </p>
            ) : (
                <p className="mt-4 text-sm text-slate-600">
                    이미 계정이 있나요?{" "}
                    <Link
                        to="/login"
                        className="font-semibold text-slate-900 underline-offset-2 hover:underline"
                    >
                        로그인
                    </Link>
                </p>
            )}
        </section>
    );
}

RegisterPage.propTypes = {
    isModal: PropTypes.bool,
    headingId: PropTypes.string,
    onSwitchToLogin: PropTypes.func,
    onRegisterSuccess: PropTypes.func,
};

export default RegisterPage;
