import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@routes/AppRoutes";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;