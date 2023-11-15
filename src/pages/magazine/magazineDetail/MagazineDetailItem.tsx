import { useRef } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import 'react-quill/dist/quill.snow.css';

import useDropDown from '../../../hooks/useDropDown';
import DropDown from '../../../components/modal/DropDown';
import Like from '../Like';
import { BackIcon, DropDownIcon, ShareIcon } from '../../../assets/icon/icon';
import ShareFooter from '../../../components/footer/ShareFooter';

import { magazine } from '../../../type';

interface Props extends magazine {
  writtenDate: string;
  handleShareButton: () => void;
  share: boolean;
  isAdmin: boolean;
  isOpen: boolean;
  magazineData: any;
  onDeleteButtonHandler: (id: string) => void;
  isLiked: boolean;
  LikeMagazine: any;
  id: string;
}
const MagazineDetailItem = (props: Props) => {
  const navigate = useNavigate();

  // 드롭다운
  const dropDownRef = useRef(null);
  const [isOpen, setIsOpen] = useDropDown(dropDownRef, false);

  return (
    <div>
      <TopBox>
        <Img src={props.mainImage} alt='매거진 이미지' />
        <TitleWrap>
          <Title>{props.title}</Title>
          <EditorShareFlex>
            <Editor>작성 날짜: {props.writtenDate}</Editor>
            <ShareIcon onClick={props.handleShareButton} style={{ cursor: 'pointer', marginRight: '1rem', marginBottom: '1.5rem' }} />
            <ShareFooter
              share={props.share}
              handleShareButton={props.handleShareButton}
              title={props.title}
              mainImage={props.mainImage}
              id={props.magazineId}
            ></ShareFooter>
          </EditorShareFlex>
        </TitleWrap>
        <Flex>
          <Button onClick={() => navigate('/magazine')} key={props.magazineId}>
            <StyledBackIcon>
              <BackIcon />
            </StyledBackIcon>
          </Button>
          <MagazineTitle>
            <TopText>매거진</TopText>
            <TitleText>{props.title}</TitleText>
          </MagazineTitle>
          {props.isAdmin ? (
            <Button ref={dropDownRef} onClick={() => setIsOpen(!isOpen)}>
              {isOpen && (
                <DropDown
                  onEditClick={() => {
                    navigate(`/magazineEditing/${props.magazineId}`);
                    setIsOpen(false);
                  }}
                  onDeleteClick={() => {
                    props.onDeleteButtonHandler(props.id);
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
      <TextArea dangerouslySetInnerHTML={{ __html: props.content }} />

      <LikeShareIconFlex>
        <Like isLiked={props.isLiked} magazineId={props.magazineId} likeCount={props.LikeMagazine} />
      </LikeShareIconFlex>
    </div>
  );
};

export default MagazineDetailItem;

const StyledDropDownIcon = styled(DropDownIcon)`
  margin-right: 1.25rem;
  position: absolute;
  top: 1.22rem;
`;

const TopBox = styled.div`
  height: 18.8125rem;
  position: relative;
  object-fit: cover;
  display: flex;
  justify-content: center;
`;

const TitleWrap = styled.div`
  width: 100%;
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
  margin: 1.25rem;

  img {
    max-width: 100%;
    height: auto;
  }
  .ql-editor .ql-size-huge {
    font-size: 30px !important;
  }
  .ql-editor .ql-size-large {
    font-size: 24px !important;
  }
  .ql-editor .ql-size-normal {
    font-size: 18px !important;
  }
`;

const MagazineTitle = styled.div`
  z-index: 20;
  display: flex;
  align-items: center;
  width: 8.125rem;
`;

const TitleText = styled.div`
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
