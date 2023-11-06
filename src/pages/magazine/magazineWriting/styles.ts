import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

export const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.375rem 0;
`;

export const Button = styled.button`
  border: none;
  font-size: 1.25rem;
  font-weight: 600;
  width: 5rem;
  height: 1.5rem;
  background-color: transparent;
  padding: 1.375rem 1.125rem;
`;

export const Title = styled.textarea`
  font-size: 1.625rem;
  line-height: 1.625rem;
  font-weight: 500;
  color: #b1b1b1;
  margin-top: 1.5625rem;
  margin-left: 1.25rem;
  padding-bottom: 0.8125rem;
  border: none;
  &:focus {
    outline: none;
  }
  overflow-y: auto;
  resize: none;
  min-height: 1.625rem;
  height: auto;
  overflow-y: hidden;
  max-height: 200px;
`;

export const Content = styled.textarea`
  font-size: 1.125rem;
  font-weight: 500;
  color: #b1b1b1;
  margin-top: 0.8125rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

export const DirectionCol = styled.div`
  display: flex;
  flex-direction: column;
  height: 80vh;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

export const PhotoAdd = styled.button`
  margin-top: 0.8125rem;
  background-color: transparent;
  border: none;
  margin-left: 1.75rem;
`;

export const PhotoDiv = styled.div`
  height: 3.125rem;
  border-top: 0.0625rem solid #b1b1b1;
  border-bottom: 0.0625rem solid #b1b1b1;
`;

export const StyledImage = styled.img`
  object-fit: contain;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;

export const styleString = `
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.75rem"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="0.75rem"]::before {
    content: '0.75rem'; 
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="0.875rem"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="0.875rem"]::before {
    content: '0.875rem'; 
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1rem"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1rem"]::before {
    content: '1rem'; 
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1.125rem"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1.125rem"]::before {
    content: '1.125rem'; 
  }
  .ql-snow .ql-picker.ql-size .ql-picker-label[data-value="1.25rem"]::before,
  .ql-snow .ql-picker.ql-size .ql-picker-item[data-value="1.25rem"]::before {
    content: '1.25rem';
  }
`;

export const Scroll = styled.div`
  width: 23.75rem;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  max-height: 85vh;
  @media screen and (max-width: 743px) and (min-width: 376px) {
    width: 100%;
  }
  @media screen and (min-width: 744px) {
    width: 744px;
  }
`;
