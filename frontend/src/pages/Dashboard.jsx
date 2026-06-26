import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";

import API from "../services/api";

function Dashboard() {

    const [documents, setDocuments] = useState(0);
    const [blocks, setBlocks] = useState(0);
    const [status, setStatus] = useState("Loading...");

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            // Load Blockchain
            const blockchain = await API.get("/blockchain");

            setBlocks(blockchain.data.totalBlocks);

            // Validate Blockchain
            const validation = await API.get("/blockchain/validate");

            setStatus(
                validation.data.valid
                    ? "Healthy"
                    : "Tampered"
            );

            // Load Documents
            const docs = await API.get("/documents");

            setDocuments(docs.data.count);

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div style={{ display: "flex" }}>

            <Sidebar />

            <div style={{ flex: 1 }}>

                <Navbar />

                <div
                    style={{
                        padding: "30px",
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap"
                    }}
                >

                    <StatCard
                        title="Documents"
                        value={documents}
                    />

                    <StatCard
                        title="Blockchain Blocks"
                        value={blocks}
                    />

                    <StatCard
                        title="AI Queries"
                        value="Coming Soon"
                    />

                    <StatCard
                        title="Blockchain Status"
                        value={status}
                    />

                </div>

            </div>

        </div>

    );

}

export default Dashboard;