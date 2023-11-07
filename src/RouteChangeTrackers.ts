import { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import ReactGA from 'react-ga4';

const RouteChangeTrackers = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  //   구글 애널리틱스 운영서버에만 적용

  useEffect(() => {
    if (import.meta.env.VITE_REACT_APP_GOOGLE_ANALYTICS) {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.set({ page: location.pathname });
      ReactGA.send('pageview');
    }
  }, [initialized, location]);
};

export default RouteChangeTrackers;
