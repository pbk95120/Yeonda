<div align="center">
 <img src="https://github.com/pbk95120/Yeonda/assets/150868973/e2afe73e-5d0f-4566-92da-564106224bca"/>
  <h1>Yeonda</h1>
  당신의 마음을 연다.
  <br/>
  연애 다이어리. 연다.
  <br/><br/>
</div>

## 📎 [연다 바로가기](http://yeonda.prgms-fullcycle.com/)

## 💡 프로젝트 소개

일기를 기반으로 한 소개팅 서비스<br/>
매칭 선호를 기반으로 하여 일기를 보여주고, 좋아요를 통해 매칭을 해주는 일기 소개팅 서비스입니다.

## 🎬 프로젝트 진행상황

### ✔︎ 진행기간 : 2024.4.19 ~ 5.23

## 🛠 사용한 기술 스택

### BackEnd

- Express
- Socket.io
- OpenAI
- JWT
- NodeMailer
- Joi
- aws-sdk/client-s3
- multer

### FrontEnd

- React
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Tanstack Query
- Socket.io
- React Hook Form
- Zustand
- Jest

## 🛠 주요 기능

### ✔︎ 튜토리얼

- 처음 접속하면 전체 서비스들에 대한 소개가 있는 튜토리얼 페이지로 이동합니다.
- 튜토리얼 페이지를 모두 확인하면 로그인 페이지로 이동합니다.
<details markdown="1">
<summary>튜토리얼</summary>
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/fc8a4c3d-0675-4aea-a187-366dc03a2572/image.gif">
</details>

### ✔︎ 로그인/회원가입/비밀번호 찾기

- Email 인증을 통해 회원가입/비밀번호 찾기를 수행할 수 있고, 계정정보 뿐만 아니라, 성별, 연령대, 거리 등 매칭 상대의 취향을 선택할 수 있습니다.
- 로그인시 Access-Token과 Refreash-Token으로 인증정보를 쿠키에 저장합니다.
<details markdown="1">
<summary>로그인</summary>
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/8af72c97-a5d4-4bbd-b2cb-0fc5d099d600/image.png">
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/b3a84a26-b0cf-4410-9a30-f4d834eedd8e/image.png">
</details>

<details markdown="1">
<summary>회원가입</summary>
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/8a4808e5-276f-4cdb-83cb-f861f8f588ef/image.png">
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/5981dd80-87f7-49b2-a24f-d4e46f490aa7/image.png">
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/9f0b3438-a0e1-4e7f-9766-11adeabc60b0/image.png">
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/44cd215e-8670-409e-834d-3e14baf2108d/image.png">
</details>
  
<details markdown="1">
<summary>비밀번호 찾기</summary>
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/423d995e-c595-40de-b5d9-497872094bc2/image.png">
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/de7c2377-1b8f-4ef7-a44e-07a29bcd1f30/image.png">
</details>

### ✔︎ 추천 일기 페이지

- 사용자가 선호하는 성별, 거리, 나이대를 가진 작성자가 작성한 일기를 랜덤으로 보여줍니다.
- 좋아요 버튼을 클릭 했을 때 화면은 반응하며 정보가 갱신됩니다
- X 버튼을 클릭하면 다른 일기를 보여줍니다
- 서로 좋아요 상태가 될 때도 알려줍니다
- 내부적으로 선택, 연산 작업 최적화가 되어 있습니다
<details markdown="1">
<summary>Suggestion</summary>
  <img width="300" src="https://github.com/pbk95120/Yeonda/assets/84204779/d6611e5f-c0fe-4fb1-823f-8410785365a3">
  <img width="300" src="https://github.com/pbk95120/Yeonda/assets/84204779/dc8c8148-71a6-4170-8010-54b33f4995fb">
</details>

### ✔︎ 인기 일기 페이지

- 기본적으로 최근 좋아요를 많이 받은 5개의 일기 목록을 보여줍니다
- 상단에는 사용자가 관심사로 설정한 태그들이 있습니다
- 이 태그들을 클릭하면 그 태그가 포함된 인기 일기 5개가 따로 보여집니다.
<details markdown="1">
<summary>Popular</summary>
  <img width="300" src="https://github.com/pbk95120/Yeonda/assets/84204779/2c9ca908-abf7-4a35-b785-966ffd645038">  
</details>

### ✔︎ 일기 작성 페이지

- 사용자는 제목과 내용 작성에만 집중할 수 있고
- 태깅은 Open AI 엠베딩과 데이터 베이스 내 태그 목록과 연계해 자동으로 이루어집니다
<details markdown="1">
<summary>Write</summary>
  <img width="300" src="https://github.com/pbk95120/Yeonda/assets/84204779/f4be896c-de62-4afc-9fb6-2e118e80ced9">  
</details>

### ✔︎ 내 일기 페이지

- tanstack/react-query에 useInfiniteQuery,
- 기본 Web intersection observer API를 사용해서 무한 스크롤을 구현했습니다.
- 최신 날짜순, 좋아요 많은 순 정렬 기능이 있습니다
- 추후 달력 버튼을 추가해서 날짜별로 조회하는 기능도 구현 예정입니다
<details markdown="1">
<summary>MyDiary</summary>
  <img width="300" src="https://github.com/pbk95120/Yeonda/assets/84204779/1c8712b6-4a3d-4d26-ae20-d1607753c820">
  <img width="300" src="https://github.com/pbk95120/Yeonda/assets/84204779/4f672904-c89a-498e-9694-21ae99e92b68">
</details>

### ✔︎ 일기 상세보기 페이지

