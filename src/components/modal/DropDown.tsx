import React, { useState } from 'react';
import { MypageEditIcon, DeleteIcon } from '../../assets/icon/icon';
import { DropDownProps, DropDownListProps } from '../../type/type';
import WindowModal from './WindowModal';
import styled from 'styled-components';

// 드롭다운 (수정/삭제 이동)
const DropDown: React.FC<DropDownProps> = ({ onEditClick, onDeleteClick }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const confirmDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation(); // 버블링을 방지
    setModalOpen(true);
  };

  return (
    <>
      <DropDownList onClick={onEditClick} top='50px' color='black' borderRadius='6px 6px 0px 0px'>
        <DropDownText>
          수정하기
          <MypageEditIcon />
        </DropDownText>
      </DropDownList>
      <DropDownList
        onClick={(event) => (onDeleteClick ? confirmDeleteClick(event) : console.error('onDeleteClick 함수가 정의되지 않았습니다.'))}
        top='96px'
        color='red'
        borderRadius='0px 0px 6px 6px'
      >
        <DropDownText>
          삭제하기
          <DeleteIcon />
        </DropDownText>
      </DropDownList>
      <WindowModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          onDeleteClick?.();
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default DropDown;

const DropDownList = styled.li<DropDownListProps>`
  width: 8.375rem;
  height: 2.875rem;
  list-style-type: none;
  background-color: #fff;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: ${({ top }) => top};
  color: ${({ color }) => color};
  border-radius: ${({ borderRadius }) => borderRadius};
  right: 30px;
  z-index: 20;
  display: flex;
`;

const DropDownText = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;
