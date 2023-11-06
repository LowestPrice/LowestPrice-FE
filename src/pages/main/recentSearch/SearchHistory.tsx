import styled from 'styled-components';
import SearchKeywordItem from './SearchKeywordItem';

interface Props {
  onOff: boolean;
}

function SearchHistory(props: Props) {
  const storedRecentList = localStorage.getItem('recentSearchKeywordList');

  let recentList: { id: string; keyword: string }[] = [];

  if (storedRecentList) {
    recentList = JSON.parse(storedRecentList);
  }

  return (
    <>
      {recentList.length !== 0 ? (
        <Wrap $onOff={props.onOff}>
          <Title>최근 검색어</Title>
          {recentList.map((item, index) => {
            return <SearchKeywordItem key={index} keyword={item.keyword} />;
          })}
        </Wrap>
      ) : (
        <div></div>
      )}
    </>
  );
}

export default SearchHistory;

const Wrap = styled.div<{ $onOff: boolean }>`
  opacity: ${(props) => (props.$onOff ? '100' : '0')};
  z-index: ${(props) => (props.$onOff ? '1000' : '-10')};
  transition: all 1s;
  width: 350px;
  position: absolute;
  top: 150px;
  border: 1px solid var(--gray01, #d9d9d9);
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 90%;
  }
  @media screen and (min-width: 744px) {
    width: 90%;
  }
`;

const Title = styled.div`
  font-weight: 500;
  color: var(--gray03, #6f6f6f);
  background-color: white;
  height: 45px;
  display: flex;
  padding-top: 5px;
  padding-left: 10px;
  flex-direction: column;
  justify-content: center;
  border-top: 1px solid var(--gray01, #d9d9d9);
`;
