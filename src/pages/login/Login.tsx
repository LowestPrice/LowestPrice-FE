import styled from 'styled-components';
import { loginWithKakao } from '../../api/login';
import PageFooter from '../../components/footer/PageFooter';
import { temporaryLogin } from '../../api/login';
import { Helmet } from 'react-helmet-async';

export default function Login() {
  const handleKakaoLogin = () => {
    loginWithKakao();
  };
  const handleTempLogin = () => {
    temporaryLogin();
  };

  return (
    <div style={{ width: '100%' }}>
      <Helmet title='내일은 최저가 | 로그인' />
      <Header>
        <h3>로그인</h3>
      </Header>
      <Wrap>
        <Content>
          <svg xmlns='http://www.w3.org/2000/svg' width='93' height='93' viewBox='0 0 93 93' fill='none'>
            <circle cx='46.5' cy='46.5' r='46.5' fill='#0FB4FF' />
            <path d='M43.6187 73.4207L51.0753 78.1177L43.331 77.1058L34.3606 75.7817L38.9021 69.6731L43.4311 63.5146L43.6187 73.4207Z' fill='white' />
            <path d='M67.8123 39.8966V28.7789L25.1873 15.5V25.9432L67.8123 39.8966Z' fill='white' />
            <path d='M67.8123 29.7158V40.8461L25.1873 54.1125V43.6693L67.8123 29.7158Z' fill='white' />
            <path d='M67.8123 68.1036V56.9858L25.1873 43.7069V54.1501L67.8123 68.1036Z' fill='white' />
            <path d='M67.8125 57.0607V68.1909L44.7547 76.9228L44.6296 67.0042L67.8125 57.0607Z' fill='white' />
            <path d='M47.9569 72.9628L51.2097 78.2844L41.8265 76.6729L34.2573 75.8485L39.4119 73.2376L43.3153 63.5814L47.9569 72.9628Z' fill='white' />
          </svg>
          <h2>내일은 최저가</h2>
          <span>Apple 제품을 최저가로 만나보세요.</span>
          <LoginButton onClick={handleKakaoLogin}>카카오 로그인</LoginButton>
          <LoginButton onClick={handleTempLogin}>임시 로그인</LoginButton>
        </Content>
      </Wrap>
      <PageFooter />
    </div>
  );
}

const Header = styled.div`
  height: 4.25rem;
  border-bottom: 0.0625rem solid rgba(217, 217, 217, 1);
  padding: 0.625rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const Wrap = styled.div`
  height: 37.5rem;
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
  width: 25rem;
  position: absolute;
  top: 11.875rem;
  / span {
    font-size: 1rem;
  }
`;

const LoginButton = styled.button`
  width: 18.6875rem;
  height: 3.5rem;
  border: none;
  border-radius: 0.5625rem;
  background-color: #f9e000;
  margin-top: 1.875rem;
  font-weight: 600;
`;
