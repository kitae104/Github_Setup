import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

function RegisterPage() {
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
            navigate("/login");
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
        <section className="card">
            <h2>회원가입</h2>
            <form onSubmit={onSubmit} className="form">
                <label>
                    이메일
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        required
                    />
                </label>
                <label>
                    비밀번호 (8자 이상)
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        minLength={8}
                        required
                    />
                </label>
                <label>
                    이름
                    <input
                        type="text"
                        name="fullName"
                        value={form.fullName}
                        onChange={onChange}
                    />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "가입 중..." : "회원가입"}
                </button>
            </form>
            <p>
                이미 계정이 있나요? <Link to="/login">로그인</Link>
            </p>
        </section>
    );
}

export default RegisterPage;
