# 쇼핑몰 웹 어플리케이션

### 프로젝트 설명
웹 프로그래밍 언어와 데이터베이스를 이용하여 쇼핑몰 웹 사이트를 구현하고 설계하고 구현한다.

<br>

### 프로젝트 실행 방법
1. MySQL 설치

2. Node.js 설치

3. MySQL 인스턴스 생성
    - mysql 실행 후 프로젝트 폴더 내의 'db-data.sql' 파일의 명령어들 입력
    
4. 프로그램에 필요한 NPM 모듈 설치
    - CMD창에서 프로젝트 폴더 디렉토리로 이동 후 'npm install' 명령어 입력
    
5. 프로젝트와 데이터베이스 연동
    - lib폴더 내의 'db.template.js' 파일에서 user, password, database 항목 빈칸에 mysql 정보들을 입력 후 저장
    - 'db.template.js' 파일의 이름을 'db.js'로 변경
    
6. 프로젝트 실행
    - CMD창에서 프로젝트 폴더 디렉토리 이동 후 'npm run start' 명령어 입력
    - 웹 브라우저에서 <http://localhost:3000/>으로 이동

<br>

### 활용 언어 및 기술
- HTML
- CSS
- JavaScript
- Bootstrap
- Node.js
- Express.js
- NPM
- MySQL
<br>

### 구현 내용

- 메인 페이지

![메인화면](https://user-images.githubusercontent.com/55964775/99182313-a0f60000-2777-11eb-838e-921bdd659ae5.JPG)



- 상품 목록

![상품목록](https://user-images.githubusercontent.com/55964775/99182316-a6ebe100-2777-11eb-8198-5a07eae49e19.png)

페이지당 상품의 개수가 최대 20개씩 페이징



- 반응형 웹사이트

![미디어쿼리](https://user-images.githubusercontent.com/55964775/99182381-06e28780-2778-11eb-8e7e-a1c905578e7b.gif)

미디어쿼리를 이용하여 브라우저 크기에 따라 웹사이트의 레이아웃 변화. 브라우저의 가로길이가 줄어들면 좌측 네비게이션바가 숨겨지고 상단 네비게이션바에 'Menu'  버튼이 생성됨. 'Menu' 버튼을 누르면 좌측 네비게이션바를 숨기고 드러낼 수 있음.



- 회원가입 페이지

![회원가입](https://user-images.githubusercontent.com/55964775/99182355-e9152280-2777-11eb-8530-630ae8c0b930.JPG)



- 회원가입 페이지 - 이메일 중복 체크

![중복체크1](https://user-images.githubusercontent.com/55964775/99182360-ec101300-2777-11eb-813c-14ca1d7e3c8d.JPG)



- 로그인 페이지

![로그인](https://user-images.githubusercontent.com/55964775/99182323-b5d29380-2777-11eb-81e1-fb032e005494.JPG)



- 이메일 찾기

![이메일찾기1](https://user-images.githubusercontent.com/55964775/99182332-c256ec00-2777-11eb-99d6-2680109f5901.JPG)

![이메일찾기2](https://user-images.githubusercontent.com/55964775/99182331-c1be5580-2777-11eb-9ebd-f25352f1af4e.JPG)



- 비밀번호 찾기

![비밀번호찾기1](https://user-images.githubusercontent.com/55964775/99182336-c5ea7300-2777-11eb-8b91-88f0aa6a3ba8.JPG)

![비밀번호찾기2](https://user-images.githubusercontent.com/55964775/99182335-c5ea7300-2777-11eb-939f-21884387243e.JPG)



- 로그인 후

![로그인 후](https://user-images.githubusercontent.com/55964775/99182343-cc78ea80-2777-11eb-9070-197b71f14a82.JPG)



- 제품 상세 보기

![제품 상세2](https://user-images.githubusercontent.com/55964775/99182345-d26ecb80-2777-11eb-9288-879685c6b857.JPG)



- 장바구니 페이지

![장바구니](https://user-images.githubusercontent.com/55964775/99182351-def32400-2777-11eb-8c65-f3c1ce59c08e.JPG)



- 회원정보 수정 페이지(상단 네비게이션바의 '회원정보' 클릭)

![회원정보수정](https://user-images.githubusercontent.com/55964775/99182352-e61a3200-2777-11eb-9169-bde2b76483e9.JPG)



- 관리자 로그인후

![관리자 로그인](https://user-images.githubusercontent.com/55964775/99182363-f205f400-2777-11eb-80cf-050341ae3313.JPG)

상단 네비게이션 바에 '장바구니' 링크 대신 '관리자 페이지' 링크 생성



- 관리자 페이지

![관리자페이지](https://user-images.githubusercontent.com/55964775/99182366-f4684e00-2777-11eb-977a-fcc2732885e3.JPG)



- 상품 등록 페이지

![상품등록](https://user-images.githubusercontent.com/55964775/99182371-f92d0200-2777-11eb-9e69-5833463c9535.JPG)



- 상품 정보 수정 페이지

![제품정보수정](https://user-images.githubusercontent.com/55964775/99182373-fcc08900-2777-11eb-9d10-0c0d41618770.JPG)



- 관리자 계정에서의 상품 상세 보기 페이지

![제품정보수정](https://user-images.githubusercontent.com/55964775/99182373-fcc08900-2777-11eb-9d10-0c0d41618770.JPG)

