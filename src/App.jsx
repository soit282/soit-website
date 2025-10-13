import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "@routes/AppRoutes";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const footerTheme = location.pathname === "/works" ? "light" : "dark";

  // HomePage includes its own Navbar and Footer
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Navbar />}
      <AppRoutes />
      {!isHomePage && <Footer theme={footerTheme} />}
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
