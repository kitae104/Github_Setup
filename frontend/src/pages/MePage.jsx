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
        return (
            <section className="glass-panel rounded-xl p-6 text-sm text-slate-600">
                로딩 중...
            </section>
        );
    }

    if (error) {
        return (
            <section className="glass-panel rounded-xl p-6">
                <h2 className="text-lg font-semibold text-slate-900">
                    내 정보
                </h2>
                <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
                <button
                    type="button"
                    onClick={onLogout}
                    className="glass-button mt-4 rounded-lg px-4 py-2 text-sm font-semibold transition"
                >
                    로그인 페이지로 이동
                </button>
            </section>
        );
    }

    return (
        <section className="glass-panel rounded-xl p-6">
            <h2 className="text-lg font-semibold text-slate-900">내 정보</h2>
            <div className="mt-5 space-y-3">
                <div className="glass-subtle flex items-center justify-between rounded-lg px-3 py-2">
                    <span className="text-sm text-slate-600">이메일</span>
                    <strong className="text-sm font-semibold text-slate-900">
                        {me?.email}
                    </strong>
                </div>
                <div className="glass-subtle flex items-center justify-between rounded-lg px-3 py-2">
                    <span className="text-sm text-slate-600">이름</span>
                    <strong className="text-sm font-semibold text-slate-900">
                        {me?.fullName || "-"}
                    </strong>
                </div>
            </div>
            <button
                type="button"
                onClick={onLogout}
                className="glass-button mt-5 rounded-lg px-4 py-2 text-sm font-semibold transition"
            >
                로그아웃
            </button>
        </section>
    );
}

export default MePage;
