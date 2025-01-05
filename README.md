# frontend-1st-woori-real-account-book
## 💸 우리 찐 가계부 💸
재정 관리를 쉽게 도와주는 가계부 플랫폼이에요! 😄 수입과 지출을 한눈에 정리하고, 분석해서 소비 습관도 개선할 수 있도록 만들어졌답니다.

이번 달 총 수입과 지출을 확인하고, 과거 데이터를 통해 내 생활 패턴도 돌아볼 수 있어요. 지출은 카테고리별로 분석해서 소비 습관 점검하고, 더 효율적으로 개선할 방법도 찾을 수 있어요. 수입과 지출 내역 등록도 간단하고 직관적이니까 걱정 마세요! ✨

# 👨‍👩‍👦‍👦 팀 소개

| [권민지](https://github.com/mjgwon24) | [권지윤](https://github.com/june0216) | [김새봄](https://github.com/saebomnewspring) | [윤영찬](https://github.com/yyc0026) |
| --- | --- | --- | --- |
| <img src="memebr-asset/민지.jpeg" width="150" /> | <img src="memebr-asset/지윤.png" width="150" /> | <img src="memebr-asset/새봄.jpeg" width="150" /> | <img src="memebr-asset/영찬.png" width="150" /> |
| HTML, CSS, Figma | HTML, CSS, Github 세팅 | HTML, CSS | HTML, CSS |

# 🌐 배포
🔗 [ 우리REAL가계부 URL ](https://woorifisa-service-dev-4th.github.io/frontend-1st-woori-real-account-book/public/start.html)


# 🧑‍💻 Code Convention 
📌 Class Name Rule
- 페이지 기능이 드러나도록 클래스 이름 작성
- 케밥 컨벤션

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
