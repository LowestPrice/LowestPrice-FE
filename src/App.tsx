import { Route, Routes, useLocation } from "react-router-dom";
import Main from "./pages/main/main";
import Magazine from "./pages/magazine/main/magazine";
import MagazineDetail from "./pages/magazine/detail/detail";
import Detail from "./pages/detail/detailPage";
import Footer from "./components/footer/footer";
import "./App.css";

export default function App() {
  const location = useLocation();
  return (
    <div className='wrap'>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/detail' element={<Detail />}></Route>
        <Route path='/magazine' element={<Magazine />}></Route>
        <Route path='/magazineDetail' element={<MagazineDetail />}></Route>
      </Routes>
      {location.pathname !== "/magazineDetail" && <Footer />}
    </div>
  );
}
