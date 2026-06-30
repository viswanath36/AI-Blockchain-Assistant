import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Blockchain() {
  const [blocks, setBlocks] = useState([]);
  const [filteredBlocks, setFilteredBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadBlockchain();
  }, []);

  const loadBlockchain = async () => {
    try {
      setLoading(true);
      const blockchain = await API.get("/blockchain");
      const validation = await API.get("/blockchain/validate");

      const list = blockchain.data.blockchain || [];
      setBlocks(list);
      setFilteredBlocks(list);
      setStatus(validation.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    if (!value.trim()) {
      setFilteredBlocks(blocks);
      return;
    }
    setFilteredBlocks(
      blocks.filter((b) =>
        b.blockNumber.toString().includes(value)
      )
    );
  };

  const copyText = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("Copied to clipboard.");
    } catch {
      alert("Copy failed.");
    }
  };

  return (
    <Layout>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
        <div>
          <h1>⛓ Blockchain Explorer</h1>
          <p style={{color:"#64748b"}}>View and validate blockchain records.</p>
        </div>

        <button
          onClick={loadBlockchain}
          style={{padding:"12px 18px",background:"#2563eb",color:"#fff",border:"none",borderRadius:"10px",cursor:"pointer"}}
        >
          🔄 Refresh
        </button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:"18px",margin:"25px 0"}}>
        <div style={card}><h3>Total Blocks</h3><h1>{blocks.length}</h1></div>
        <div style={card}><h3>Status</h3><h1>{status?.valid?"🟢 Valid":"🔴 Error"}</h1></div>
        <div style={card}><h3>Genesis</h3><h1>{blocks.length?1:0}</h1></div>
        <div style={card}><h3>Latest Block</h3><h1>{blocks.length}</h1></div>
      </div>

      <input
        value={search}
        onChange={(e)=>handleSearch(e.target.value)}
        placeholder="🔍 Search block number..."
        style={{width:"100%",maxWidth:"350px",padding:"12px",borderRadius:"10px",border:"1px solid #cbd5e1",marginBottom:"25px"}}
      />

      {status && (
        <div style={{
          background:status.valid?"#dcfce7":"#fee2e2",
          color:status.valid?"#166534":"#991b1b",
          padding:"16px",
          borderRadius:"10px",
          marginBottom:"20px",
          fontWeight:"bold"
        }}>
          {status.valid?"✅ Blockchain Valid":"❌ Blockchain Tampered"}
          <br/>
          {status.message}
        </div>
      )}

      {loading ? (
        <h3>Loading blockchain...</h3>
      ) : filteredBlocks.length===0 ? (
        <div style={{textAlign:"center",padding:"60px",background:"#fff",borderRadius:"12px"}}>
          <h1>📦</h1>
          <h2>No Blocks Found</h2>
        </div>
      ) : (
        <div style={{display:"grid",gap:"20px"}}>
          {filteredBlocks.map(block=>(
            <div key={block._id} style={{background:"#fff",padding:"22px",borderRadius:"16px",boxShadow:"0 2px 12px rgba(0,0,0,.08)"}}>
              <h2>📦 Block #{block.blockNumber}</h2>

              <Field title="Document ID" value={block.documentId} />
              <Field title="File Hash" value={block.fileHash} copy={()=>copyText(block.fileHash)} />
              <Field title="Previous Hash" value={block.previousHash} copy={()=>copyText(block.previousHash)} />
              <Field title="Block Hash" value={block.blockHash} copy={()=>copyText(block.blockHash)} />

              <p><strong>Created:</strong> {new Date(block.createdAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </Layout>
  );
}

const card={
  background:"#fff",
  padding:"20px",
  borderRadius:"14px",
  boxShadow:"0 2px 10px rgba(0,0,0,.08)",
  textAlign:"center"
};

function Field({title,value,copy}){
  return(
    <>
      <p><strong>{title}</strong></p>
      <div style={{background:"#f8fafc",padding:"12px",borderRadius:"8px",wordBreak:"break-all"}}>
        {value}
      </div>
      {copy && (
        <button onClick={copy} style={{marginTop:"10px",marginBottom:"15px",padding:"8px 14px",background:"#2563eb",color:"#fff",border:"none",borderRadius:"8px",cursor:"pointer"}}>
          📋 Copy
        </button>
      )}
    </>
  );
}

export default Blockchain;
