import styled from 'styled-components';
import MagazineItem from './MagazineItem';
import PageFooter from '../../components/footer/PageFooter';
import { GreyBackIcon } from '../../assets/icon/icon';
import { useNavigate } from 'react-router';

const LikeMagazine = () => {
  const navigate = useNavigate();
  return (
    <>
      <Container>
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
      </Container>
      <PageFooter />
    </>
  );
};

export default LikeMagazine;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 100px;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const Header = styled.div`
  height: 4.25rem;
  border-bottom: 0.0625rem solid rgba(217, 217, 217, 1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 110%;
  width: 23.4375rem;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const LikeMagazineList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.25rem;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 2.1875rem;
`;

const StyledBackButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  margin-left: 1.12rem;
`;

const Scroll = styled.div`
  width: 23.4375rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 85vh;
`;
