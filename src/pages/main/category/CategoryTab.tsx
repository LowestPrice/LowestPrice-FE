import styled from 'styled-components';
interface Props {
  children: number;
  isCategorySelected: boolean[];
  handleCategoryButton: any;
  index: number;
  content: any;
}

function CategoryTab(props: Props) {
  return (
    <div>
      <Wrap
        onClick={() => props.handleCategoryButton(props.index)}
        style={{
          backgroundColor: `${props.isCategorySelected[props.index] ? '#0FB4FF' : 'white'}`,
          color: `${props.isCategorySelected[props.index] ? 'white' : 'black'}`,
        }}
      >
        {props.content}
      </Wrap>
    </div>
  );
}

export default CategoryTab;

const Wrap = styled.button`
  width: 96px;
  height: 38px;
  border-radius: 32px;
  border: 1px solid rgba(217, 217, 217, 1);
  background-color: white;
  font-size: 16px;
  font-weight: 500;
  flex-shrink: 0;
  flex-basis: 96px;
`;
