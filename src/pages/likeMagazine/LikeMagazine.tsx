import styled from 'styled-components';
import MagazineItem from './MagazineItem';
import PageFooter from '../../components/footer/PageFooter';
import { GreyBackIcon } from '../../assets/icon/icon';
import { useNavigate } from 'react-router';

const LikeMagazine = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Header>
        <StyledBackButton onClick={() => navigate('/mypage')}>
          <GreyBackIcon />
        </StyledBackButton>
        <Title>좋아요 한 매거진</Title>
        <div></div>
      </Header>
      <Scroll>
        <LikeMagazineList>
          <MagazineItem></MagazineItem>
        </LikeMagazineList>
      </Scroll>
      <PageFooter />
    </div>
  );
};

export default LikeMagazine;

const Header = styled.div`
  width: 375px;
  height: 68px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 110%;
`;

const LikeMagazineList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 4px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 95.858px;
  flex-shrink: 0;
  margin-right: 35px;
`;

const StyledBackButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
`;

const Scroll = styled.div`
  width: 380px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 8%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }
  max-height: 85vh;
`;
