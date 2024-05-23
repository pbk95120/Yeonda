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
### ✔︎ 진행기간 : 2024.4.19 ~ 5/23

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
  

### ✔︎ Admin 페이지
- Admin 페이지에서는 이용자 분석, 통계를 확인하거나 태그 설정을 할 수 있습니다.
<details markdown="1">
<summary>Admin</summary>
  <img width="1200" src="https://velog.velcdn.com/images/geun99/post/dbaa27e2-c638-4d2a-8069-fa64d1c0993d/image.gif">
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
