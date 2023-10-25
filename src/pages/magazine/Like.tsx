import Heart from './Heart';
import styled from 'styled-components';
import { LikeProps } from '../../type/type';

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
  margin-right: 15px;
`;
