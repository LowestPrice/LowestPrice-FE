import styled from 'styled-components';
import spinner from '../assets/image/spiner.gif';

function Loading() {
  return (
    <Wrap>
      <div>데이터를 불러오는 중입니다.</div>
      <div>잠시만 기다려주세요.</div>
      <img src={spinner} alt='로딩 중' width='50px' height='50px' />
    </Wrap>
  );
}

export default Loading;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    font-size: 0.9375rem;
    font-weight: bold;
  }
  img {
    width: 10%;
    height: 10%;
  }
`;
