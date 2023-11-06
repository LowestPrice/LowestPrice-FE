import { useNavigate } from 'react-router';
import styled from 'styled-components';

interface Props {
  keyword: string;
}

function SearchKeywordItem(props: Props) {
  const navigate = useNavigate();

  return (
    <Wrap
      onClick={(e) => {
        e.preventDefault();
        navigate(`/search/${props.keyword}`);
      }}
    >
      <TimeIcon>
        <svg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 22 22' fill='none'>
          <path
            d='M17.8793 11C17.8793 15.5563 14.1847 19.25 9.62714 19.25C5.06961 19.25 1.375 15.5563 1.375 11C1.375 6.44365 5.06961 2.75 9.62714 2.75C12.6816 2.75 15.3485 4.40907 16.7753 6.875M15.6155 11.9054L17.6785 9.84285L19.7416 11.9054M12.7188 13.2496L9.625 12.2184V7.90625'
            stroke='#6F6F6F'
            strokeWidth='1.83333'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </TimeIcon>
      <div>{props.keyword}</div>
      <XButton>
        <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path d='M18 6L6 18M18 18L6 6' stroke='#B5B5B5' strokeWidth='2' strokeLinecap='round' />
        </svg>
      </XButton>
    </Wrap>
  );
}

export default SearchKeywordItem;

const Wrap = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--gray01, #d9d9d9);
  background: #f8f8f8;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  position: relative;
  &:hover {
    background-color: lightgray;
  }
  div {
    color: var(--gray03, #6f6f6f);
  }
`;

const TimeIcon = styled.div`
  margin-left: 10px;
`;

const XButton = styled.div`
  position: absolute;
  right: 10px;
`;
