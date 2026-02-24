import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { setToken } from "../api/client";

function LoginPage() {
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
            navigate("/");
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
        <section className="card">
            <h2>로그인</h2>
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
                    비밀번호
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={onChange}
                        required
                    />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "로그인 중..." : "로그인"}
                </button>
            </form>
            <p>
                계정이 없나요? <Link to="/register">회원가입</Link>
            </p>
        </section>
    );
}

export default LoginPage;
