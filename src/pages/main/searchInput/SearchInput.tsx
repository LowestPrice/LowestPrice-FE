import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import uuid from 'react-uuid';

import SearchHistory from './recentSearch/RecentSearchList';

interface Props {
  handleFocusOn: () => void;
  searchFocus: boolean;
}

function SearchInput(props: Props) {
  const [searchState, setSearchState] = useState<string>('');

  // 네비게이트 -------------------

  const navigate = useNavigate();

  // 검색어 입력 ---------------------------------------------

  const onChangeSearchWord = (e: any) => {
    setSearchState(e.target.value);
  };

  // 최근검색어 localStorage 에 저장 --------------------------------------------

  const addRecentSearchKeyword = (keyword: string) => {
    if (!keyword) {
      return;
    }
    const storedRecentList = localStorage.getItem('recentSearchKeywordList');

    let recentList: { id: string; keyword: string }[] = [];

    if (storedRecentList) {
      recentList = JSON.parse(storedRecentList);
    }
    const newKeywordObj = { id: uuid(), keyword: keyword };
    const newRecentList = [...recentList, newKeywordObj];
    localStorage.setItem('recentSearchKeywordList', JSON.stringify(newRecentList));
  };

  return (
    <>
      <Wrap>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            if (searchState === '') {
              toast.error('검색어를 입력해주세요.');
            } else {
              addRecentSearchKeyword(searchState);
              navigate(`/search/${searchState}`);
            }
          }}
          style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
        >
          <Input
            type='text'
            placeholder='검색'
            value={searchState}
            onChange={(e) => {
              onChangeSearchWord(e);
            }}
            onFocus={() => props.handleFocusOn()}
            onClick={(e) => {
              e.stopPropagation();
            }}
          ></Input>
          <button style={{ display: 'none' }} />
          <XButton
            onClick={() => {
              setSearchState('');
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <path d='M18 6L6 18M18 18L6 6' stroke='#6F6F6F' strokeWidth='2' strokeLinecap='round' />
            </svg>
          </XButton>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (searchState === '') {
                toast.error('검색어를 입력해주세요.');
              } else {
                addRecentSearchKeyword(searchState);
                navigate(`/search/${searchState}`);
              }
            }}
          >
            <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
              <circle cx='11' cy='11' r='9' transform='rotate(180 11 11)' stroke='#6F6F6F' strokeWidth='2' />
              <path
                d='M22.2813 23.6954C22.6653 24.0923 23.2983 24.1028 23.6953 23.7189C24.0922 23.3349 24.1027 22.7018 23.7187 22.3048L22.2813 23.6954ZM23.7187 22.3048L17.615 15.9952L16.1776 17.3857L22.2813 23.6954L23.7187 22.3048Z'
                fill='#6F6F6F'
              />
            </svg>
          </div>
        </Form>
      </Wrap>
      <SearchHistory onOff={props.searchFocus} />
    </>
  );
}

export default React.memo(SearchInput);

const Wrap = styled.div`
  width: 20.9375rem;
  height: 3.75rem; /* 60px / 16 = 3.75rem */
  border-radius: 3.75rem; /* 60px / 16 = 3.75rem */
  margin-top: 1.25rem; /* 20px / 16 = 1.25rem */
  border: none;
  outline: none;
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  border-radius: 60px; /* 0.5px / 16 = 0.03125rem */
  border: 0.03125rem solid var(--gray02, #b5b5b5); /* 0.5px / 16 = 0.03125rem */
  background: #fff;

  /* Shadow01 */
  box-shadow: 0px 0.125rem 0.1875rem 0px rgba(0, 0, 0, 0.04), 0px 0.25rem 0.375rem 0.125rem rgba(0, 0, 0, 0.03);
  /* padding-left: 20px;
  padding-right: 20px; */
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 80%;
    height: 3.25rem;
  }
  @media screen and (min-width: 744px) {
    width: 80%;
    height: 3.25rem;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* transform: translate(-50%, 150%); */
`;

const Input = styled.input`
  width: 70%;
  height: 1.25rem; /* 20px / 16 = 1.25rem */
  border: none;
  outline: none;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 80%;
  }
  @media screen and (min-width: 744px) {
    width: 80%;
  }
`;

const XButton = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1.125rem; /* 18px / 16 = 1.125rem */
  height: 1.125rem; /* 18px / 16 = 1.125rem */
  margin-right: 15px; /* 10px / 16 = 0.625rem */
  cursor: pointer;
`;
