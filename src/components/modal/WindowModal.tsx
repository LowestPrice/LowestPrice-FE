import styled from 'styled-components';

import { WindowModalProps } from '../../type';

const WindowModal: React.FC<WindowModalProps> = ({ isOpen, onClose, onConfirm }) => {
  return (
    isOpen && (
      <Modal>
        <Delete>삭제하시겠습니까?</Delete>
        <ModalButtonFlex>
          <ModalButtonLeft onClick={onConfirm}>예</ModalButtonLeft>
          <ModalButtonRight onClick={onClose}>아니요</ModalButtonRight>
        </ModalButtonFlex>
      </Modal>
    )
  );
};

export default WindowModal;

const Modal = styled.div`
  position: fixed;
  top: 27%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  width: 12.625rem;
  height: 6.813rem;
  background-color: #f3f3f3;
  border-radius: 0.6875rem;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.06);
  @media screen and (max-width: 743px) and (min-width: 376px) {
    top: 40%;
  }
  @media screen and (min-width: 744px) {
    top: 27%;
  }
`;

const ModalButtonFlex = styled.div`
  display: flex;
  flex-direction: row;
`;
const ModalButtonLeft = styled.button`
  color: #6f6f6f;
  width: 6.1875rem;
  height: 1.9375rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-top: 1px solid #6f6f6f;
  border-right: 1px solid #6f6f6f;
  background-color: transparent;
`;

const ModalButtonRight = styled.button`
  color: #ff4545;
  width: 6.1875rem;
  height: 1.9375rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-top: 1px solid #6f6f6f;
  background-color: transparent;
`;

const Delete = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 2.44rem;
  padding-bottom: 1.44rem;
`;
