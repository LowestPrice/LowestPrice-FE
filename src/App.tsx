import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/main/Main';
import Magazine from './pages/magazine/main/Magazine';
import Mypage from './pages/mypage/main/MyPage';
import LikeMagazine from './pages/likeMagazine/LikeMagazine';
import EditMypage from './pages/mypage/edit/EditMypage';
import YetLogin from './pages/login/YetLogin';
import Login from './pages/login/Login';
import Notification from './pages/notification/Notification';
import MagazineDetail from './pages/magazine/detail/detail';
import Detail from './pages/detail/Detail';
import Footer from './components/footer/footer';
import Search from './pages/search/Search';
import Prac from './pages/Slide';
import Topten from './pages/main/Topten';
import KaKaoLogin from './pages/login/KaKaoLogin';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Error from './components/Error';

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
        <Route path='/detail/:id' element={<Detail />}></Route>
        <Route path='/magazine' element={<Magazine />}></Route>
        <Route path='/magazineDetail' element={<MagazineDetail />}></Route>
        <Route path='/search' element={<Search />}></Route>
        <Route path='/prac' element={<Prac />}></Route>
        <Route path='/topten' element={<Topten />}></Route>
        <Route path='/error' element={<Error />}></Route>
      </Routes>
      {location.pathname !== '/magazineDetail' && <Footer />}
    </div>
  );
}
