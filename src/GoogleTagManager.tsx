import { useEffect } from 'react';
import TagManager from 'react-gtm-module';

interface GoogleTagManagerProps {
  gtmId: string;
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ gtmId }) => {
  useEffect(() => {
    TagManager.initialize({ gtmId });
  }, [gtmId]);
  return <></>;
};

export default GoogleTagManager;
