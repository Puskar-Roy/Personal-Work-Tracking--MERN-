import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Auth/Login";
import Regsiter from "./components/Auth/Register";

function App() {
  return (
    <>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Regsiter />} />
        </Routes>
    </>
  );
}

export default App;
