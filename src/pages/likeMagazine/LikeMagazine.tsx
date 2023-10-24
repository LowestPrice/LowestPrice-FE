import styled from 'styled-components';
import MagazineItem from './MagazineItem';
import PageFooter from '../../components/footer/PageFooter';

const LikeMagazine = () => {
  return (
    <div>
      <Header>
        <h1>좋아요한 매거진</h1>
      </Header>
      <LikeMagazineList>
        <MagazineItem></MagazineItem>
      </LikeMagazineList>
      <PageFooter />
    </div>
  );
};

export default LikeMagazine;

const Header = styled.div`
  height: 80px;
  border-bottom: 1px solid rgba(217, 217, 217, 1);
  padding: 10px;
  display: flex;
  justify-content: row;
  flex-direction: center;
  align-items: center;
`;

const LikeMagazineList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
