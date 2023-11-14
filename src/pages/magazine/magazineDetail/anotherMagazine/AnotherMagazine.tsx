import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';

import { getAnotherMagazine } from '../../../../api/magazine';

const AnotherMagazine = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoading, isError, data } = useQuery(['anotherPosts', id], () => getAnotherMagazine(id));

  const anotherMagazine = data?.data.data;

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }

  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <>
      <Another>
        <AnotherText>다른 매거진 보기</AnotherText>
      </Another>
      {anotherMagazine &&
        anotherMagazine.map((Anotehrmagazine: any, index: number) => (
          <AnotherContentButton
            key={index}
            style={{
              backgroundImage: `url(${Anotehrmagazine.mainImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
            onClick={() => navigate(`/magazine/${Anotehrmagazine.magazineId}`)}
          >
            <Overlay>
              <AnotherContentTitle>{Anotehrmagazine.title}</AnotherContentTitle>
              <AnotherContentEditor>by 관리자</AnotherContentEditor>
            </Overlay>
          </AnotherContentButton>
        ))}
    </>
  );
};

export default AnotherMagazine;

const AnotherContentButton = styled.button`
  height: 7.8125rem;
  background-color: lightgrey;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 0.0625rem solid #fff;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), lightgray;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 0.0625rem solid #fff;
  position: relative;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const AnotherContentTitle = styled.div`
  font-size: 1.25rem;
  line-height: 110%;
  font-weight: 500;
  margin-left: 1.25rem;
  color: #fff;
  padding: 0.125rem;
`;

const AnotherContentEditor = styled.div`
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 1.375rem;
  margin: 0 1.25rem 1.25rem 1.25rem;
  color: #fff;
  margin-top: 0.75rem;
  padding: 0.0625rem;
`;

const Another = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  height: 5.562rem;
  display: flex;
  align-items: center;
  border-top: 0.5rem solid #f3f3f3;
  padding-left: 1rem;
`;

const AnotherText = styled.div`
  padding-top: 3.062rem;
  padding-bottom: 1.25rem;
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-top: 3.4375rem;
  padding-bottom: 1.4375rem;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;
