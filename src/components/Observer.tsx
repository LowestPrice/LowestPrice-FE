import { useRef, useEffect } from 'react';
import styled from 'styled-components';

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

  return <Wrap ref={target}>이게 보이면? 다음 데이터를!</Wrap>;
}

const Wrap = styled.div`
  width: 300px;
  height: 10px;
`;
