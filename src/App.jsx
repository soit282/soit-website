import { BrowserRouter } from "react-router-dom";
import AppRoutes from "@routes/AppRoutes";
import Footer from "@components/footer/Footer";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Footer />
    </BrowserRouter>
  );
}

export default App;