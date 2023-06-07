import "./App.sass";
import Landing from "./screens/landing/Landing";
import Login from "./screens/login/Login";
import NotFoundPage from "./screens/notFound/NotFoundPage";
import Register from "./screens/register/Register";
import Home from "./screens/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer autoClose={3000} position="top-center" />
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
