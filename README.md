# 프로젝트 문서

![alt text](public/logo.png)

## 프로젝트 개요

이 프로젝트는 **롤링 페이퍼** 웹 애플리케이션을 구현하는 팀 프로젝트입니다.<br />
React를 사용하여 동적인 웹 애플리케이션을 개발하며, Vite를 통해 빠르고 효율적인 개발 환경을 제공합니다.

## 설치 및 실행 방법

### 1. 프로젝트 클론

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. 🧑‍💻 코드 컨벤션

- **문자열을 처리할 때는 쌍따옴표를 사용하도록 합니다.**
- **문장이 종료될 때는 세미콜론을 붙여줍니다.**
- 🐫 **함수명, 변수명은 카멜케이스로 작성합니다.**
- ☝ **가독성을 위해 한 줄에 하나의 문장만 작성합니다.**
- **주석은 설명하려는 구문에 맞춰 들여쓰기 합니다.**
- **연산자 사이에는 공백을 추가하여 가독성을 높입니다.**

```jsx
a + b + c + d; // bad
a + b + c + d; // good
```

- ☝ **콤마 다음에 값이 올 경우 공백을 추가하여 가독성을 높입니다.**

```jsx
var arr = [1, 2, 3, 4]; //bad
var arr = [1, 2, 3, 4]; //good
```

- 🔠 생성자 함수명의 맨 앞글자는 대문자로 합니다.

```jsx
function Person() {}
```

---

### ☑️ 코드 컨벤션이 필요한 이유

- 팀원끼리 코드를 공유하기 때문에 일관성있는 코드를 작성하면 서로 이해하기 쉽다.
- 나중에 입사 지원 시 프로젝트를 하며 코드 컨벤션을 만들어 진행했다고 하면 협업 면에서 유리하게 작용할 수 있다.

### 3. 브랜치 전략

- **main** : 안정적인 프로덕션 상태의 코드가 위치합니다.
- **dev** : 개발 중인 최신 코드가 위치하며, 새로운 기능과 수정 사항이 통합됩니다.

### 4. 주요 라이브러리 및 기술 스택 소개

- **React** : 사용자 인터페이스를 구축하기 위한 라이브러리.
- **Vite** : 빠르고 효율적인 개발 환경을 제공하는 빌드 도구.
- **ESLint** : 코드 품질을 검사하고 일관된 스타일을 유지하기 위한 도구.
- **Prettier** : 코드 스타일을 자동으로 맞추기 위한 포맷터.
- **Styled Components** : **React** 컴포넌트 기반으로 CSS를 작성할 수 있게 해주는 라이브러리.
<div>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FECC00">
  <img src="https://img.shields.io/badge/eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white">
  <img src="https://img.shields.io/badge/prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=F50057">
  <img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white">
</div>
