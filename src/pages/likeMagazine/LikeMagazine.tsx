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
  width: 23.4375rem;
  height: 4.25rem;
  border-bottom: 0.0625rem solid rgba(217, 217, 217, 1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 110%;
`;

const LikeMagazineList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.25rem;
  width: 23.4375rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 5.991125rem;
  flex-shrink: 0;
  margin-right: 2.1875rem;
`;

const StyledBackButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
`;

const Scroll = styled.div`
  width: 23.75rem;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 85vh;
`;
