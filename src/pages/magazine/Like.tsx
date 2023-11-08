import styled, { keyframes, css } from 'styled-components';
import { ColorHeartIcon, LineHeartIcon } from '../../assets/icon/icon';
import { LikeProps, HeartProps } from '../../type/type';
import { ButtonHTMLAttributes } from 'react';

interface HeartButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  like: boolean;
}

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

// const flyAndFade = keyframes`
//   0% {
//     transform: translateY(0);
//     /* opacity: 1; */
//   }
//   50% {
//     transform: translateY(-10rem);
//     /* opacity: 0; */
//   }
// `;

const Heart: React.FC<HeartProps> = ({ like, onClick }) => {
  return (
    <HeartButton like={like} onClick={onClick}>
      {like ? <ColorHeartIcon /> : <LineHeartIcon />}
    </HeartButton>
  );
};

// const Heart: React.FC<HeartProps> = ({ like, onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       style={{
//         marginTop: '-0.25rem',
//         background: 'none',
//         border: 'none',
//         outline: 'none',
//       }}
//     >
//       {like ? <ColorHeartIcon /> : <LineHeartIcon />}
//     </button>
//   );
// };

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
    props.like
      ? css`
          ${pop} 0.6s ease forwards
        `
      : 'none'};
`;
