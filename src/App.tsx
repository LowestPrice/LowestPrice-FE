import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './pages/main/Main';
import Magazine from './pages/magazine/magazineMain/MagazineMain';
import MagazineDetail from './pages/magazine/magazineDetail/MagazineDetail';
import MagazineWriting from './pages/magazine/magazineWriting/MagazineWriting';
import Mypage from './pages/mypage/main/MyPage';
import LikeMagazine from './pages/likeMagazine/LikeMagazine';
import EditMypage from './pages/mypage/edit/EditMypage';
import YetLogin from './pages/login/YetLogin';
import Login from './pages/login/Login';
import Notification from './pages/notification/Notification';
import Detail from './pages/detail/detailPage';
import Footer from './components/footer/footer';
import Search from './pages/search/search';
import { exampleData } from './pages/magazine/magazineMain/Example';
import './App.css';

export default function App() {
  const location = useLocation();
  return (
    <div className='wrap'>
      <Routes>
        <Route path='/' element={<Main />}></Route>
        <Route path='/mypage' element={<Mypage />}></Route>
        <Route path='/likemagazine' element={<LikeMagazine />}></Route>
        <Route path='/editmypage' element={<EditMypage />}></Route>
        <Route path='/yetlogin' element={<YetLogin />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/notice' element={<Notification />}></Route>
        <Route path='/detail' element={<Detail />}></Route>
        <Route path='/magazine' element={<Magazine data={exampleData} />}></Route>
        <Route path='/magazineDetail' element={<MagazineDetail />}></Route>
        <Route path='/magazineWriting' element={<MagazineWriting />}></Route>
        <Route path='/search' element={<Search />}></Route>
        {/* <Route path='/' element={<Search />}></Route>
        <Route path='/' element={<Search />}></Route> */}
      </Routes>
      {location.pathname !== '/magazineDetail' && <Footer />}
    </div>
  );
}
