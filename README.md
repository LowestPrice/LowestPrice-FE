
<p align="center"> <img src="https://github.com/LowestPrice/LowestPrice-FE/assets/136035516/785a3ae4-1911-4bb1-b87d-4fdd6bbc1805"/></p>

## 1. 프로젝트 소개 
'내일은 최저가' 프로젝트는 스파르타 코딩 클럽에서 진행하는 부트캠프, '항해 99' 의 교육과정에서 진행했던 프로젝트입니다.
팀 구성은 FE 2명, BE 4명, DE 1명으로 구성되었습니다.

'내일은 최저가' 는 Dynaamic Pricing 을 추적해 유저에게 최적의 구매 타이밍을 카카오 메신저로 알려주는 검색 사이트입니다. 또한 현재 사이트에서는 가격 그래프를 통해 apple 제품의 최근 가격동향을 파악할 수 있습니다. 매거진을 통해 애플의 최신 뉴스들을 확인할 수 있습니다. 쿠팡 비즈니스를 통해 실제 구매한 가격의 3% 의 수익을 내고 있습니다. 

진행한 프로젝트는 실제 배포를 통해 일주일 간 유저 테스트를 거치고, 현재 운영 중이며 구글 애널리틱스를 통해 유저의 유입을 메인보드로 만들어 파악 중입니다.

프로젝트 웹사이트: https://lowest-price.store/

