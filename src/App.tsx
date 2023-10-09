import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Magazine from './pages/magazine/main/Magazine';

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Main />}></Route>
      <Route path='/magazine' element={<Magazine />}></Route>
      <Route path='/' element={<Main />}></Route>
      <Route path='/' element={<Main />}></Route>
    </Routes>
  );
}
