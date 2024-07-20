import Header from "./assets/components/header/Header.jsx";
import Home from "./pages/Home/Home";
import Footer from "./assets/components/footer/Footer.jsx";
import Login from "./pages/login/Login.jsx";
import Register from "./pages/register/Register.jsx";
import Post from "./pages/Post/Post.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Post" element={<Post />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
