import styled from 'styled-components';

type Props = {};

function MagazineItem({}: Props) {
  return (
    <Wrap>
      <Article>
        <h2>매거진 타이틀</h2>
      </Article>
    </Wrap>
  );
}

export default MagazineItem;

const Wrap = styled.div`
  width: 100%;
  height: 150px;
  background-color: rgba(217, 217, 217, 1);
`;

const Article = styled.div``;
