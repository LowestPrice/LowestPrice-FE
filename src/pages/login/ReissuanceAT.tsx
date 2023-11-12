import { useQuery } from 'react-query';
import { getAccessToken } from '../../api/login';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import Loading from '../../components/Loading';
import Error from '../../components/Error';

function ReissuanceAT() {
  const navigate = useNavigate();
  const { data, status } = useQuery('accessToken', getAccessToken);
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }
  const accessToken = 'Bearer ' + data;

  if (accessToken !== 'Bearer undefined') {
    document.cookie = `accessToken=${accessToken}; max-age=17000`;
    navigate('/');
  } else if (accessToken === 'Bearer undefined') {
    document.cookie = `accessToken=null; max-age=17000`;
    toast.error('재로그인이 필요합니다~!');
    navigate('/login');
  }

  //9SuVE

  return <div>ReissuanceAT</div>;
}

export default ReissuanceAT;
