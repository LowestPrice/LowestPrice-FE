import { useNavigate, useParams } from 'react-router-dom';
import { MagazineProps } from '../../../type/type';
import { deleteMagazine, getMagazineDetail, getAnotherMagazine } from '../../../api/magazine';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BackIcon, DropDownIcon, GreyShareIcon } from '../../../assets/icon/icon';
import { useState, useRef } from 'react';
import useDropDown from '../../../hooks/useDropDown';
import { DropDownProps } from '../../../type/type';
import styled from 'styled-components';
import Like from '../Like';
import { useLike } from '../../../hooks/useLike';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ShareFooter from '../../../components/footer/ShareFooter';

const MagazineDetail: React.FC<MagazineProps> = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useDropDown(dropDownRef, false);
  const location = useLocation();
  const index = location.state?.index;
  const [share, setShare] = useState<boolean>(false);

  // 데이터 불러오기
  const { isLoading: isLoadingDetail, isError: isErrorDetail, data: dataDetail } = useQuery(['posts', id], () => getMagazineDetail(id));
  const magazineData = dataDetail?.data;
  const isAdmin = dataDetail?.admin;

  const dateData = dataDetail?.data.createdAt;

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
    toast.success('삭제되었습니다.');
  };

  // 좋아요
  const { handleLikeClick } = useLike(false, 0);

  // 다른 매거진
  const { isLoading: isLoadingAnother, isError: isErrorAnother, data: dataAnother } = useQuery('anotherPosts', () => getAnotherMagazine(id));
  const anotherMagazine = dataAnother?.data.data;

  // 드롭다운 (수정/삭제 이동)
  const DropDown: React.FC<DropDownProps> = ({ onEditClick, onDeleteClick }) => {
    return (
      <>
        <DropDownList onClick={onEditClick}>수정</DropDownList>
        <DropDownList onClick={onDeleteClick}>삭제</DropDownList>
      </>
    );
  };

  // 공유하기
  const handleShareButton = () => {
    setShare(!share);
  };

  if (isLoadingDetail || isLoadingAnother) {
    return <h1>로딩중입니다</h1>;
  }

  if (isErrorDetail || isErrorAnother) {
    return <h1>에러가 발생했습니다.</h1>;
  }

  return (
    <Container>
      <TopBox>
        <ImgBackground>
          <Img src={magazineData.mainImage} alt='매거진 이미지' />
        </ImgBackground>
        <TitleWrap>
          <Title>{magazineData.title}</Title>
          <EditorShareFlex>
            <Editor>작성 날짜: {writtenDate}</Editor>
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
          handleLikeClick={(event) => handleLikeClick(event, magazineData.magazineId, index)}
        />
        <StyledGreyShareIcon>
          <GreyShareIcon onClick={handleShareButton} />
        </StyledGreyShareIcon>
      </LikeShareIconFlex>
      <AnotherMagazine>
        <AnotherText>다른 매거진 보기</AnotherText>
      </AnotherMagazine>
      {anotherMagazine &&
        anotherMagazine.slice(0, 4).map((magazine: any, index: any) => (
          <AnotherContentButton
            key={index}
            style={{ backgroundImage: `url(${magazine.mainImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
            onClick={() => navigate(`/magazine/${magazine.magazineId}`)}
          >
            <Overlay>
              <AnotherContentTitle>{magazine.title}</AnotherContentTitle>
              <AnotherContentEditor>by 관리자</AnotherContentEditor>
            </Overlay>
          </AnotherContentButton>
        ))}
      <ShareFooter
        share={share}
        handleShareButton={handleShareButton}
        title={dataDetail?.data.title}
        mainImage={dataDetail?.data.mainImage}
        id={dataDetail?.data.magazineId}
      ></ShareFooter>
    </Container>
  );
};

export default MagazineDetail;

const Container = styled.div`
  width: 100%;
  margin: 0 auto 0 auto;
  margin-bottom: 61px;
  position: relative;
`;

const TopBox = styled.div`
  height: 301px;
  position: relative;
  width: 100%;
  object-fit: cover;
`;

const TitleWrap = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 999;
  padding-bottom: 10px;
  padding-top: 220px;
  background-color: rgba(0, 0, 0, 0.3);
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 500;
  color: #ffffff;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const Editor = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-left: 20px;
  margin-bottom: 18.5px;
  color: #fff;
  line-height: 129%;
`;

const TextArea = styled.div`
  width: 335px;
  resize: none;
  overflow-y: auto;
  min-height: 344px;
  display: flex;
  justify-content: center;
  margin: 20px;
`;

const AnotherContentButton = styled.button`
  width: 375px;
  height: 125px;
  background-color: ligthgrey;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  border-bottom: 1px solid #fff;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.3) 100%), lightgray -2px -168.615px / 101.067% 375% no-repeat;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #fff;
  position: relative;
`;

const AnotherContentTitle = styled.div`
  font-size: 20px;
  line-height: 110%;
  font-weight: 500;
  margin-left: 20px;
  color: #fff;
  padding: 2px;
`;

const AnotherContentEditor = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  margin: 0px 0px 20px 20px;
  color: #fff;
  margin-top: 12px;
  padding: 1px;
`;

const MagazineTitle = styled.div`
  z-index: 999;
  display: flex;
  align-items: center;
  width: 130px;
`;

const TitleText = styled.div`
  flex-grow: 1;
  font-size: 12px;
  font-weight: 300;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TopText = styled.div`
  z-index: 999;
  color: #fff;
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 300;
  line-height: 110%;
  border-radius: 10px;
  border: 0.4px solid #fff;
  width: auto;
  padding: 0px 6px 0px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
  white-space: nowrap;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 22px 0px 22px 0px;
  background-color: transparent;
  z-index: 999;
`;

const Button = styled.div`
  width: 24px;
  height: 24px;
  background-color: transparent;
  z-index: 999;
  cursor: pointer;
`;

const Img = styled.img`
  width: 375px;
  height: 301px;
  object-fit: cover;
  position: absolute;
  z-index: 10;
`;

const ImgBackground = styled.div`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%), lightgray;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #b5b5b5;
`;

const AnotherMagazine = styled.div`
  font-size: 20px;
  font-weight: 600;
  height: 89px;
  display: flex;
  align-items: center;
  border-top: 8px solid #f3f3f3;
  padding-left: 16px;
`;

const AnotherText = styled.div`
  padding-top: 49px;
  padding-bottom: 20px;
`;

const EditorShareFlex = styled.div`
  width: 375px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const LikeShareIconFlex = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 37.5px;
  margin-bottom: 14px;
  margin-left: 10px;
`;

const StyledGreyShareIcon = styled.button`
  margin-right: 20px;
  margin-top: -1px;
  background-color: transparent;
  border: none;
`;

const StyledBackIcon = styled(BackIcon)`
  margin-left: 20px;
`;

const StyledDropDownIcon = styled(DropDownIcon)`
  margin-right: 20px;
  position: absolute;
  top: 22px;
`;

const DropDownList = styled.li`
  width: 50px;
  height: 30px;
  list-style-type: none;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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
  padding-top: 55px;
  padding-bottom: 23px;
`;
