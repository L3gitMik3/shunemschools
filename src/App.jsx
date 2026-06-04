import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import AdminPanel from "./pages/adminpanel";   // PascalCase
import Navbar from "./components/Navbar";
import GroupSetup from "./pages/GroupSetup";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        <Route path="/" element={<GroupSetup/>}/>
      </Routes>
    </Router>
  );
}

export default App;