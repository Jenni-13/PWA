import { Routes, Route } from "react-router-dom";
import Splash from "./components/Splash";
import Home from "./components/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
