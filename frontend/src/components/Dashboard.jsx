import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    const handleSignOut = async () => {
        try {
            // Call backend logout
            await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            // Remove stored JWT if any
            localStorage.removeItem("token");

            // Show "Signed out" message
            setShowNotification(true);

            // Redirect to login after a short delay
            setTimeout(() => {
                setShowNotification(false);
                navigate("/", { replace: true });
                window.history.pushState(null, "", window.location.href);
                window.onpopstate = () => {
                    navigate("/", { replace: true });
                };
            }, 1000);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchQuery.trim();

        if (query) {
            console.log("Searching for:", query);
            setSearchResults(`You searched for: "${query}".`);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    };

    const handleInputChange = (e) => {
        setSearchQuery(e.target.value);
        if (e.target.value.trim() === '') {
            setShowResults(false);
        }
    };

    return (
        <div className="dashboard-container">
            {/* Header with Search & Sign Out */}
            <header className="dashboard-header">
                <h1 className="dashboard-title">Dashboard</h1>
                <form className="dashboard-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <button type="submit">Search</button>
                </form>
                <button className="signout-btn" onClick={handleSignOut}>
                    Sign Out
                </button>
            </header>

            {/* Main Content */}
            <main className="dashboard-content">
                <h2>Welcome to your Dashboard</h2>
                <p>Your personalized workspace awaits!</p>

                {showResults && (
                    <div className="search-results show">
                        <h3>Search Results</h3>
                        <p>{searchResults}</p>
                    </div>
                )}
            </main>

            {/* Notification */}
            {showNotification && (
                <div className="notification show">
                    Signed out successfully!
                </div>
            )}
        </div>
    );
}

export default Dashboard;
