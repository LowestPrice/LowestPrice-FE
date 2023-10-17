import styled from 'styled-components';


interface Props {
  realId?: string;
}

function OptionModalItem(props: Props) {
  return (
    <div>
      <Wrap>옵션</Wrap>
    </div>
  );
}

export default OptionModalItem;

const Wrap = styled.div`
  width: 100%;
  height: 40px;
`;
