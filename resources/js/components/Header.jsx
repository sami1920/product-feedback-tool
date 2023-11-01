import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
    const logout = async () => {
        try {
            const response = await fetch("/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": document.head.querySelector(
                        'meta[name="csrf-token"]'
                    )?.content,
                },
            });

            if (response.ok) {
                window.location.href = "/login";
            } else {
                toast.error("Something went wrong!", {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        } catch (error) {
            toast.error("Something went wrong!", {
                position: toast.POSITION.TOP_RIGHT,
            });
        }
    };

    return (
        <div id="app">
            <nav className="navbar navbar-expand-md navbar-dark bg-dark shadow-sm">
                <div className="container">
                    <a className="navbar-brand" href="/user">
                        Product Feedback Tool
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="{{ __('Toggle navigation') }}"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div
                        className="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul className="navbar-nav me-auto"></ul>
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="/user">
                                    Feedbacks
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="/user/feedback/create"
                                >
                                    Submit Feedback
                                </a>
                            </li>
                            <li className="nav-item">
                                <a
                                    className="nav-link"
                                    href="#"
                                    onClick={logout}
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <ToastContainer />
        </div>
    );
}

export default Header;
