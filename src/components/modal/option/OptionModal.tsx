import styled from 'styled-components';
import OptionModalItem from './OptionModalItem';

interface Props {

}

function OptionModal(props: Props) {
  return (
    <Wrap>
      <OptionModalItem></OptionModalItem>
      <OptionModalItem></OptionModalItem>
      <OptionModalItem></OptionModalItem>
      <OptionModalItem></OptionModalItem>
    </Wrap>
  );
}

export default OptionModal;

const Wrap = styled.div`
  width: 335px;
  border: 1px solid #b5b5b5;
`;
