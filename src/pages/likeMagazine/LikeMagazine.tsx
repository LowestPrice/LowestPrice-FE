import { useNavigate } from 'react-router';
import styled from 'styled-components';

import MagazineItem from './MagazineItem';
import PageFooter from '../../components/footer/PageFooter';
import { GreyBackIcon } from '../../assets/icon/icon';
import HelmetTag from '../../components/HelmetTag';

const LikeMagazine = () => {
  const navigate = useNavigate();
  return (
    <>
      <HelmetTag
        title='내일은 최저가 | 좋아요 한 매거진'
        keywords='내일은 최저가 | 좋아요 한 매거진'
        description='쿠팡에서 스크래핑해 온 데이터로 만든 Apple 제품 검색 웹사이트입니다.'
        url='https://lowest-price.store/'
      />
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
