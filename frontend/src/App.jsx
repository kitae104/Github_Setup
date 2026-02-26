import { useEffect, useRef, useState } from "react";
import {
    Navigate,
    Route,
    Routes,
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import MePage from "./pages/MePage";
import ProjectsPage from "./pages/ProjectsPage";
import LandingPage from "./pages/LandingPage";
import Navbar from "./components/Navbar";

function App() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [authModalType, setAuthModalType] = useState(null);
    const [renderedAuthModalType, setRenderedAuthModalType] = useState(null);
    const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
    const authModalContainerRef = useRef(null);
    const lastFocusedElementRef = useRef(null);

    useEffect(() => {
        const authQuery = searchParams.get("auth");
        if (authQuery === "login" || authQuery === "register") {
            setAuthModalType(authQuery);
            return;
        }
        setAuthModalType(null);
    }, [searchParams]);

    useEffect(() => {
        if (authModalType) {
            setRenderedAuthModalType(authModalType);
            const frame = requestAnimationFrame(() => {
                setIsAuthModalVisible(true);
            });
            return () => cancelAnimationFrame(frame);
        }

        setIsAuthModalVisible(false);
        if (!renderedAuthModalType) {
            return;
        }

        const timeout = setTimeout(() => {
            setRenderedAuthModalType(null);
        }, 180);

        return () => clearTimeout(timeout);
    }, [authModalType, renderedAuthModalType]);

    useEffect(() => {
        if (!renderedAuthModalType) {
            return;
        }

        lastFocusedElementRef.current = document.activeElement;

        const focusTimer = setTimeout(() => {
            const modalContainer = authModalContainerRef.current;
            if (!modalContainer) {
                return;
            }

            const focusableElements = modalContainer.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            );

            if (focusableElements.length > 0) {
                focusableElements[0].focus();
            } else {
                modalContainer.focus();
            }
        }, 0);

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setAuthQuery(null, { replace: true });
                return;
            }

            if (event.key !== "Tab") {
                return;
            }

            const modalContainer = authModalContainerRef.current;
            if (!modalContainer) {
                return;
            }

            const focusableElements = Array.from(
                modalContainer.querySelectorAll(
                    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
                ),
            ).filter((element) => !element.hasAttribute("disabled"));

            if (focusableElements.length === 0) {
                event.preventDefault();
                modalContainer.focus();
                return;
            }

            const firstElement = focusableElements[0];
            const lastElement = focusableElements.at(-1);
            const activeElement = document.activeElement;

            if (event.shiftKey && activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
                return;
            }

            if (!event.shiftKey && activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        };

        globalThis.addEventListener("keydown", onKeyDown);
        return () => {
            clearTimeout(focusTimer);
            globalThis.removeEventListener("keydown", onKeyDown);

            const lastFocusedElement = lastFocusedElementRef.current;
            if (
                lastFocusedElement &&
                typeof lastFocusedElement.focus === "function"
            ) {
                lastFocusedElement.focus();
            }
        };
    }, [renderedAuthModalType, searchParams]);

    useEffect(() => {
        if (!renderedAuthModalType) {
            return;
        }

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = previousOverflow;
        };
    }, [renderedAuthModalType]);

    const setAuthQuery = (type, options = {}) => {
        const nextParams = new URLSearchParams(searchParams);
        if (type) {
            nextParams.set("auth", type);
        } else {
            nextParams.delete("auth");
        }
        setSearchParams(nextParams, { replace: options.replace ?? false });
    };

    const openLoginModal = () => setAuthQuery("login");
    const openRegisterModal = () => setAuthQuery("register");
    const closeAuthModal = () => setAuthQuery(null, { replace: true });

    const onLoginSuccess = () => {
        closeAuthModal();
        navigate("/me");
    };

    const onRegisterSuccess = () => {
        setAuthQuery("login");
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800">
            <Navbar
                onLoginClick={openLoginModal}
                onRegisterClick={openRegisterModal}
            />

            <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <LandingPage
                                onLoginClick={openLoginModal}
                                onRegisterClick={openRegisterModal}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={<Navigate to="/?auth=login" replace />}
                    />
                    <Route
                        path="/register"
                        element={<Navigate to="/?auth=register" replace />}
                    />
                    <Route path="/me" element={<MePage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {renderedAuthModalType && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <button
                        type="button"
                        className={`absolute inset-0 bg-slate-900/50 transition-opacity duration-200 ${
                            isAuthModalVisible ? "opacity-100" : "opacity-0"
                        }`}
                        onClick={closeAuthModal}
                        aria-label="모달 배경 닫기"
                    />
                    <dialog
                        open
                        ref={authModalContainerRef}
                        aria-labelledby={
                            renderedAuthModalType === "login"
                                ? "auth-modal-login-title"
                                : "auth-modal-register-title"
                        }
                        tabIndex={-1}
                        className={`relative z-10 m-0 w-full max-w-md border-none bg-transparent p-0 transition-all duration-200 ${
                            isAuthModalVisible
                                ? "translate-y-0 scale-100 opacity-100"
                                : "translate-y-3 scale-95 opacity-0"
                        }`}
                    >
                        <button
                            type="button"
                            onClick={closeAuthModal}
                            className="absolute right-3 top-3 rounded-md px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
                            aria-label="모달 닫기"
                        >
                            ✕
                        </button>
                        {renderedAuthModalType === "login" ? (
                            <LoginPage
                                isModal
                                headingId="auth-modal-login-title"
                                onSwitchToRegister={() =>
                                    setAuthQuery("register")
                                }
                                onLoginSuccess={onLoginSuccess}
                            />
                        ) : (
                            <RegisterPage
                                isModal
                                headingId="auth-modal-register-title"
                                onSwitchToLogin={() => setAuthQuery("login")}
                                onRegisterSuccess={onRegisterSuccess}
                            />
                        )}
                    </dialog>
                </div>
            )}
        </div>
    );
}

export default App;
