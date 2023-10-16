import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 22px 0px;
  display: flex;
  overflow-x: hidden;
  align-items: center;
  position: relative;
  width: 375px;
  height: 375px;
`;

const Container = styled.div`
  background-color: rgba(0, 0, 0, 1);
  border-radius: 7px;
  display: flex;
  align-items: center;
  margin: 0 12.5px;
  cursor: pointer;
  position: relative;
`;

const Row = styled.div`
  width: 375px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  transition: all 0.5s ease-in-out;
`;

const Img = styled.img`
  border-radius: 7px;
  margin: 0;
  margin: 0 12.5px;
  position: relative;
  cursor: pointer;
  transition: all 0.5s linear;
  width: 300px;
  height: 300px;
  object-fit: cover;
`;
const PrivewImg = styled.img`
  transition: all 1s linear;
  border-radius: 7px;
  width: 300px;
  height: 300px;
  object-fit: cover;
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

const ImgWrapper = styled.div`
  position: relative;
`;

const WantedImg = [
  'https://thumbnail9.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2022/09/21/15/9/dbc3fc60-268d-4df2-b385-3a36d5960b52.jpg',
  'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2022/09/21/15/6/d39d5f95-018e-421e-b951-00028fe9eefe.jpg',
  'https://thumbnail7.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2022/09/21/15/3/901fbc93-ef89-42ca-814a-9908013177a8.jpg',
  'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2022/09/21/15/3/88853744-a5da-4bd5-9919-182308f18642.jpg',
  'https://thumbnail8.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/4433895814271343-8644f198-45af-4b3d-a287-13ba85e5f9f0.jpg',
  'https://thumbnail6.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/468019694639477-51cc43c9-1572-44dd-8c51-02e32690eb40.jpg',
  'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/4434336360697031-6a8c08f1-8703-4470-bbdc-8b8092683bc4.jpg',
  'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2033058241318549-3fb6d002-7ce9-4075-a28d-7d09a1e93795.jpg',
  'https://thumbnail10.coupangcdn.com/thumbnails/remote/230x230ex/image/retail/images/2023/03/09/11/3/2f88b94d-9bf8-483f-973c-ccf58d87e895.jpg',
];

function Slider() {
  //슬라이드
  const slideRef = useRef(null);
  const [index, setIndex] = useState(0); // 인덱스를 만들어줍니다.
  const [isSlide, setIsSlide] = useState(false); // 슬라이드 중인지 체크해줍니다. 슬라이드 중에 여러번 빠르게 클릭 못하게 하는 역할
  const [x, setX] = useState(0); // css에서 슬라이드 애니메이션 효과를 주기위해 x만큼 이동시키는 역할입니다.

  const increaseClick = async () => {
    if (isSlide) {
      return;
    }
    setX(-400);
    setIsSlide(true);
    await setTimeout(() => {
      setIndex((prev) => (prev === 8 ? 0 : prev + 1));
      setX(0);
      setIsSlide(false);
    }, 500);
    //setIndex((prev) => (prev === 7 ? 0 : prev + 1));
  };
  const decreaseClick = async () => {
    if (isSlide) {
      return;
    }
    setX(+400);
    setIsSlide(true);
    await setTimeout(() => {
      setIndex((prev) => (prev === 0 ? 8 : prev - 1));
      setX(0);
      setIsSlide(false);
    }, 500);
  };
  const morePrevImg = index === 1 ? 8 : index === 0 ? 7 : index - 2;
  const PrevImg = index === 0 ? 8 : index - 1;
  const NextImg = index === 8 ? 0 : index + 1;
  const moreNextImg = index === 8 ? 1 : index === 7 ? 0 : index + 2;
  //console.log(slideRef.current);
  //console.log(index);

  useEffect(() => {
    const autoPage = setTimeout(() => {
      setX(-400);
      setIsSlide(true);
      setTimeout(() => {
        setIndex((prev) => (prev === 8 ? 0 : prev + 1));
        setX(0);
        setIsSlide(false);
      }, 500);
    }, 5000);
    return () => {
      clearTimeout(autoPage);
    };
  }, [index]);
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
          <PrivewImg src={WantedImg[morePrevImg]}></PrivewImg>
        </Container>
        <Container>
          <PrivewImg src={WantedImg[PrevImg]}></PrivewImg>
        </Container>
        <ImgWrapper>
          <Img src={WantedImg[index]} />
        </ImgWrapper>
        <Container>
          <PrivewImg src={WantedImg[NextImg]}></PrivewImg>
        </Container>
        <Container>
          <PrivewImg src={WantedImg[moreNextImg]}></PrivewImg>
        </Container>
      </Row>

      <RightButton onClick={increaseClick}>
        <i className='fas fa-chevron-right'></i>
      </RightButton>
    </Wrapper>
  );
}

export default Slider;
