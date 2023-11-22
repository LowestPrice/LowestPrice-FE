import { useRef } from 'react';
import styled from 'styled-components';
import { toast } from 'react-toastify';

import useShare from '../../hooks/useShareLink';

import { ShareFooterProps } from '../../type';

function ShareFooter(props: ShareFooterProps) {
  const copyUrlRef = useRef<HTMLInputElement>(null);
  const { shareToKakaoTalk } = useShare({
    objectType: 'feed',
    content: {
      title: props.title,
      imageUrl: props.mainImage,
      price: props.price,
    },

    url: props.realId ? `https://lowest-price.store/detail/${props.id}` : `https://lowest-price.store/magazine/${props.id}`,
  });

  const handleShareClick = () => {
    shareToKakaoTalk();
  };

  const copyUrl = () => {
    if (!document.queryCommandSupported('copy')) {
      return alert('복사 기능이 지원되지 않는 브라우저입니다.');
    }

    if (copyUrlRef.current) {
      copyUrlRef.current.select();
      document.execCommand('copy');
    }

    setTimeout(() => {
      toast.success('링크가 복사되었습니다.'), 200;
    });
  };

  return (
    <Wrap $share={props.share}>
      <LinkContent $share={props.share}>
        <LinkShareButton onClick={copyUrl}>
          <input
            ref={copyUrlRef}
            value={props.realId ? `https://lowest-price.store/detail/${props.id}` : `https://lowest-price.store/magazine/${props.id}`}
            readOnly
            style={{ position: 'absolute', left: '-624.9375rem' }}
          />

          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M12.716 5.01612C14.4042 3.32796 17.1956 3.32796 18.8838 5.01612C20.5719 6.70427 20.5719 9.49573 18.8838 11.1839L15.8029 14.2647C14.3366 15.8525 11.9504 15.936 10.3065 14.8401C9.7321 14.4571 9.57689 13.681 9.95983 13.1066C10.3428 12.5322 11.1189 12.377 11.6933 12.7599C12.4412 13.2585 13.4394 13.1483 13.975 12.5592C13.9883 12.5445 14.002 12.5301 14.016 12.5161L17.116 9.41612C17.8278 8.70427 17.8278 7.49573 17.116 6.78388C16.4296 6.09752 15.2815 6.07295 14.5621 6.71017L14.44 6.89337C14.057 7.46779 13.2809 7.623 12.7065 7.24006C12.1321 6.85712 11.9769 6.08104 12.3598 5.50663L12.5598 5.20663C12.6055 5.13814 12.6578 5.07432 12.716 5.01612Z'
              fill='white'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8.15916 9.67518C9.6314 8.33678 11.8971 7.98543 13.65 9.30011C14.2023 9.71432 14.3142 10.4978 13.9 11.0501C13.4858 11.6024 12.7023 11.7143 12.15 11.3001C11.5107 10.8207 10.5912 10.8623 9.86735 11.5013L6.7978 14.6698L6.78388 14.684C6.07204 15.3958 6.07204 16.6044 6.78388 17.3162C7.49573 18.0281 8.70427 18.0281 9.41612 17.3162L10.3 18.2001L9.41612 17.3162L9.71612 17.0162C10.2043 16.5281 10.9957 16.5281 11.4839 17.0162C11.972 17.5044 11.972 18.2958 11.4839 18.784L11.1839 19.084C9.49573 20.7721 6.70427 20.7721 5.01612 19.084C3.3305 17.3984 3.32797 14.6128 5.00851 12.9238L8.1022 9.73036C8.1206 9.71137 8.13959 9.69297 8.15916 9.67518Z'
              fill='white'
            />
          </svg>
        </LinkShareButton>
        <KakaoShareButton onClick={handleShareClick}>
          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
            <path
              d='M12.5482 4C7.83195 4 4 7.1 4 10.9C4 13.3 5.57208 15.4 7.83195 16.7L7.24242 20L10.8779 17.6C11.3691 17.7 11.9587 17.7 12.4499 17.7C17.1662 17.7 20.9981 14.6 20.9981 10.8C21.0964 7.1 17.2645 4 12.5482 4Z'
              fill='black'
            />
          </svg>
        </KakaoShareButton>
      </LinkContent>
      <CancelButtonWrap>
        <CancelButton onClick={props.handleShareButton}>취소</CancelButton>
      </CancelButtonWrap>
    </Wrap>
  );
}

export default ShareFooter;

const Wrap = styled.div<{ $share: boolean }>`
  width: 100%;
  height: ${({ $share }) => ($share ? '8.625rem' : '0rem')};
  opacity: ${({ $share }) => ($share ? '1' : '0')};
  border-top: 0.0625rem solid #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  background: white;
  transition: 380ms ease-in-out 0s;
  z-index: 1000;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const LinkContent = styled.div<{ $share: boolean }>`
  height: 4.0625rem;
  display: ${({ $share }) => ($share ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: start;
  align-items: center;
  gap: 1.25rem;
`;

const LinkShareButton = styled.button`
  width: 3.6875rem;
  height: 3.6875rem;
  border-radius: 100rem;
  outline: none;
  border: none;
  background-color: #00adfc;
`;

const KakaoShareButton = styled.button`
  width: 3.6875rem;
  height: 3.6875rem;
  border-radius: 100rem;
  outline: none;
  border: none;
  background-color: #fbe300;
`;

const CancelButtonWrap = styled.div`
  height: 3.9375rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.button`
  height: 2.5rem;
  width: 20.625rem;
  border: none;
  outline: none;
  border-radius: 1.25rem;
  font-size: 1.0625rem;
  font-weight: 500;
`;