## 2. 기술 스택
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![Ts](https://img.shields.io/badge/Typescript-3178C6?style=for-the-badge&logo=Typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![RQ](https://img.shields.io/badge/React_Query-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![RL](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![St](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
![St](https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 3. 기술적 의사결정
### Typescript
- 코드 안정성과 오류 감소: 정적 타입 검사를 통해 코드의 안정성을 높이고, 오류를 사전에 방지합니다. 변수, 함수 및 객체의 타입을 명시적으로 정의하므로 코드를 작성하면서 발생할 수 있는 많은 일반적인 오류를 타입 주석을 통해 사전에 파악할 수 있습니다.
- 코드 가독성과 유지 보수성 향상: 타입 주석과 타입 추론을 통해 코드의 가독성을 향상시키며, 협력하는 동료 개발자에게 코드베이스를 이해하는 데 도움을 줍니다. 물론, 타입스크립트를 사용하면서 용량이 늘어나 느려질 수 있지만, 타입스크립트의 컴파일러가 명시된 타입을 통해 이를 검사하므로 코드 실행 전에 오류를 발견하고, 팀 내 협업과 유지보수를 더 효율적으로 만들어 준다는 점에서 감안할 수 있다고 생각합니다.
### React Query
- 데이터 관리의 단순화: React Query 는 API 요청, 데이터 캐싱 및 데이터 관리를 단순화합니다. 기존의 상태 관리 라이브러리보다 훨씬 간편한 방식으로 데이터를 가져오고 관리할 수 있습니다. 이를 통해 데이터 로딩, 캐싱, 오류 처리 및 리패칭과 같은 복잡한 로직을 쉽게 다룰 수 있습니다.
- 인터랙티브한 UI 강화: React Query 는 데이터 가져오기 및 캐싱을 효율적으로 수행하므로 불필요한 네트워크 요청을 줄이고, 렌더링 성능을 최적화하는 데 도움을 줍니다. 이는 카테고리와 필터 기능에서 한 번 불러온 데이터의 내용을 캐싱처리되어 다시 한 번 같은 데이터를 조회할 때, 리패칭되지 않으면서 불필요한 렌더링을 줄입니다.
- 서버 상태와 클라이언트 캐시의 일치: React Query 는 서버 상태와 클라이언트 캐시를 쉽게 일치시킬 수 있는 강력한 도구를 제공합니다. 서버의 상태 변화를 클라이언트에 반영하고, 업데이트된 데이터를 자동으로 캐시에 반영함으로써 데이터 일관성을 유지합니다.
### Vite
- ESbuild를 기반으로 한 프론트엔드 빌드툴입니다. ES 모듈을 사용하여 자바스크립트의 코드를 모두 번들하지 않고 브라우저가 필요로 하는 애플리케이션 코드의 일부분만 변환하여 작동시켜 CRA에 비해 속도가 빨라 선택했습니다. 
### Styled-Components
- 컴포넌트 기반 스타일링: 스타일을 컴포넌트와 결합시키는 방식으로 동작해 각 컴포넌트의 스타일을 독립적으로 정의하고 유지해 스타일의 간의 간섭이나 네이밍 충돌을 피하고, 코드의 모듈성을 향상시킵니다.
- 동적 스타일링 및 props 연동: 자바스크립트를 사용해 스타일을 정의해 동적 스타일링이 용이합니다. 컴포넌트에 전달되는 프롭스에 따라 스타일을 조건부로 변경할 수 있으며, 알람설정과 카테고리 및 필터의 상태나 데이터에 따로 동적으로 스타일을 조절할 수 있습니다.
### Axios
- Axios는 fetch에 비해 직관적으로 사용할 수 있고, 에러 핸들링 및 중간 요청 수정과 같은 작업을 수행하기 위해 코드를 추가적으로 작성하지 않아도 됩니다. axios 는 대부분의 프로젝트에서 편리하게 사용할 수 있는 라이브러리로 널리 사용되고, 간단한 REST API 호출과 에러 핸들링을 위한 용이성을 갖고 있다는 점에 선택하게 되었습니다.
### Chart.js
- 캔버스 기반의 라이브러리이기 때문에 SVG를 기반으로 한 D3.js에 비해 대량의 데이터나 복잡한 인터렉션을 할 시에 DOM 조작이 성능 저하를 일으키지 않는다는 장점이 있습니다.
- SVG 기반의 라이브러리를 사용할 시에는 디자인을 세밀하게 할 수 있다는 장점이 있지만 프로젝트의 방향성을 봤을 때 캔버스 기반의 라이브러리인 Chart.js를 선택하는 것이 적합하여 선정하였습니다.
### React Quill
- 처음엔 Toast UI로 선택하였으나 Toast UI가 현재 프로젝트에서 적용한 React 18 버전까지 업데이트가 되지 않았고, 모바일 지원이 어려워 모바일 퍼스트로 진행하고 있는 프로젝트의 방향성과 맞지 않아 React Quill을 사용하였습니다.
- React Quill은 리액트 기반의 라이브러리이고 모바일 버전도 잘 지원하기 때문에 선택하였습니다. 또한 프로젝트 후반부에 도입하였던 상황이었기 때문에 시간이 많지 않았고, 다른 에디터들에 비해 초기 설정 및 사용법이 비교적 간단해 선택하게 되었습니다.
### js-cookie
- JWT 토큰을 쿠키에 안전하게 보관하기 위해 도입하였습니다.
### swiper
- 모바일 환경에서의 터치 이벤트(스와이프에)에 잘 반응하는 Slider를 표현하기 위해 선택하였습니다.

## 4. 유저 피드백 및 개선 상항

## 5. 주요 기능

## 6. 성능 최적화   

### 1) 데이터 부하 문제 

#### 발생한 문제
- 메인페이지와 검색결과페이지에서 1,000 개 이상의 데이터를 받아오게 되는데, 이로 인해 로딩 속도가 지나치게 느려지면 사용자 경험이 저하될 우려가 있었습니다. 


#### 개선 방법
- ***Intersection Observer*** 와 react-query 의 ***useInfinitequery*** 를 사용해 Lazy Loading을 구현하여 한 번에 다량의 데이터를 모두 불러오는 대신, 스크롤을 내릴 때마다 데이터를 fetch 하는 방법(무한스크롤)으로 26000ms의 로딩 속도를 1100ms로 개선했습니다.

![스크린샷 2023-11-15 115512](https://github.com/LowestPrice/LowestPrice-FE/assets/143480840/9a3d22f9-592a-4d27-b7ac-58537c580584)


### 2) 더 빠른 초기 로딩 시간

#### 발생한 문제
- 프로젝트를 진행하면서 애플리케이션의 규모가 점점 커지면서 번들이 커져 초기 로딩 시간이 처음 시작했을 때보다 메인페이지의 초기 로딩 시간이2~3배 정도 늘어났습니다.

#### 개선 방법
- Code Spliting 을 이용해 번들링 사이즈를 17% 줄여 초기 로딩 속도를 개선했습니다.
```
// Router.tsx

import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Main from './pages/main/Main';
import Error from './components/Error';
import Splash from './pages/main/Splash';
import ReissuanceAT from './pages/login/ReissuanceAT';

// 로그인
const Login = React.lazy(() => import('./pages/login/Login'));
const KakaoLogin = React.lazy(() => import('./pages/login/KakaoLogin'));

// 상품 검색, 상세, 알림
const SearchPage = React.lazy(() => import('./pages/search/SearchPage'));
const Detail = React.lazy(() => import('./pages/detail/Detail'));
const Notification = React.lazy(() => import('./pages/notification/Notification'));

// 마이페이지
const MyPage = React.lazy(() => import('./pages/mypage/main/MyPage'));
const EditMypage = React.lazy(() => import('./pages/mypage/edit/EditMypage'));

// 매거진
const MagazineMain = React.lazy(() => import('./pages/magazine/magazineMain/MagazineMainPage'));
const MagazineWriting = React.lazy(() => import('./pages/magazine/magazineWriting/magazineWriting/MagazineWriting'));
const MagazineEditing = React.lazy(() => import('./pages/magazine/magazineWriting/magazineEditing/MagazineEditingPage'));
const MagazineDetail = React.lazy(() => import('./pages/magazine/magazineDetail/MagazineDetailPage'));
const LikeMagazine = React.lazy(() => import('./pages/likeMagazine/LikeMagazine'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <Main />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'kakaologin',
        element: <KakaoLogin />,
      },
      {
        path: 'reissuanceat',
        element: <ReissuanceAT />,
      },
      {
        path: 'notification',
        element: <Notification />,
        errorElement: <Main />,
      },
      {
        path: 'search/:searchWord',
        element: <SearchPage />,
        errorElement: <Main />,
      },
      {
        path: 'mypage',
        element: <MyPage />,
        errorElement: <Main />,
      },
      {
        path: 'editmypage',
        element: <EditMypage />,
        errorElement: <Main />,
      },
      {
        path: 'detail/:id',
        element: <Detail />,
        errorElement: <Error />,
      },
      {
        path: 'magazine',
        element: <MagazineMain />,
      },
      {
        path: '/magazine/:id',
        element: <MagazineDetail />,
      },
      {
        path: 'magazineWriting',
        element: <MagazineWriting />,
      },
      {
        path: 'magazineEditing/:id',
        element: <MagazineEditing />,
      },
      {
        path: '/search/:searchWord',
        element: <SearchPage />,
      },
      {
        path: 'likemagazine',
        element: <LikeMagazine />,
      },
      {
        path: 'splash',
        element: <Splash />,
      },
    ],
  },
]);

export default router;
```


### 3) 불필요한 리렌더링

#### 발생한 문제
- React Developer Tools 로 페이지에서 불필요한 컴포넌트 트리의 업데이트가 발생하면서 불필요한 리렌더링이 발생해 화면 갱신에 시간과 자원을 소모하고 있었습니다. 

#### 개선 방법
- React.memo, useCallback, useMemo 등 리액트 훅을 이용해 컴포넌트의 리렌더링을 최소화하고 성능을 향상시켰습니다.
  
![스크린샷 2023-11-17 171820](https://github.com/LowestPrice/LowestPrice-FE/assets/143480840/71efcb20-7ba4-4d96-a37c-7ad282896838)


### 7. 커밋 컨벤션 
예시) Feat: 로그인 함수 추가

*이름: 띄어쓰기 설명 순으로 작성 

|이름|설명|
|------|---|
|Feat|새로운 기능을 추가할 경우|
|Fix|버그를 고친 경우|
|Design|CSS 등 사용자 UI 디자인 변경|
|!BREAKING CHANGE|커다란 API 변경의 경우|
|!HOTFIX|급하게 치명적인 버그를 고쳐야하는 경우|
|Style|코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우|
|Refactor|프로덕션 코드 리팩토링|
|Comment|필요한 주석 추가 및 변경|
|Docs|문서를 수정한 경우|
|Test|테스트 추가, 테스트 리팩토링(프로덕션 코드 변경 X)|
|Chore|빌드 테스트 업데이트, 패키지 매니저를 설정하는 경우(프로덕션 코드 변경 X)|	
|Rename|파일 혹은 폴더명을 수정하거나 옮기는 작업만인 경우|	
|Remove|파일을 삭제하는 작업만 수행한 경우|	
|Setting|프로젝트 초기 세팅|	
|Readme|리드미 편집|	

	
	


