import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";


// // Import all page components
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Academics from "./pages/Academics";
// import Admissions from "./pages/Admissions";
// import Gallery from "./pages/Gallery";
// import Contact from "./pages/Contact";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <Home />
        
       
      </div>
      <Footer/>
    </Router>
  );
}

export default App;