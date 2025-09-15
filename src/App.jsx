import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "@routes/AppRoutes";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const footerTheme = location.pathname === "/works" ? "light" : "dark";

  return (
    <>
      <Navbar />
      <AppRoutes />
      <Footer theme={footerTheme} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
