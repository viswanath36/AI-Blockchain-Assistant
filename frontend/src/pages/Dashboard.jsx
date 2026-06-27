import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
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

      const blockchain = await API.get("/blockchain");
      setBlocks(blockchain.data.totalBlocks);

      const validation = await API.get("/blockchain/validate");

      setStatus(
        validation.data.valid
          ? "Healthy"
          : "Tampered"
      );

      const docs = await API.get("/documents");
      setDocuments(docs.data.count);

    } catch (error) {

      console.error(error);

    }

  };

  return (

    <Layout>

      <div
        style={{
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

    </Layout>

  );

}

export default Dashboard;