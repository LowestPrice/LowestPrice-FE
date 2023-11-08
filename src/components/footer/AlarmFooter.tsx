import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import Cookies from 'js-cookie';

import { toggleAlarm } from '../../api/alarm';

interface Props {
  productUrl: string | undefined;
  productId: string | undefined;
  isAlertOn: boolean | undefined;
}

function AlarmFooter(props: Props) {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const alarmMutation = useMutation(toggleAlarm, {
    onSuccess: () => {
      queryClient.invalidateQueries(['product']);
      queryClient.invalidateQueries(['infiniteCategoryProduct']);
      queryClient.invalidateQueries(['infiniteCategoryFilterProduct']);
      queryClient.invalidateQueries(['infiniteSearchProduct']);
      queryClient.invalidateQueries(['FilteredSearchProduct']);
      queryClient.invalidateQueries(['topProduct']);
    },
    onError: () => {
      console.log('alarm 실패');
    },
  });

  const accessToken = Cookies.get('Authorization');

  const handleAlarmButton = () => {
    alarmMutation.mutate(Number(props.productId));
    if (!accessToken) {
      toast.error('로그인 이후 이용이 가능합니다❗️');
      navigate('/login');
      return;
    }
    if (props.isAlertOn) {
      toast.error('더 이상 알림을 보내지 않습니다❗️');
    } else {
      toast.success('알림을 받아보실 수 있습니다✅');
    }
  };

  return (
    <Wrap>
      <Content>
        {!props.isAlertOn ? (
          <Alarm onClick={handleAlarmButton} $isAlertOn={props.isAlertOn}>
            <div>
              <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M10.8889 23.4394C11.7145 24.0989 12.8048 24.5 14 24.5C15.1952 24.5 16.2855 24.0989 17.1111 23.4394M5.25891 20.0454C4.76703 20.0454 4.36921 19.6793 4.66675 19.25C5.35717 18.2538 6.14665 16.386 6.14665 14.6265L6.17513 12.0769C6.17513 7.34003 9.67845 3.5 14 3.5C18.3852 3.5 21.9401 7.39659 21.9401 12.2033L21.9117 14.6265C21.9117 16.3981 22.671 18.2534 23.3333 19.25C23.6194 19.6804 23.228 20.0454 22.7422 20.0454H5.25891Z'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </Alarm>
        ) : (
          <Alarm onClick={handleAlarmButton} $isAlertOn={props.isAlertOn}>
            <div>
              <svg width='36' height='36' viewBox='0 0 36 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <g clipPath='url(#clip0_715_13187)'>
                  <circle cx='18' cy='18' r='18' fill='gold' />
                  <path
                    d='M9.52941 23.1634L8.83466 22.6737H8.83466L9.52941 23.1634ZM10.903 19.226L10.053 19.2163V19.226H10.903ZM10.9287 16.9603L11.7787 16.97V16.9603H10.9287ZM26.4706 23.6863L27.1748 23.2103L27.1748 23.2103L26.4706 23.6863ZM25.1522 19.226L24.3022 19.2158V19.226H25.1522ZM25.1779 17.0726L26.0279 17.0828V17.0726H25.1779ZM15.7143 26.389C15.3451 26.0991 14.8108 26.1633 14.5208 26.5325C14.2308 26.9016 14.2951 27.436 14.6642 27.726L15.7143 26.389ZM21.3382 27.726C21.7074 27.436 21.7716 26.9016 21.4817 26.5325C21.1917 26.1633 20.6573 26.0991 20.2882 26.389L21.3382 27.726ZM8.20672 11.4494C8.03811 11.8875 8.25659 12.3794 8.69471 12.548C9.13282 12.7166 9.62467 12.4981 9.79328 12.06L8.20672 11.4494ZM12.5842 8.74127C12.9936 8.51155 13.1393 7.99344 12.9095 7.58405C12.6798 7.17465 12.1617 7.029 11.7523 7.25873L12.5842 8.74127ZM24.2334 7.27343C23.8265 7.03927 23.3069 7.17929 23.0727 7.58617C22.8386 7.99304 22.9786 8.5127 23.3855 8.74685L24.2334 7.27343ZM26.2036 12.0415C26.3677 12.4814 26.8572 12.7049 27.2971 12.5409C27.7369 12.3768 27.9605 11.8873 27.7964 11.4474L26.2036 12.0415ZM10.2242 23.6531C10.8994 22.6952 11.753 21.0351 11.753 19.226H10.053C10.053 20.544 9.40753 21.861 8.83466 22.6737L10.2242 23.6531ZM11.7529 19.2356L11.7787 16.97L10.0788 16.9507L10.0531 19.2163L11.7529 19.2356ZM27.1748 23.2103C26.9369 22.8584 26.6377 22.2199 26.3975 21.4586C26.1587 20.7017 26.0022 19.8982 26.0022 19.226H24.3022C24.3022 20.1281 24.5055 21.1119 24.7763 21.9701C25.0456 22.824 25.4056 23.6285 25.7664 24.1623L27.1748 23.2103ZM26.0021 19.2361L26.0278 17.0828L24.328 17.0624L24.3022 19.2158L26.0021 19.2361ZM26.0279 17.0726C26.0279 12.3927 22.493 8.4885 18.0012 8.4885V10.1885C21.4366 10.1885 24.3279 13.2096 24.3279 17.0726H26.0279ZM25.9029 24.8915C25.9921 24.8915 26.1295 24.8934 26.2441 24.8892C26.3473 24.8854 26.5373 24.8755 26.7244 24.8112C26.9239 24.7427 27.3272 24.528 27.3953 24.015C27.446 23.6332 27.2583 23.3339 27.1748 23.2103L25.7664 24.1623C25.7754 24.1756 25.7594 24.1553 25.7415 24.1069C25.724 24.0599 25.6896 23.9456 25.7101 23.7912C25.7331 23.618 25.8162 23.4644 25.9316 23.3537C26.0327 23.2566 26.1318 23.2173 26.1723 23.2034C26.24 23.1801 26.2671 23.1872 26.1823 23.1903C26.1088 23.193 26.0332 23.1915 25.9029 23.1915V24.8915ZM11.7787 16.9603C11.7787 13.1594 14.6234 10.1885 18.0012 10.1885V8.4885C13.567 8.4885 10.0787 12.3425 10.0787 16.9603H11.7787ZM10.1006 23.1915C10.1478 23.1915 10.1795 23.2043 10.1959 23.2133C10.2113 23.2218 10.2271 23.2343 10.2427 23.2565C10.2581 23.2785 10.2861 23.3289 10.2911 23.409C10.2966 23.4987 10.2701 23.588 10.2242 23.6531L8.83466 22.6737C8.44576 23.2254 8.5768 23.8429 8.85218 24.2345C9.11398 24.6067 9.57138 24.8915 10.1006 24.8915V23.1915ZM25.9029 23.1915H10.1006V24.8915H25.9029V23.1915ZM18.0012 27.15C17.1073 27.15 16.3077 26.8551 15.7143 26.389L14.6642 27.726C15.5633 28.4321 16.7345 28.85 18.0012 28.85V27.15ZM20.2882 26.389C19.6948 26.8551 18.8951 27.15 18.0012 27.15V28.85C19.2679 28.85 20.4391 28.4321 21.3382 27.726L20.2882 26.389ZM9.79328 12.06C10.3451 10.6261 11.3257 9.44745 12.5842 8.74127L11.7523 7.25873C10.1162 8.17682 8.88697 9.6818 8.20672 11.4494L9.79328 12.06ZM23.3855 8.74685C24.6749 9.48895 25.6822 10.6437 26.2036 12.0415L27.7964 11.4474C27.1305 9.66218 25.8504 8.20401 24.2334 7.27343L23.3855 8.74685Z'
                    fill='white'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_715_13187'>
                    <rect width='36' height='36' fill='white' />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </Alarm>
        )}
        <CoupangButton
          onClick={() => {
            window.open(props.productUrl);
          }}
        >
          최저가로 사러 가기
        </CoupangButton>
      </Content>
    </Wrap>
  );
}

export default AlarmFooter;

const Wrap = styled.div`
  width: 100%;
  height: 4.875rem;
  border-top: 0.0625rem solid #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0rem;
  background: white;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const Content = styled.div`
  width: 90%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 90%;
  }
  @media screen and (min-width: 744px) {
    width: 100%;
  }
`;

const Alarm = styled.button<{ $isAlertOn: boolean | undefined }>`
  width: 48px;
  height: 48px;
  background-color: ${(props) => (props.$isAlertOn ? 'gold' : '#000000')};
  border-radius: 0.5rem;
  border: none;
  outline: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    margin-top: 0.25rem;
  }
`;

const CoupangButton = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 0.5rem;
  background-color: #00adfc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 1rem;
  font-weight: 400;
  border: none;
  outline: none;
`;
