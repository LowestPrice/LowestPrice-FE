import { useRef, useEffect } from 'react';
import styled from 'styled-components';
import spinner from '../assets/image/spiner.gif';

interface Props {
  handleIntersection: any;
}

export default function Observer(props: Props) {
  const target = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]) => {
        if (entry.isIntersecting) {
          props.handleIntersection();
        }
      },
      { threshold: 1 }
    );

    if (target.current) {
      observer.observe(target.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <Wrap ref={target}>
      <img src={spinner} alt='로딩 중' width='50' height='50' />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 100%;
  height: 0.625rem;
`;
