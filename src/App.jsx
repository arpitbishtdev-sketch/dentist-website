import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Service from "./pages/service";
import Price from "./pages/PriceSection";
import Implants from "./pages/Implants";
import Appointment from "./pages/Appointment";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/service" element={<Service />} />
        <Route path="/price" element={<Price />} />
        <Route path="/implants" element={<Implants />} />
        <Route path="/appointment" element={<Appointment />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
