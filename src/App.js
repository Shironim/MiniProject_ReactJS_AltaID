import Home from "./screens/Home"
import './App.css';
import { Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} /> */}
      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
}

export default App;
