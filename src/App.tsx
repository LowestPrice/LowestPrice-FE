import { Suspense } from 'react';
import Loading from './components/Loading';
import { Outlet } from 'react-router';
import './App.css';
import ReactGA from 'react-ga4';
import RouteChangeTrackers from './RouteChangeTrackers';
import GoogleTagManager from './GoogleTagManager';

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
      <GoogleTagManager gtmId='GTM-5RJ9KXDN' />
    </div>
  );
}
