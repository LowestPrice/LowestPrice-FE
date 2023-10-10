import React from 'react';
import styled from 'styled-components';

type Props = {};

function Search({}: Props) {
  return (
    <div>
      <Header>
        <form>
          <SearchInput />
        </form>
      </Header>
      <Filterbar>
        <div className='filterOption'> 할인순</div>
        <div className='filterOption'> 낮은가격순</div>
        <div className='filterOption'> 높은가격순</div>
      </Filterbar>
    </div>
  );
}

export default Search;

const Header = styled.div`
  width: 375px;
  height: 62px;
  top: 34px;
  padding: 12px, 51px, 12px, 12px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  gap: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 288px;
  height: 38px;
  border-radius: 46.21px;
  border: none;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  outline: none;
`;

const Filterbar = styled.div`
  width: 375px;
  height: 31px;
  top: 104px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  flex-direction: row;
  gap: 7px;
  .filterOption {
    font-size: 12px;
    color: rgba(181, 181, 181, 1);
  }
`;
