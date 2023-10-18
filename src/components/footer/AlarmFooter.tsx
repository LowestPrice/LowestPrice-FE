import styled from 'styled-components';

type Props = {};

function AlarmFooter({}: Props) {
  return (
    <div>
      <Wrap>
        <Content>
          <Alarm>
            <div>
              <svg width='28' height='28' viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path
                  d='M10.8889 23.4394C11.7145 24.0989 12.8048 24.5 14 24.5C15.1952 24.5 16.2855 24.0989 17.1111 23.4394M5.25891 20.0454C4.76703 20.0454 4.36921 19.6793 4.66675 19.25C5.35717 18.2538 6.14665 16.386 6.14665 14.6265L6.17513 12.0769C6.17513 7.34003 9.67845 3.5 14 3.5C18.3852 3.5 21.9401 7.39659 21.9401 12.2033L21.9117 14.6265C21.9117 16.3981 22.671 18.2534 23.3333 19.25C23.6194 19.6804 23.228 20.0454 22.7422 20.0454H5.25891Z'
                  stroke='white'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
          </Alarm>
          <CoupangButton>최저가로 사러 가기</CoupangButton>
        </Content>
      </Wrap>
    </div>
  );
}

export default AlarmFooter;

const Wrap = styled.div`
  width: 375px;
  height: 78px;
  border-top: 1px solid #d9d9d9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  width: 335px;
  height: 48px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Alarm = styled.button`
  width: 48px;
  height: 48px;
  background-color: #000000;
  border-radius: 8px;
  border: none;
  outline: none;
  div {
    margin-top: 4px;
  }
`;

const CoupangButton = styled.button`
  width: 271px;
  height: 48px;
  border-radius: 8px;
  background-color: #00adfc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 16px;
  font-weight: 400;
  border: none;
  outline: none;
`;