- 조회, 수정, 삭제 등 기본적인 동작이 가능합니다
- 첫 작성시 자동 태깅되었던 태그들을
- 자신이 원하는 태그로도 수정할 수 있습니다
<details markdown="1">
<summary>DiaryDetail</summary>
  <img width="300" src="https://github.com/pbk95120/Yeonda/assets/84204779/7f3b959d-57a3-4137-9d03-aab494cd1e29">
  <img width="300" src="https://github.com/pbk95120/Yeonda/assets/84204779/f7cda4ca-73ee-4760-b520-8228103f6ac6">
</details>

### ✔︎ 채팅 페이지

- 채팅 페이지에서는 서로 연결된 사용자간 채팅이 가능합니다.
<details markdown="1">
<summary>Chat</summary>
   <img width="200" src="https://velog.velcdn.com/images/kyuuu_ul/post/27a4c776-b2bb-436b-aebf-9a1f28cb4888/image.png">
  <img width="400" src="https://velog.velcdn.com/images/kyuuu_ul/post/17b77041-24a3-4e45-a019-a05938f1ab37/image.gif">
  <img width="200" src="https://velog.velcdn.com/images/kyuuu_ul/post/417d568e-156c-4768-b57e-879154ed1e10/image.gif">
</details>

### ✔︎ Admin 페이지

- Admin 페이지에서는 이용자 분석, 통계를 확인하거나 태그 설정을 할 수 있습니다.
<details markdown="1">
<summary>Admin</summary>
  <img width="1200" src="https://velog.velcdn.com/images/geun99/post/dbaa27e2-c638-4d2a-8069-fa64d1c0993d/image.gif">
</details>

### ✔︎ Error 페이지

- 잘못된 주소로 접속을 요청하거나, 에러가 발생한 경우 에러 페이지로 이동시켜줍니다.
<details markdown="1">
<summary>Error</summary>
  <img width="300" src="https://velog.velcdn.com/images/geun99/post/6c5effda-5d94-45a0-aeea-5800ab67af6b/image.png">
</details>

## 📁 Directory Structure

### BE

```
📦src
  ┣ 📂controllers	: 비즈니스 로직 컨트롤러
  ┣ 📂databases	: DAO
  ┣ 📂logs	: 로그 파일
  ┣ 📂middlewares	: 미들 웨어
  ┣ 📂models	: DB 테이블 타입 설정
  ┣ 📂routes	: 라우트
  ┣ 📂schemas : 스키마
  ┣ 📂sockets	: 소켓
  ┣ 📂storage	: 저장소
  ┣ 📂tests	: Jest 통합 테스트
  ┣ 📂utils	: 유틸
  ┣ 📜app.ts	: Express/Socket.io 및 라우팅
  ┣ 📜db.ts	: DB 연결 싱글턴 객체
  ┣ 📜error.ts	: 에러 설정
  ┣ 📜index.ts : 루트 파일 (서버 설정)
  ┗ 📜logger.ts : Logger 설정
┣ 📜jest.config.mjs	: Jest 설정
┣ 📜nodemon.json	: Dev 설정
┣📜eslint.config.mjs	: ESLint 설정
┣📜.eslintrc.js : ESLint 설정
┗📜.prettierrc : Prettier 설정

```

### FE

```
📦src
  ┣ 📂api		: rest api 호출
  ┣ 📂assets		: 이미지, 폰트 파일
  ┣ 📂components	: 컴포넌트
  ┣ 📂constants	: 상수
  ┣ 📂hooks		: 커스텀 훅
  ┣ 📂layout 		: 레이아웃
  ┣ 📂mocks		: mock data
  ┣ 📂pages		: Route 관리
  ┣ 📂store		: 전역 상태 관리
  ┣ 📂test		: Jest 테스트
  ┣ 📂types		: Type관리
  ┣ 📂utils		: 날짜,숫자 등 유틸 함수
┣ 📜jest.config.js	: Jest 설정
┣ 📜tailwind.config.js	: Tailwind 설정
┣ 📜tsconfig.json	: TypeScript설정
┣ 📜vite.config.ts	: Vite설정
┣ 📜.eslintrc.cjs 	: ESLint 설정
┗ 📜.prettierrc :	: Prettier 설정
```

## 팀원

### BE

<table >
  <tbody>
      <td align="center">
        <a href="https://github.com/BIG-blueshark">
            <img src="https://avatars.githubusercontent.com/u/106291049?v=4" width="100px;" height="100px;" alt="박재현"/>
<h3><b>박재현</b></h3></a></td>
        <td align="center">
        <a href="https://github.com/leon-808">
            <img src="https://avatars.githubusercontent.com/u/133825914?v=4" width="100px;" height="100px;" alt="이호성"/>
<h3><b>이호성</b></h3></a></td>
</table>

### FE

<table >
  <tbody>
      <td align="center">
        <a href="https://github.com/pbk95120">
            <img src="https://avatars.githubusercontent.com/u/91122435?v=4" width="100px;" height="100px;" alt="박병규"/>
<h3><b>박병규</b></h3></a></td>
        <td align="center">
        <a href="https://github.com/UupDownPark">
            <img src="https://avatars.githubusercontent.com/u/96029891?v=4" width="100px;" height="100px;" alt="박상하"/>
<h3><b>박상하</b></h3></a></td>
     <td align="center">
        <a href="https://github.com/Dev-Lee-js">
            <img src="https://avatars.githubusercontent.com/u/84204779?v=4" width="100px;" height="100px;" alt="이종석"/>
<h3><b>이종석</b></h3></a></td>
     <td align="center">
        <a href="https://github.com/geun99">
            <img src="https://avatars.githubusercontent.com/u/150868973?v=4" width="100px;" height="100px;" alt="이창근"/>
<h3><b>이창근</b></h3></a></td>
  </tbody>
</table>
