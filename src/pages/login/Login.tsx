import styled from 'styled-components';
import { loginWithKakao } from '../../api/login';
import { toast } from 'react-toastify';
import PageFooter from '../../components/footer/PageFooter';
import { postMagazine } from '../../api/magazine';

export default function Login() {
  const handleKakaoLogin = () => {
    toast.success('이미 로그인 한 유저입니다.');
    loginWithKakao();
  };

  const post = () => {
    postMagazine({ title: 'title', content: 'content', image: 'image' });
  };
  return (
    <div>
      <Header>
        <h3>로그인</h3>
      </Header>
      <Wrap>
        <Content>
          <h2>내일은 최저가</h2>
          <span>Apple 제품을 최저가로 만나보세요.</span>
          <span>Apple 제품을 최저가로 만나보세요.</span>
          <LoginButton onClick={handleKakaoLogin}>카카오 로그인</LoginButton>
          <button onClick={post}>post 요청</button>
        </Content>
      </Wrap>
      <PageFooter />
    </div>
  );
}

const Header = styled.div`
  height: 68px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  padding: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Wrap = styled.div`
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  position: absolute;
  top: 190px;
  span {
    font-size: 16px;
  }
`;

const LoginButton = styled.button`
  width: 299px;
  height: 56px;
  border: none;
  border-radius: 9px;
  background-color: rgba(217, 217, 217, 1);
  margin-top: 65px;
`;
