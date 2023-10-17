import { FC, MouseEventHandler } from 'react';
import { ColorHeartIcon, LineHeartIcon } from '../../assets/icon/icon';

interface HeartProps {
  like: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const Heart: FC<HeartProps> = ({ like, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        marginTop: '-4px',
        background: 'none',
        border: 'none',
        outline: 'none',
      }}
    >
      {like ? <ColorHeartIcon /> : <LineHeartIcon />}
    </button>
  );
};

export default Heart;
