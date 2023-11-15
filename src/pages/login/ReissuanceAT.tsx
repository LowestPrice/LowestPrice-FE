import { useQuery } from 'react-query';
import { getAccessToken } from '../../api/login';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

function ReissuanceAT() {
  const navigate = useNavigate();

  // refreshToken 으로 accessToken 가져오기 ---------------------------

  const { data, status } = useQuery('accessToken', getAccessToken);

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  // 받아온 accessToken 가공하기 ------------

  const accessToken = 'Bearer ' + data;

  // accessToken 이 정상적으로 발급받았다면, 쿠키에 저장한 뒤 메인페이지로 이동 -----

  if (accessToken !== 'Bearer undefined') {
    document.cookie = `accessToken=${accessToken}; max-age=17000`;
    navigate('/');
  }

  // accessToken 을 발급받지 못했다면, 로그인 페이지로 이동 ------------------------

  if (accessToken === 'Bearer undefined') {
    // document.cookie = `accessToken=null; max-age=17000`;
    toast.error('재로그인이 필요합니다~!');
    navigate('/login');
  }

  return <div>ReissuanceAT</div>;
}

export default ReissuanceAT;
