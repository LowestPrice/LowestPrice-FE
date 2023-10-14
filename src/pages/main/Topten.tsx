import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import SlideProduct from './ToptenProduct';
import { useQuery } from 'react-query';
import { getTopten } from '../../api/product';

function Topten() {
  //슬라이드
  const slideRef = useRef(null);
  const [index, setIndex] = useState<number>(0); // 인덱스를 만들어줍니다.
  const [isSlide, setIsSlide] = useState<boolean>(false); // 슬라이드 중인지 체크해줍니다. 슬라이드 중에 여러번 빠르게 클릭 못하게 하는 역할
  const [x, setX] = useState(0); // css에서 슬라이드 애니메이션 효과를 주기위해 x만큼 이동시키는 역할입니다.

  // 자동 넘기기---------------------------------------------------
  useEffect(() => {
    const autoPage = setTimeout(() => {
      setX(-264);
      setIsSlide(true);
      setTimeout(() => {
        setIndex((prev) => (prev === 9 ? 0 : prev + 1));
        setX(0);
        setIsSlide(false);
      }, 500);
    }, 3500);
    return () => {
      clearTimeout(autoPage);
    };
  }, [index]);
  console.log(index);

  // 할인율 상위 10위 API ----------------------------------------------------------
  const { isError, isLoading, data } = useQuery('topProduct', getTopten);

  if (isError) {
    return <div>예상치 못한 에러를 만났습니다. 다시 시도해주세요.</div>;
  }
  if (isLoading) {
    return <div>로딩중...</div>;
  }

  // 오른쪽 넘기기---------------------------------------------------

  const increaseClick = async () => {
    if (isSlide) {
      return;
    }
    setX(-264);
    setIsSlide(true);
    await setTimeout(() => {
      setIndex((prev) => (prev === 9 ? 0 : prev + 1));
      setX(0);
      setIsSlide(false);
    }, 500);
  };

  // 왼쪽 넘기기---------------------------------------------------

  const decreaseClick = async () => {
    if (isSlide) {
      return;
    }
    setX(+264);
    setIsSlide(true);
    await setTimeout(() => {
      setIndex((prev) => (prev === 0 ? 9 : prev - 1));
      setX(0);
      setIsSlide(false);
    }, 500);
  };

  // preview 위한 순서 index ------------------------------------------

  const morePrevIndex = index === 1 ? 9 : index === 0 ? 9 : index - 2;
  const PrevIndex = index === 0 ? 9 : index - 1;
  const NextIndex = index === 9 ? 0 : index + 1;
  const moreNextIndex = index === 9 ? 1 : index === 9 ? 0 : index + 2;

  // 화면 ----------------------------------------------------------------

  return (
    <Wrapper>
      <LeftButton onClick={decreaseClick}>
        <i className='fas fa-chevron-left'></i>
      </LeftButton>
      <Row
        key={index}
        ref={slideRef}
        style={{
          transform: `translateX(${x}px)`,
        }}
      >
        <Container>
          <PrivewProductWrap>
            <SlideProduct {...data[morePrevIndex]} index={morePrevIndex} />
          </PrivewProductWrap>
        </Container>
        <Container>
          <PrivewProductWrap>
            <SlideProduct {...data[PrevIndex]} index={PrevIndex} />
          </PrivewProductWrap>
        </Container>
        <IndexWrapper>
          <ProductWrap>
            <SlideProduct {...data[index]} index={index} />
          </ProductWrap>
        </IndexWrapper>
        <Container>
          <PrivewProductWrap>
            <SlideProduct {...data[NextIndex]} index={NextIndex} />
          </PrivewProductWrap>
        </Container>
        <Container>
          <PrivewProductWrap>
            <SlideProduct {...data[moreNextIndex]} index={moreNextIndex} />
          </PrivewProductWrap>
        </Container>
      </Row>

      <RightButton onClick={increaseClick}>
        <i className='fas fa-chevron-right'></i>
      </RightButton>
    </Wrapper>
  );
}

export default Topten;

const Wrapper = styled.div`
  display: flex;
  overflow: hidden;
  align-items: center;
  position: relative;
  width: 375px;
  height: 375px;
`;

const Container = styled.div`
  border-radius: 15px;
  display: flex;
  align-items: center;
  margin: 0 -3.5px;
  cursor: pointer;
  position: relative;
`;

const Row = styled.div`
  width: 375px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease-in-out;
`;

const ProductWrap = styled.div`
  border-radius: 15px;
  margin: 0 6px;
  position: relative;
  cursor: pointer;
  width: 258px;
  height: 258px;
  object-fit: cover;
  transition: all 0.5s linear;
`;
const PrivewProductWrap = styled.div`
  transition: all 1s linear;
  border-radius: 15px;
  width: 258px;
  height: 258px;
  object-fit: cover;
  margin: 0 6.5px;
`;

const Button = styled.button`
  display: flex;
  cursor: pointer;
  align-items: center;
  position: absolute;
  justify-content: center;
  border: none;
  font-size: 12px;
  height: 50px;
  border-radius: 60px;
  padding: 25px 10px;
  opacity: 0.5;
  z-index: 2;
  :hover {
    background-color: lightgray;
  }
  i {
    color: rgba(0, 0, 0, 0.5);
  }
`;

const LeftButton = styled(Button)`
  transition: all 0.5s ease-in-out;
  position: absolute;
  left: 10px;
`;

const RightButton = styled(Button)`
  transition: all 0.5s ease-in-out;
  position: absolute;
  right: 10px;
`;

const IndexWrapper = styled.div`
  position: relative;
`;
