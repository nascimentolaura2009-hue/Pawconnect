import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Pets from "./pages/Pets";
import PetDetalhes from "./pages/PetDetalhes";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastroPet from "./pages/CadastroPet";
import Perfil from "./pages/Perfil";
import Perdidos from "./pages/Perdidos";
import AnimaisPerdidos from "./pages/AnimaisPerdidos";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/pets" element={<Pets />} />
        <Route path="/pets/:id" element={<PetDetalhes />} />

        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        <Route path="/cadastropet" element={<CadastroPet />} />

        <Route path="/perfil" element={<Perfil />} />

        <Route path="/perdidos" element={<Perdidos />} />

        <Route path="/animais-perdidos" element={<AnimaisPerdidos />} />

        <Route path="*" element={<NotFound />} />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;