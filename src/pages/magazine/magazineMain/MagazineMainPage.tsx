import styled from 'styled-components';

import MagazineData from './MagazineMainData';
import PageFooter from '../../../components/footer/PageFooter';
import { BlueLogo } from '../../../assets/icon/icon';

import { MagazineProps } from '../../../type';

const Magazine: React.FC<MagazineProps> = () => {
  return (
    <>
      <Header>
        <BlueLogo />
        <LogoTitle>매거진</LogoTitle>
      </Header>
      <MagazineData />
      <PageFooter />
    </>
  );
};

export default Magazine;

const Header = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 1.62rem;
  padding-bottom: 1.12rem;
  padding-left: 1.25rem;
  padding-right: 17.62rem;
  cursor: pointer;

  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const LogoTitle = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 110%;
  margin-left: 0.25rem;
  width: 2.9375rem;
`;
