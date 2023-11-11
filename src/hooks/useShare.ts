import { useEffect } from 'react';

import { useShareParams } from '../type';

declare global {
  interface Window {
    Kakao: any;
  }
}

const useShare = ({ objectType, content, url }: useShareParams) => {
  const shareToKakaoTalk = () => {
    if (window.Kakao === undefined) {
      return;
    }

    const kakao = window.Kakao;

    // 카카오 SDK 초기화
    if (!kakao.isInitialized()) {
      kakao.init(import.meta.env.VITE_KAKAO_SHARE);
    }

    kakao.Link.sendDefault({
      objectType,
      content: {
        title: content.title,
        imageUrl: content.imageUrl,
        link: {
          mobileWebUrl: url,
          webUrl: url,
        },
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: url,
            webUrl: url,
          },
        },
      ],
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return {
    shareToKakaoTalk,
  };
};

export default useShare;
