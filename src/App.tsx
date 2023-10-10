import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/main/Main';
import Magazine from './pages/magazine/main/Magazine';
import Mypage from './pages/mypage/main/Mypage';
import './App.css';
import LikeMagazine from './pages/likeMagazine/LikeMagazine';
import EditMypage from './pages/mypage/edit/EditMypage';
import YetLogin from './pages/login/YetLogin';
import Login from './pages/login/Login';
import Notification from './pages/notification/Notification';
import MagazineDetail from "./pages/magazine/detail/detail";
import Detail from "./pages/detail/detailPage";
import Footer from "./components/footer/footer";

export default function App() {
  const location = useLocation();
  return (
    <div className='wrap'>
      <Routes>
        <Route path='/' element={<Main />}></Route>
      <Route path='/magazine' element={<Magazine />}></Route>
        <Route path='/mypage' element={<Mypage />}></Route>
        <Route path='/likemagazine' element={<LikeMagazine />}></Route>
        <Route path='/editmypage' element={<EditMypage />}></Route>
        <Route path='/yetlogin' element={<YetLogin />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/notice' element={<Notification />}></Route>
         <Route path='/detail' element={<Detail />}></Route>
        <Route path='/magazine' element={<Magazine />}></Route>
        <Route path='/magazineDetail' element={<MagazineDetail />}></Route>
      </Routes>
      {location.pathname !== "/magazineDetail" && <Footer />}

    </div>
  );
}
