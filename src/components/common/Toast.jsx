import styled, { keyframes } from "styled-components";

// 바운스 애니메이션 정의
const bounce = keyframes`
  0% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-20px);
  }
  100% {
    transform: translateX(-50%) translateY(0);
  }
`;

// 체크 애니메이션 정의
const drawCheckAnimation = keyframes`
  0% {
    stroke-dasharray: 100;
    stroke-dashoffset: 100; /* 체크가 보이지 않도록 설정 */
  }
  100% {
    stroke-dasharray: 100; /* 전체 길이를 100으로 유지 */
    stroke-dashoffset: 0;  /* 체크가 전체 길이만큼 그려지도록 설정 */
  }
`;

// 토스트 스타일 정의
const Container = styled.div`
  width: 524px;
  color: white;
  position: fixed;
  left: 50%;
  transform: translateX(-50%); /* 수평 중앙 정렬 */
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  bottom: 20px;
  padding: 19px 30px;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 8px;
  animation: ${bounce} 0.5s ease forwards; /* 바운스 애니메이션 추가 */
  z-index: 999;
  font-weight: var(--font-weight-regular);
  font-size: 16px;
  letter-spacing: -0.5px;
  box-sizing: border-box; /* 패딩과 보더를 포함하여 전체 너비와 높이 계산 */
  margin: 0; /* 기본 마진 제거 */
`;

// 체크 아이콘 스타일 정의
const CheckIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #2ba600; /* 체크 색상 */
  stroke-width: 4;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: ${drawCheckAnimation} 0.5s ease forwards;
`;

export const Toast = ({ message }) => {
  return (
    <Container>
      <CheckIcon viewBox="0 0 24 24">
        <path d="M4 12l4 4L20 6" />
      </CheckIcon>
      {message}
    </Container>
  );
};
