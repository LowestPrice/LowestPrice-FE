import styled from 'styled-components';

interface Props {
  currentPrice: number;
  discountRate: number;
  productId: number;
  productName: string;
  handleOptionButton: any;
}
function OptionModalItem(props: Props) {
  return (
    <div>
      <Wrap
        onClick={() => {
          props.handleOptionButton(props.productId);
        }}
      >
        {props.productName}
      </Wrap>
    </div>
  );
}

export default OptionModalItem;

const Wrap = styled.div`
  width: 288px;
  height: 40px;
  padding-left: 13px;
  background-color: white;
  color: black;
  border-bottom: 1px solid gray;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
`;
