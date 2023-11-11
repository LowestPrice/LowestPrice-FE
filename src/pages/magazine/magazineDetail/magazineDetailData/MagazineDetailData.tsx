import { useState, useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';

import ShareFooter from '../../../../components/footer/ShareFooter';
import useDropDown from '../../../../hooks/useDropDown';
import DropDown from '../../../../components/modal/DropDown';
import AnotherMagazine from './anotherMagazine/AnotherMagazine';
import { useLike } from '../../../../hooks/useLike';
import Like from '../../Like';
import { BackIcon, DropDownIcon, ShareIcon } from '../../../../assets/icon/icon';

import { deleteMagazine, getMagazineDetail } from '../../../../api/magazine';

const MagazineDetailData = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const index = location.state?.index;
  const [share, setShare] = useState<boolean>(false);

  // 데이터 불러오기
  const { isLoading, isError, data } = useQuery(['posts', id], () => getMagazineDetail(id));
  const magazineData = data?.data;
  const isAdmin = data?.admin;

  const dateData = data?.data.createdAt;

  // 날짜 데이터 형식 변환하기
  const WrittenDate = () => {
    if (!dateData) return '날짜 정보 없음';
    const [formattedDate] = dateData.split('T');
    const [year, month, day] = formattedDate.split('-');
    return `${year}년 ${month}월 ${day}일`;
  };

  const writtenDate = WrittenDate();

  // 데이터 삭제하기
  const deletePosts = useMutation(deleteMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries(['posts', id]);
      queryClient.invalidateQueries('magazineData');
    },
    onError: (error) => {
      console.log('error 발생', error);
    },
  });

  const onDeleteButtonHandler = (id: any) => {
    deletePosts.mutate({ id });
    toast.success('삭제되었습니다✅');
  };

  // 좋아요
  const { handleLikeClick } = useLike(false, 0);

  // 공유하기
  const handleShareButton = () => {
    setShare(!share);
  };

  // 드롭다운
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useDropDown(dropDownRef, false);

  if (isLoading) {
    return <h1>로딩중입니다</h1>;
  }

  if (isError) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <Scroll>
      <Container>
        <TopBox>
          <Img src={magazineData.mainImage} alt='매거진 이미지' />
          <TitleWrap>
            <Title>{magazineData.title}</Title>
            <EditorShareFlex>
              <Editor>작성 날짜: {writtenDate}</Editor>
              <ShareIcon onClick={handleShareButton} style={{ cursor: 'pointer', marginRight: '1rem', marginBottom: '1.5rem' }} />
              <ShareFooter
                share={share}
                handleShareButton={handleShareButton}
                title={data?.data.title}
                mainImage={data?.data.mainImage}
                id={data?.data.magazineId}
              ></ShareFooter>
            </EditorShareFlex>
          </TitleWrap>
          <Flex>
            <Button onClick={() => navigate('/magazine')} key={magazineData.magazineId}>
              <StyledBackIcon>
                <BackIcon />
              </StyledBackIcon>
            </Button>
            <MagazineTitle>
              <TopText>매거진</TopText>
              <TitleText>{magazineData.title}</TitleText>
            </MagazineTitle>
            {isAdmin ? (
              <Button ref={dropDownRef} onClick={() => setIsOpen(!isOpen)}>
                {isOpen && (
                  <DropDown
                    onEditClick={() => {
                      navigate(`/magazineEditing/${magazineData.magazineId}`, { state: { props: magazineData } });
                      setIsOpen(false);
                    }}
                    onDeleteClick={() => {
                      onDeleteButtonHandler(id);
                      navigate('/magazine');
                      setIsOpen(false);
                    }}
                  />
                )}
                <StyledDropDownIcon>
                  <DropDownIcon />
                </StyledDropDownIcon>
              </Button>
            ) : (
              <div></div>
            )}
          </Flex>
        </TopBox>
        <TextArea>
          <ReactQuill value={magazineData.content} readOnly={true} theme={'bubble'} style={{ overflow: 'hidden' }} />
        </TextArea>
        <LikeShareIconFlex>
          <Like
            isLiked={magazineData.isLiked}
            magazineId={magazineData.magazineId}
            likeCount={magazineData.LikeMagazine}
            index={index}
            handleLikeClick={(event: any) => handleLikeClick(event, magazineData.magazineId, index)}
          />
        </LikeShareIconFlex>
        <AnotherMagazine />
      </Container>
    </Scroll>
  );
};

export default MagazineDetailData;

const StyledDropDownIcon = styled(DropDownIcon)`
  margin-right: 1.25rem;
  position: absolute;
  top: 1.22rem;
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto 0 auto;
  margin-bottom: 3.8125rem;
  position: relative;
`;

const TopBox = styled.div`
  height: 18.8125rem;
  position: relative;
  object-fit: cover;
  display: flex;
  justify-content: center;
`;

const TitleWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 10;
  padding-bottom: 0.625rem;
  padding-top: 13.75rem;
  background-color: rgba(0, 0, 0, 0.3);
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const Title = styled.div`
  font-size: 1.625rem;
  font-weight: 500;
  color: #ffffff;
  margin-left: 1.25rem;
  margin-bottom: 0.625rem;
`;

const Editor = styled.div`
  font-size: 0.875rem;
  font-weight: 400;
  margin-left: 1.25rem;
  margin-bottom: 1.15625rem;
  color: #fff;
  line-height: 129%;
`;

const TextArea = styled.div`
  overflow-y: auto;
  min-height: 21.5rem;
  display: flex;
  justify-content: center;
  margin: 1.25rem;
`;

const MagazineTitle = styled.div`
  z-index: 20;
  display: flex;
  align-items: center;
  width: 8.125rem;

  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 18.125rem;
  }
  @media screen and (min-width: 744px) {
    width: 18.125rem;
  }
`;

const TitleText = styled.div`
  flex-grow: 1;
  font-size: 0.75rem;
  font-weight: 300;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TopText = styled.div`
  color: #fff;
  text-align: center;
  font-size: 0.75rem;
  font-style: normal;
  font-weight: 300;
  line-height: 110%;
  border-radius: 0.625rem;
  border: 0.025rem solid #fff;
  width: 5rem;
  padding: 0 0.375rem;
  margin-right: 0.375rem;
`;

const Flex = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.375rem 1.5rem;
  background-color: transparent;

  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const Button = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  z-index: 500;
  cursor: pointer;
`;

const Img = styled.img`
  width: 23.438rem;
  height: 18.812rem;
  object-fit: cover;
  position: absolute;
  z-index: 10;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

const EditorShareFlex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-right: 1.25rem;
`;

const LikeShareIconFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.344rem;
  margin-bottom: 0.875rem;
  margin-left: 0.625rem;
`;

const StyledBackIcon = styled(BackIcon)`
  margin-left: 1.25rem;
`;

const Scroll = styled.div`
  width: 23.75rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 100vh;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;
