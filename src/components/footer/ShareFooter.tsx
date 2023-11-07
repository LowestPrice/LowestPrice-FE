import { useRef } from 'react';
import styled from 'styled-components';
import useShare from '../../hooks/useShare';
import { toast } from 'react-toastify';

interface Props {
  share: boolean;
  handleShareButton: () => void;
  title: string | undefined;
  mainImage: string | undefined;
  id: number | undefined;
  realId?: string | undefined;
}

function ShareFooter(props: Props) {
  const copyUrlRef = useRef<HTMLInputElement>(null);
  const { shareToKakaoTalk } = useShare({
    objectType: 'feed',
    content: {
      title: props.title,
      imageUrl: props.mainImage,
    },

    url: props.realId ? `https://lowest-price.store/detail/${props.id}` : `https://lowest-price.store/magazine/${props.id}`,
  });

  const handleShareClick = () => {
    shareToKakaoTalk();
  };

  const copyUrl = (e: any) => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사 기능이 지원되지 않는 브라우저입니다.');
    }

    if (copyUrlRef.current) {
      copyUrlRef.current.select();
      document.execCommand('copy');
      e.target.focus();
    }

    setTimeout(() => {
      toast('링크가 복사되었습니다.'), 200;
    });
  };

  return (
    <Wrap $share={props.share} onClick={props.handleShareButton}>
      <LinkContent $share={props.share}>
        <KakaoShareButton onClick={handleShareClick}>카카오톡</KakaoShareButton>
        <LinkShareButton onClick={copyUrl}>
          <input
            ref={copyUrlRef}
            value={props.realId ? `https://lowest-price.store/detail/${props.id}` : `https://lowest-price.store/magazine/${props.id}`}
            readOnly
            style={{ position: 'absolute', left: '-624.9375rem' }}
          />
          URL 복사
        </LinkShareButton>
      </LinkContent>
    </Wrap>
  );
}

export default ShareFooter;

const Wrap = styled.div<{ $share: boolean }>`
  width: 134px;
  height: 92px;
  opacity: ${({ $share }) => ($share ? '1' : '0')};
  border-top: 0.0625rem solid #d9d9d9;
  display: flex;
  flex-direction: column;
  position: absolute;
  right: -146px;
  top: -8px;
  transition: 380ms ease-in-out 0s;
  z-index: 999;
`;

const LinkContent = styled.div<{ $share: boolean }>`
  height: 92px;
  display: ${({ $share }) => ($share ? 'flex' : 'none')};
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LinkShareButton = styled.button`
  width: 134px;
  height: 46px;
  outline: none;
  border: none;
  background-color: red;
`;

const KakaoShareButton = styled.button`
  width: 134px;
  height: 46px;
  outline: none;
  border: none;
  background-color: transparent;
  background-color: red;
`;
