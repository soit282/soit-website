import { BrowserRouter, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import AppRoutes from "@routes/AppRoutes";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import SmoothScroll from "@/utils/smooth-scroll";
import "./App.css";

function AppContent() {
  const location = useLocation();
  const footerTheme = location.pathname === "/works" ? "light" : "dark";
  const smoothScrollRef = useRef(null);

  // Initialize smooth scroll for desktop only (touch devices use native scroll)
  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    smoothScrollRef.current = new SmoothScroll({
      ease: 0.075,
    });

    // Make it accessible globally for other components
    window.smoothScrollInstance = smoothScrollRef.current;

    return () => {
      if (smoothScrollRef.current) {
        smoothScrollRef.current.destroy();
      }
      delete window.smoothScrollInstance;
    };
  }, []);

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
