import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Main from './pages/main/Main';
import Magazine from './pages/magazine/magazineMain/MagazineMain';
import MagazineDetail from './pages/magazine/magazineDetail/MagazineDetail';
import MagazineWriting from './pages/magazine/magazineWriting/MagazineWriting';
import MagazineEditing from './pages/magazine/magazineWriting/MagazineEditing';
import Mypage from './pages/mypage/main/MyPage';
import LikeMagazine from './pages/likeMagazine/LikeMagazine';
import EditMypage from './pages/mypage/edit/EditMypage';
import YetLogin from './pages/login/YetLogin';
import Login from './pages/login/Login';
import Notification from './pages/notification/Notification';
import Detail from './pages/detail/Detail';
import Search from './pages/search/Search';
import Prac from './pages/Slide';
import Topten from './pages/main/Topten';
import './App.css';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='wrap'>
        <Routes>
          <Route path='/' element={<Main />}></Route>
          <Route path='/mypage' element={<Mypage />}></Route>
          <Route path='/likemagazine' element={<LikeMagazine />}></Route>
          <Route path='/editmypage' element={<EditMypage />}></Route>
          <Route path='/yetlogin' element={<YetLogin />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/notice' element={<Notification />}></Route>
          <Route path='/detail/:id' element={<Detail />}></Route>
          <Route path='/magazine' element={<Magazine />}></Route>
          <Route path='/magazine/:id' element={<MagazineDetail />}></Route>
          <Route path='/magazineWriting' element={<MagazineWriting />}></Route>
          <Route path='/magazineEditing/:id' element={<MagazineEditing />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/prac' element={<Prac />}></Route>
          <Route path='/topten' element={<Topten />}></Route>
        </Routes>
      </div>
    </QueryClientProvider>
  );
}
