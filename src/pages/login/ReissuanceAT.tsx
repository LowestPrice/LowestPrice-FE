import { useQuery } from 'react-query';
import { getAccessToken } from '../../api/login';
import Loading from '../../components/Loading';
import Error from '../../components/Error';
import { useNavigate } from 'react-router';
import Cookies from 'js-cookie';

type Props = {};

function ReissuanceAT({}: Props) {
  const navigate = useNavigate();
  const { data, status } = useQuery('accessToken', getAccessToken);

  const accessToken = 'Bearer ' + data;
  console.log(accessToken);

  document.cookie = `accessToken=${accessToken}; max-age=17000`;
  const acessCookie = Cookies.get('accessToken');

  if (acessCookie) {
    navigate('/');
  }

  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'error') {
    return <Error />;
  }

  return <div>ReissuanceAT</div>;
}

export default ReissuanceAT;
