import styled from 'styled-components';

type Props = {};

export default function NProductItem({}: Props) {
  return (
    <div>
      <Wrap>
        <NProductContent>
          <NProductImage></NProductImage>
          <NProductInfo>
            <div className='title'>Apple 정품 2022 아이패드 프로 11 4세대</div>
            <div className='option'> 옵션 1</div>
            <div className='price'> 0,000,000원</div>
          </NProductInfo>
        </NProductContent>
      </Wrap>
    </div>
  );
}

const Wrap = styled.div`
  width: 375px;
  height: 90px;
  gap: 6px;
  border-bottom: 1px solid rgba(243, 243, 243, 1);
  display: flex;
  flex-direction: row;
`;

const NProductContent = styled.div`
  width: 316px;
  height: 64px;
  gap: 6px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: auto;
`;

const NProductImage = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 7px;
  background-color: rgba(217, 217, 217, 1);
`;

const NProductInfo = styled.div`
  width: 256px;
  height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .title {
    font-size: 13px;
    font-weight: bold;
  }
  .option {
    font-size: 12px;
    color: rgba(111, 111, 111, 1);
  }
  .price {
    font-size: 12px;
    color: rgba(0, 0, 0, 1);
  }
`;
