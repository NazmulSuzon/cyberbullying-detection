import { Routes, Route } from "react-router-dom";
import MainApp from "./MainApp";
import About from "./About";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainApp />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}