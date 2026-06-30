import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Chat from "./pages/Chat";
import Documents from "./pages/Documents";
import Blockchain from "./pages/Blockchain";
import Verify from "./pages/Verify";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/upload" element={<Upload />} />
      <Route path="/chat/:id" element={<Chat />} />
      <Route path="/documents" element={<Documents />} />
      <Route path="/blockchain" element={<Blockchain />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
}

export default App;