import styled from 'styled-components';
import SearchProduct from './SearchProduct';
import Footer from '../../components/footer/Footer';

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
        <Options>
          <div className='filterOption'> 할인순</div>
          <div className='filterOption'> 낮은가격순</div>
          <div className='filterOption'> 높은가격순</div>
        </Options>
      </Filterbar>
      <SearchProductList>
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
        <SearchProduct />
      </SearchProductList>
      <Footer />
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
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 12px;
  color: rgba(181, 181, 181, 1);
  cursor: pointer;
`;

const Options = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 7px;
  height: 12px;
  padding-top: 10px;
  .filterOption {
    font-size: 12px;
    color: rgba(181, 181, 181, 1);
    cursor: pointer;
  }
`;

const SearchProductList = styled.div`
  width: 346px;
  max-height: 710px;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-thumb {
    height: 10%; /* 스크롤바의 길이 */
    background: rgba(181, 181, 181, 1);

    border-radius: 10px;
  }
  padding: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;
