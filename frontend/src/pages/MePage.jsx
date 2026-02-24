import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMe } from "../api/auth";
import { clearToken, getToken } from "../api/client";

function MePage() {
    const navigate = useNavigate();
    const [me, setMe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const token = getToken();
        if (!token) {
            navigate("/login", { replace: true });
            return;
        }

        const loadMe = async () => {
            try {
                const data = await fetchMe();
                setMe(data);
            } catch (err) {
                const status = err?.response?.status;
                if (status === 401) {
                    clearToken();
                    navigate("/login", { replace: true });
                    return;
                }
                const message =
                    err?.response?.data?.message ||
                    err?.response?.data?.error?.message ||
                    "내 정보 조회에 실패했습니다.";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        loadMe();
    }, [navigate]);

    const onLogout = () => {
        clearToken();
        navigate("/login", { replace: true });
    };

    if (loading) {
        return <section className="card">로딩 중...</section>;
    }

    if (error) {
        return (
            <section className="card">
                <h2>내 정보</h2>
                <p className="error">{error}</p>
                <button type="button" onClick={onLogout}>
                    로그인 페이지로 이동
                </button>
            </section>
        );
    }

    return (
        <section className="card">
            <h2>내 정보</h2>
            <div className="me-row">
                <span>이메일</span>
                <strong>{me?.email}</strong>
            </div>
            <div className="me-row">
                <span>이름</span>
                <strong>{me?.fullName || "-"}</strong>
            </div>
            <button type="button" onClick={onLogout}>
                로그아웃
            </button>
        </section>
    );
}

export default MePage;
