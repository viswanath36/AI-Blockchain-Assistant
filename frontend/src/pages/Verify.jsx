import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import API from "../services/api";

function Verify() {
  const [documents,setDocuments]=useState([]);
  const [selected,setSelected]=useState("");
  const [loading,setLoading]=useState(true);
  const [result,setResult]=useState(null);

  useEffect(()=>{loadDocuments();},[]);

  const loadDocuments=async()=>{
    try{
      setLoading(true);
      const res=await API.get("/documents");
      if(res.data.success){
        setDocuments(res.data.documents);
        if(res.data.documents.length){
          setSelected(res.data.documents[0]._id);
        }
      }
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false);
    }
  };

  const verify=()=>{
    if(!selected){
      alert("Select a document first.");
      return;
    }

    const input=document.createElement("input");
    input.type="file";
    input.accept=".pdf";

    input.onchange=async(e)=>{
      const file=e.target.files[0];
      if(!file) return;

      const form=new FormData();
      form.append("document",file);

      try{
        const res=await API.post(`/verify/${selected}`,form,{
          headers:{ "Content-Type":"multipart/form-data" }
        });
        setResult(res.data);
      }catch(err){
        console.error(err);
        alert("Verification failed.");
      }
    };

    input.click();
  };

  return(
    <Layout>

      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap"}}>
        <div>
          <h1>✅ Blockchain Verification</h1>
          <p style={{color:"#64748b"}}>Verify uploaded documents using blockchain hashes.</p>
        </div>

        <button
          onClick={loadDocuments}
          style={{
            padding:"12px 18px",
            background:"#2563eb",
            color:"#fff",
            border:"none",
            borderRadius:"10px",
            cursor:"pointer"
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <h3>Loading documents...</h3>
      ) : documents.length===0 ? (
        <div style={{background:"#fff",padding:"50px",borderRadius:"16px",textAlign:"center",marginTop:"25px"}}>
          <h1>📂</h1>
          <h2>No Documents Available</h2>
          <p>Upload a document before verification.</p>
        </div>
      ) : (
        <>
          <div style={{background:"#fff",padding:"25px",borderRadius:"16px",marginTop:"25px",boxShadow:"0 2px 12px rgba(0,0,0,.08)"}}>
            <h2>Select Document</h2>

            <select
              value={selected}
              onChange={(e)=>setSelected(e.target.value)}
              style={{width:"100%",padding:"12px",borderRadius:"10px",border:"1px solid #cbd5e1",marginTop:"10px"}}
            >
              {documents.map(doc=>(
                <option key={doc._id} value={doc._id}>
                  {doc.filename}
                </option>
              ))}
            </select>

            <button
              onClick={verify}
              style={{
                marginTop:"20px",
                padding:"14px 22px",
                background:"#16a34a",
                color:"#fff",
                border:"none",
                borderRadius:"10px",
                cursor:"pointer"
              }}
            >
              ✅ Verify Document
            </button>
          </div>

          {result && (
            <div style={{background:"#fff",padding:"25px",borderRadius:"16px",marginTop:"25px",boxShadow:"0 2px 12px rgba(0,0,0,.08)"}}>
              <h2>{result.verified?"🟢 Verification Successful":"🔴 Verification Failed"}</h2>

              <p><strong>Document:</strong> {result.filename}</p>

              <p style={{marginTop:"20px"}}><strong>Stored Blockchain Hash</strong></p>
              <div style={{background:"#f8fafc",padding:"12px",borderRadius:"8px",wordBreak:"break-all"}}>
                {result.storedHash}
              </div>

              <p style={{marginTop:"20px"}}><strong>Uploaded File Hash</strong></p>
              <div style={{background:"#eff6ff",padding:"12px",borderRadius:"8px",wordBreak:"break-all"}}>
                {result.uploadedHash}
              </div>

              <div style={{
                marginTop:"25px",
                padding:"15px",
                borderRadius:"10px",
                background:result.verified?"#dcfce7":"#fee2e2",
                color:result.verified?"#166534":"#991b1b",
                fontWeight:"bold"
              }}>
                {result.verified
                  ? "✅ The uploaded document matches the blockchain record."
                  : "❌ The uploaded document does not match the blockchain record."}
              </div>
            </div>
          )}
        </>
      )}

    </Layout>
  );
}

export default Verify;