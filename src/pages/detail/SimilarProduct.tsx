import styled from 'styled-components';

type Props = {};

function SimilarProduct({}: Props) {
  return (
    <div>
      <Wrap>
        <SimilarProductImage />
        <SimilarProductContent>
          <div className='Stitle'>Apple 정품 2022 아이패드 프로 11 4세대 M2칩...</div>
          <div className='SexistingPrice'>000,000원</div>
          <div className='Sprice'>
            000,000원<span className='discountRate'>00%</span>{' '}
          </div>
        </SimilarProductContent>
      </Wrap>
    </div>
  );
}

export default SimilarProduct;

const Wrap = styled.div`
  width: 125.34px;
  height: 165px;
`;

const SimilarProductImage = styled.div`
  width: 125.34px;
  height: 109.47px;
  border-radius: 15.87px;
  border: none;
  background-color: rgba(243, 243, 243, 1);
`;

const SimilarProductContent = styled.div`
  width: 123.75px;
  height: 49.98px;
  .Stitle {
    width: 123.75px;
    height: 28.38px;
    font-size: 11.11px;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .SexistingPrice {
    width: 70.6px;
    font-size: 9.52px;
    font-weight: 500;
    color: rgba(181, 181, 181, 1);
  }
  .Sprice {
    width: 104.26px;
    height: 14px;
    font-size: 12.69px;
    font-weight: 600;
  }
  .discountRate {
    width: 32.87px;
    height: 12.17px;
    padding: 1.59px;
    margin-left: 5px;
    background-color: rgba(243, 243, 243, 1);
    font-size: 7.93px;
    font-weight: 500;
    color: rgba(181, 181, 181, 1);
  }
`;
