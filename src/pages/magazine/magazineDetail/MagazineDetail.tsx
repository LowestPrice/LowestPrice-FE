import { useNavigate, useParams } from 'react-router-dom';
import { MagazineProps } from '../../../type/type';
import { deleteMagazine, getMagazineDetail, getAnotherMagazine } from '../../../api/magazine';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { BackIcon, DropDownIcon, ShareIcon } from '../../../assets/icon/icon';
import { useRef } from 'react';
import useDropDown from '../../../hooks/useDropDown';
import { DropDownProps } from '../../../type/type';
import styled from 'styled-components';
import Like from '../Like';

const MagazineDetail: React.FC<MagazineProps> = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useDropDown(dropDownRef, false);

  // 데이터 불러오기
  const { isLoading: isLoadingDetail, isError: isErrorDetail, data: dataDetail } = useQuery(['posts', id], () => getMagazineDetail(id));
  const magazineData = dataDetail?.data.data;

  // 데이터 삭제하기
  const deletePosts = useMutation(deleteMagazine, {
    onSuccess: () => {
      queryClient.invalidateQueries('posts');
    },
    onError: (error) => {
      console.log('error 발생', error);
    },
  });

  const onDeleteButtonHandler = (id: any) => {
    deletePosts.mutate({ id });
    alert('삭제되었습니다.');
  };

  // 다른 매거진
  const { isLoading: isLoadingAnother, isError: isErrorAnother, data: dataAnother } = useQuery('anotherPosts', () => getAnotherMagazine(id));
  const anotherMagazine = dataAnother?.data.data;

  // 드롭다운 (수정/삭제 이동)
  const DropDown: React.FC<DropDownProps> = ({ onEditClick, onDeleteClick }) => {
    return (
      <>
        <li onClick={onEditClick}>수정</li>
        <li onClick={onDeleteClick}>삭제</li>
      </>
    );
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
        <Img src={magazineData.mainImage} alt='매거진 이미지' />
        <TitleWrap>
          <Title>{magazineData.title}</Title>
          <EditorShareFlex>
            <Editor>에디터 관리자</Editor>
            <StyledShareIcon>
              <ShareIcon />
            </StyledShareIcon>
          </EditorShareFlex>
        </TitleWrap>
        <Flex>
          <Button onClick={() => navigate('/magazine')} key={magazineData.magazineId}>
            <BackIcon />
          </Button>
          <MagazineTitle>
            <TopText>매거진</TopText>
            {magazineData.title}
          </MagazineTitle>
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
            <DropDownIcon />
          </Button>
        </Flex>
      </TopBox>
      <TextArea>{magazineData.content}</TextArea>
      <AnotherMagazine>다른 매거진 보기</AnotherMagazine>
      {anotherMagazine &&
        anotherMagazine.slice(0, 4).map((magazine: any, index: any) => (
          <AnotherContentButton
            key={index}
            style={{ backgroundImage: `url(${magazine.mainImage})` }}
            onClick={() => navigate(`/magazine/${magazine.magazineId}`)}
          >
            <AnotherContentTitle>{magazine.title}</AnotherContentTitle>
            <AnotherContentEditor>by 관리자</AnotherContentEditor>
          </AnotherContentButton>
        ))}
    </Container>
  );
};

export default MagazineDetail;

const Container = styled.div`
  width: 100%;
  margin: 0 auto 0 auto;
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
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 500;
  color: #ffffff;
  margin-left: 20px;
`;

const Editor = styled.div`
  font-size: 14px;
  font-weight: 400;
  margin-top: 12.5px;
  margin-left: 20px;
  margin-bottom: 18.5px;
  color: #fff;
  line-height: 129%;
`;

const TextArea = styled.div`
  width: 335px;
  margin: 20px;
  background-color: #f3f3f3;
  resize: none;
  overflow-y: auto;
  min-height: 344px;
  line-height: 1.5;
`;

const AnotherContentButton = styled.button`
  width: 375px;
  height: 125px;
  background-color: ligthgrey;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const AnotherContentTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
  margin-left: 20px;
`;

const AnotherContentEditor = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 22px;
  margin: 0px 0px 20px 20px;
`;

const MagazineTitle = styled.div`
  z-index: 999;
  font-size: 12px;
  font-weight: 300;
  color: #fff;
  display: flex;
  flex-direction: row;
  align-items: center;
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
  width: 32px;
  padding: 0px 6px 0px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 6px;
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
`;

const Img = styled.img`
  width: 100%;
  height: 301px;
  object-fit: cover;
  position: absolute;
  z-index: 10;
`;

const AnotherMagazine = styled.div`
  font-size: 20px;
  font-weight: 600;
  height: 125px;
  display: flex;
  align-items: center;
`;

const EditorShareFlex = styled.div`
  width: 375px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const StyledShareIcon = styled(ShareIcon)`
  margin-right: 20px;
  margin-bottom: 12px;
`;
