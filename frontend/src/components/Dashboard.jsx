import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [tableData, setTableData] = useState(null);
    const [showNotification, setShowNotification] = useState(false);

    const handleSignOut = async () => {
        try {
            await fetch("http://localhost:8080/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            localStorage.removeItem("token");
            setShowNotification(true);

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

    const handleSearch = async (e) => {
        e.preventDefault();
        const query = searchQuery.trim();
        if (!query) return;

        try {
            const resp = await fetch("http://localhost:5001/api/nlq", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ question: query }),
            });

            const data = await resp.json();
            if (!resp.ok) throw new Error(data.detail || "Query failed");

            if (data.rows && data.rows.length > 0) {
                setTableData({
                    columns: data.columns,
                    rows: data.rows
                });
            } else {
                setTableData({ columns: [], rows: [] });
            }
        } catch (err) {
            console.error("Error:", err.message);
            setTableData({ columns: [], rows: [] });
        }
    };

    // ✅ inline ClientTable (no need separate file)
    const ClientTable = ({ columns, rows }) => (
        <table className="client-table">
            <thead>
            <tr>
                {columns.map((col, i) => (
                    <th key={i}>{col}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {rows.map((row, i) => (
                <tr key={i}>
                    {row.map((cell, j) => (
                        <td key={j}>{cell}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );

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
                        onChange={(e) => setSearchQuery(e.target.value)}
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

                {tableData && (
                    <div className="search-results show">
                        <h3>Search Results</h3>
                        {tableData.rows.length > 0 ? (
                            <ClientTable
                                columns={tableData.columns}
                                rows={tableData.rows}
                            />
                        ) : (
                            <p>No results found.</p>
                        )}
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
