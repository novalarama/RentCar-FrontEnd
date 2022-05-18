import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "./pages/Login"
import Karyawan from "./pages/Karyawan"
import Pelanggan from "./pages/Pelanggan";
import Mobil from "./pages/Mobil";
import Sewa from "./pages/Sewa"
import SewaMobil from "./pages/SewaMobil"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/karyawan" element={<Karyawan />}></Route>
        <Route path="/pelanggan" element={<Pelanggan />}></Route>
        <Route path="/mobil" element={<Mobil />}></Route>
        <Route path="/sewa" element={<Sewa />}></Route>
        <Route path="/sewaMobil" element={<SewaMobil />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
