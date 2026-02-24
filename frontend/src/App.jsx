import { Link, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MePage from "./pages/MePage";

function App() {
    return (
        <div className="container">
            <header className="header">
                <h1>JWT Auth Demo</h1>
                <nav>
                    <Link to="/">내 정보</Link>
                    <Link to="/login">로그인</Link>
                    <Link to="/register">회원가입</Link>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<MePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
