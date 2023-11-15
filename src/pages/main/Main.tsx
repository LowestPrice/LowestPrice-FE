import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Cookies from 'js-cookie';
import 'swiper/css';
import 'swiper/css/scrollbar';

import Logo from '../../assets/icon/Logo';
import Splash from './Splash';
import Topten from './topten/Topten';
import SearchInput from './searchInput/SearchInput';
import Category from './category/Category';
import PageFooter from '../../components/footer/PageFooter';
import HelmetTag from '../../components/HelmetTag';

export default function Main() {
  // 상태 관리 ------------------------------------------------------------------------------------------------

  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const isLogin = Cookies.get('isLogin');

  useEffect(() => {
    if (showSplash) {
      const splashTime = setTimeout(() => {
        setShowSplash(false);
      }, 1500);
      return () => clearTimeout(splashTime);
    }
  });
  console.log('메인페이지 렌더링');

  // 검색창 포커스 onOff -----------------------------------

  const handleFocusOn = () => {
    setSearchFocus(true);
  };

  return (
    <>
      {showSplash && isLogin ? (
        <Splash />
      ) : (
        <>
          <HelmetTag
            title='내일은 최저가 | 홈'
            keywords='내일은 최저가 | 홈'
            description='쿠팡에서 스크래핑해 온 데이터로 만든 Apple 제품 검색 웹사이트입니다.'
            url='https://lowest-price.store/'
          />

          <MainWrap
            onClick={() => {
              setSearchFocus(false);
            }}
          >
            <Wraper>
              <Header>
                <Logo />
                <h3>내일은 최저가</h3>
              </Header>

              <Wrap>
                <SearchInput handleFocusOn={handleFocusOn} searchFocus={searchFocus} />

                <Title>
                  <div className='title'>오늘의 특가✔️</div>
                  <div className='subTitle'>할인율이 가장 높은 상품이에요</div>
                </Title>
                <Topten />
                <SubTitle>
                  <div>Apple 제품</div>
                  <div>가장 저렴할 때 구매하세요. 🔻</div>
                </SubTitle>
              </Wrap>

              <Category />
            </Wraper>
          </MainWrap>
          <PageFooter />
        </>
      )}
    </>
  );
}

const MainWrap = styled.div`
  height: 92%;
  overflow-x: hidden;
  position: fixed;
  padding-left: 20px;
  padding-right: 20px;
  min-width: 376px;
  &::-webkit-scrollbar {
    width: 0.3125rem; /* 5px / 16 = 0.3125rem */
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    height: 0.625rem; /* 10px / 16 = 0.625rem */
    background: rgba(181, 181, 181, 1);
    border-radius: 0.625rem; /* 10px / 16 = 0.625rem */
  }

  @media screen and (min-width: 744px) {
    width: 744px;
  }
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
`;

const Wraper = styled.div`
  height: 100%;
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  width: 375px;
  height: 3.875rem; /* 62px / 16 = 3.875rem */
  top: 2.125rem; /* 34px / 16 = 2.125rem */
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1); /* 1px / 16 = 0.0625rem */
  gap: 0.5rem; /* 8px / 16 = 0.5rem */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 0.9375rem; /* 15px / 16 = 0.9375rem */

  @media screen and (min-width: 744px) {
    width: 744px;
  }
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
`;

const Wrap = styled.div`
  width: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-left: 30px;
  padding-right: 30px;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Title = styled.div`
  height: 3.125rem; /* 50px / 16 = 3.125rem */
  .title {
    font-size: 1.5rem; /* 24px / 16 = 1.5rem */
    font-weight: 600;
  }
  .subTitle {
    font-size: 1rem; /* 16px / 16 = 1rem */
  }
  gap: 0.3125rem; /* 5px / 16 = 0.3125rem */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.25rem; /* 20px / 16 = 1.25rem */
`;

const SubTitle = styled.div`
  width: 100%;
  height: 4.375rem; /* 70px / 16 = 4.375rem */
  padding: 0.625rem; /* 10px / 16 = 0.625rem */
  border-bottom: 0.0625rem solid rgba(243, 243, 243, 1); /* 1px / 16 = 0.0625rem */
  font-size: 1.25rem; /* 20px / 16 = 1.25rem */
  gap: 1.375rem; /* 22px / 16 = 1.375rem */
  font-weight: 700;
  padding-left: 20px;
  @media screen and (max-width: 375px) {
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;
