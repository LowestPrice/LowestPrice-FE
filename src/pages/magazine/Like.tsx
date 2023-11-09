import styled, { keyframes, css } from 'styled-components';
import { ColorHeartIcon, LineHeartIcon } from '../../assets/icon/icon';
import { LikeProps, HeartProps } from '../../type/type';
import React from 'react';
import { HeartButtonProps } from '../../type/type';

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// like의 값(boolean)에 따라 다른 아이콘을 보여줌
const Heart: React.FC<HeartProps> = React.memo(({ like, onClick }) => {
  return (
    <HeartButton $like={like} onClick={onClick}>
      {like ? <ColorHeartIcon /> : <LineHeartIcon />}
    </HeartButton>
  );
});

// 해당하는 매거진의 좋아요 상태와 좋아요 수 업데이트
const Like: React.FC<LikeProps> = ({ isLiked, magazineId, likeCount, handleLikeClick, index }) => {
  return (
    <div>
      <LikeFlex>
        <Heart like={isLiked} onClick={(event) => handleLikeClick(event, magazineId, index)} />
        <div>{likeCount}</div>
      </LikeFlex>
    </div>
  );
};

export default Like;

const LikeFlex = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 0.9375rem;
`;

const HeartButton = styled.button<HeartButtonProps>`
  margin-top: -0.25rem;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  animation: ${(props) =>
    props.$like
      ? css`
          ${pop} 0.6s ease forwards
        `
      : 'none'};
`;
