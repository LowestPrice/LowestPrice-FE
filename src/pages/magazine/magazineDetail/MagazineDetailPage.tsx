import styled from 'styled-components';

import MagazineDetailData from './MagazineDetailData';

import { MagazineProps } from '../../../type';
import AnotherMagazine from './anotherMagazine/AnotherMagazine';

const MagazineDetail: React.FC<MagazineProps> = () => {
  return (
    <Container>
      <Scroll>
        <MagazineDetailData />
        <AnotherMagazine />
      </Scroll>
    </Container>
  );
};

export default MagazineDetail;

const Scroll = styled.div`
  width: 23.75rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 100vh;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto 0 auto;
  margin-bottom: 3.8125rem;
  position: relative;
`;
