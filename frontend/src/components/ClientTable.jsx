import React, { useState } from "react";

function ClientTable() {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        const res = await fetch("http://127.0.0.1:5001/clients");
        const data = await res.json();
        setClients(data);
    };

    return (
        <div style={{ padding: "20px" }}>
            <h2>Client List</h2>

            <button onClick={fetchClients} style={{ padding: "10px", margin: "10px 0" }}>
                Show Clients
            </button>

            {clients.length > 0 && (
                <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                    <tr style={{ background: "#f0f0f0" }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {clients.map((c) => (
                        <tr key={c.id}>
                            <td>{c.id}</td>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.country}</td>
                            <td>{c.status}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default ClientTable;
