# frontend-1st-woori-real-account-book

## 💸 우리 찐 가계부 💸
재정 관리를 쉽게 도와주는 가계부 플랫폼이에요! 😄 
수입과 지출을 한눈에 정리하고, 분석해서 소비 습관도 개선할 수 있도록 만들어졌어요.

이번 달 총 수입과 지출을 확인하고, 과거 데이터를 통해 내 생활 패턴도 돌아볼 수 있어요. 
지출은 카테고리별로 분석해서 소비 습관 점검하고, 더 효율적으로 개선할 방법도 찾을 수 있어요. 

수입과 지출 내역 등록도 간단하고 직관적이니까 걱정 마세요! ✨

# 👨‍👩‍👦‍👦 팀 소개

| [권민지](https://github.com/mjgwon24) | [권지윤](https://github.com/june0216) | [김새봄](https://github.com/saebomnewspring) | [윤영찬](https://github.com/yyc0026) |
| --- | --- | --- | --- |
| <img src="asset/member/민지.jpeg" width="150" /> | <img src="asset/member/지윤.png" width="150" /> | <img src="asset/member/새봄.jpeg" width="150" /> | <img src="asset/member/영찬.png" width="150" /> |
| HTML, CSS, Figma | HTML, CSS, Github 세팅 | HTML, CSS | HTML, CSS |



# 🌐 배포
🔗 [ 우리REAL가계부 URL ](https://woorifisa-service-dev-4th.github.io/frontend-1st-woori-real-account-book/public/html/start.html)

<img src="https://private-user-images.githubusercontent.com/76603301/400211121-0f40ec0a-b296-4771-8dd5-09f218bcd4ec.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MzYwOTE4NDUsIm5iZiI6MTczNjA5MTU0NSwicGF0aCI6Ii83NjYwMzMwMS80MDAyMTExMjEtMGY0MGVjMGEtYjI5Ni00NzcxLThkZDUtMDlmMjE4YmNkNGVjLmdpZj9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNTAxMDUlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjUwMTA1VDE1MzkwNVomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWUwMjQxZmE2ODRlMDQ5ZmU2NDE3YjlhNWY2NTEwNjEwYWU2OTBhYTljZmNhM2FmNzY2ZmMzYTUwMDYwMmU0Y2UmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0In0.XrJhxsRMWjLxx1Te4AiNbZXl97HDH_DA_NzhW0u-_lg">

# 🖥️ 화면 별 기능
### 시작 화면
<img src="asset/시작페이지.png"  >

### [ 로그인 / 회원가입 ]
<img src="asset/로그인.png" >
<img src="asset/회원가입.png" >

### [ 홈 화면 ]
<img src="asset/메인.png">
사용자는 이번 달의 총 수입과 지출 합계를 확인할 수 있습니다.
또한 가장 최근 5개월과 이번 달을 비교하는 도표를 통해 자신의 생활 습관을 되돌아볼 수 있고, 바로 직전 달과 이번 달을 비교하여 어느정도의 금액 변동이 생겼는지를 알려줍니다.
마지막 요소로는 이번 달의 내역 상세를 제공합니다. 필터 기능을 통해 전체, 수입, 지출 별로 원하는 내역만 조정하여 볼 수 있습니다.

### [ 카테고리별 분석 ]
<img src="asset/지출카테고리.png" >
사용자의 지출 분야를 카테고리별, 소비량순으로 제공해줍니다.
이를 통해 사용자는 본인의 소비습관을 계획하고, 효율적으로 개선할 수 있습니다.
또한 매 주차별 카테고리에 따른 소비량을 제공하여 보다 자세한 소비계획을 만들 수 있도록 돕습니다.
마지막 요소로는 카테고리별 지출 상세 내역을 제공합니다.

### [ 수입 지출 등록 ]
<img src="asset/수입지출내역.png" >
가계부에 등록할 수입 또는 지출 내역의 세부사항을 등록합니다. 내역명, 변동 금액, 날짜, 거래수단을 카테고리별로 등록할 수 있습니다. 등록된 내역은 날짜별로, 카테고리별로 확인할 수 있습니다.

# 📈 LightHouse 성능 지표
<img src="asset/lighthouse.png" >

<br></br>

# 🧑‍💻 Code Convention 
📌 Class Name Rule
- 페이지 기능이 드러나도록 클래스 이름 작성
- 케밥 컨벤션

# 📏ESLint RuleSet

```java
export default [
  {languageOptions: { globals: globals.browser }},
	  pluginJs.configs.recommended,
];
```

- eslint:recommended : `pluginJs`의 권장 설정을 사용하여, JavaScript 코드를 작성할 때 일반적으로 사용되는 모범 사례를 자동으로 적용했습니다.
- 대표 예시
    
    ### **1. `no-unused-vars`**
    
    - **설명**:
        - 선언한 변수를 사용하지 않으면 경고를 발생시킵니다.
    - **적용 이유**:
        - 코드에서 사용되지 않는 변수를 제거하여 **불필요한 코드**를 줄이고, **가독성**과 **유지보수성**을 높이기 위해 사용합니다.
        - 사용되지 않는 변수가 남아 있으면, 의도하지 않은 실수로 간주될 수 있습니다.
    
    ### **2. `eqeqeq`**
    
    - **설명**:
        - `==` 또는 `!=` 대신 `===` 또는 `!==`를 사용하도록 강제합니다.
    - **적용 이유**:
        - 자바스크립트의 **암묵적 형 변환**을 방지하여 예기치 않은 동작을 피할 수 있습니다.
        - 예를 들어, `0 == '0'`은 true이지만 `0 === '0'`은 false입니다.
    
    ### **3. `curly`**
    
    - **설명**:
        - 모든 제어 구문(`if`, `else`, `for`, `while`)에 중괄호를 강제합니다.
    - **적용 이유**:
        - **가독성**을 높이고, 중괄호가 없을 때 발생할 수 있는 **논리적 오류**를 방지합니다.
        - 중첩된 조건문이나 반복문에서 코드의 구조를 명확히 하는 데 유용합니다.

# ✔️ Git Convention
## (1) Commit Convention
|    Type     | Description  |
|:-----------:|--------------|
|   `feat:`   | 새로운 기능 추가 |
|   `fix:`    | 버그 수정      |
|   `hotfix:` | 긴급 수정      |
| `refactor:` | 코드 리팩토링   |
| `rename:`   | 파일 혹은 폴더명을 수정할 때 사용 |
| `remove:`   | 파일을 삭제할 때 사용 |
| `structure:`   | 프로젝트 구조 변경 |
| `docs:`   | 문서 작성 및 편집 |
| `deploy:`   |  프로젝트 배포 |


## (2) Branch Name Rule
{이슈 번호}-{feature/fix}-{개발 기능}

- ex) `17-feature-login`

## (3) 협업 전략 
- 각자 개인 레포지토리를 `fork`하여 작업 후, 모든 코드는 `dev` 브랜치에 통합하고, 최종 배포 시 `main` 브랜치에 반영합니다.
- **작업 프로세스**:
    - (1) **이슈 발생**: 생성된 이슈는 자동으로 `Projects`의 `Todo`로 연결됩니다.
    - (2) **브랜치 생성**: 이슈 번호를 기반으로 작업 브랜치를 생성합니다.
    - (3) **코드 작성**: 브랜치에서 작업 후 변경사항을 커밋합니다.
    - (4) **Pull Request**: `dev` 브랜치로 병합을 요청합니다.
    - (5) **리뷰 및 병합**: 최소 2명 이상의 리뷰 승인을 받아야 메인 레포지토리로 머지가 가능합니다.

# 🎨 UI 스타일 가이드
### 컬러
<img src="asset/컬러이미지.png" height=550 >
금전과 관련된 서비스를 위하여, 신뢰의 상징인 블루 계열을 사용하였습니다.

### 폰트
깔끔한 느낌을 내기 위해 Pretendard 사용하였습니다.

font-weight 400~800으로 나누어 명암 조절을 통해 텍스트 강조에 차별을 두었습니다. 

### 컨텐츠 영역
675px의 width로 컨텐츠 영역을 중앙에 고정, min-width를 주어 윈도우 창의 너비가 줄어들어도 UI 요소가 망가지지 않도록 처리하였습니다. 

### 라이트 모드 & 다크 모드
라이트 모드뿐만 아니라 다크 모드를 제공하여 사용자 선택의 기회를 확장하였습니다. 사용자가 라이트 모드와 다크 모드를 직접 설정할 수 있어 자신의 경험을 결정하고 보다 개인에게 맞춤화된 방식으로 서비스를 사용할 수 있습니다. 

### 공통 footer
동일한 footer를 사용하여 사용자는 모든 화면에서 익숙한 UI를 볼 수 있어 웹사이트 사용자 경험이 일관성 있게 유지됩니다.
