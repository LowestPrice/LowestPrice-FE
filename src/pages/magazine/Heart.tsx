import { ColorHeartIcon, LineHeartIcon } from '../../assets/icon/icon';
import { HeartProps } from '../../type/type';

const Heart: React.FC<HeartProps> = ({ like, onClick }) => {
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
