import { Suspense } from 'react';
import { Outlet } from 'react-router';

import ReactGA from 'react-ga4';
import RouteChangeTrackers from './RouteChangeTrackers';
import GoogleTagManager from './GoogleTagManager';

import Loading from './components/Loading';
import './App.css';

export default function App() {
  if (import.meta.env.VITE_REACT_APP_GOOGLE_ANALYTICS) {
    ReactGA.initialize(import.meta.env.VITE_REACT_APP_GOOGLE_ANALYTICS);
  }
  RouteChangeTrackers();
  return (
    <div className='wrap'>
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <GoogleTagManager gtmId={import.meta.env.VITE_GOOGLE_TAG_MANAGER} />
    </div>
  );
}
