import { Suspense } from 'react';
import Loading from './components/Loading';
import { Outlet } from 'react-router';
import './App.css';
import ReactGA from 'react-ga4';
import RouteChangeTrackers from './RouteChangeTrackers';

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
    </div>
  );
}
