import styled, { keyframes, css } from "styled-components";

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
  background-color: rgba(0, 0, 0, 0.8); /* 기본 배경색 */
  border-radius: 8px;
  animation: ${bounce} 0.5s ease forwards;
  z-index: 999;
  font-weight: var(--font-weight-regular);
  font-size: 16px;
  letter-spacing: -0.5px;
  box-sizing: border-box;
  margin: 0;
  // 태블릿
  @media (max-width: 1200px) {
    margin-bottom: 64px;
  }
  // 모바일
  @media (max-width: 768px) {
    max-width: 320px;
    padding: 16px;
    font-size: 14px;
  }
`;

// 체크 아이콘 스타일 정의 (기본적으로 성공 아이콘)
const CheckIcon = styled.svg`
  width: 24px;
  height: 24px;
  stroke: #2ba600; /* 기본 성공 색상 */
  stroke-width: 4;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: ${drawCheckAnimation} 0.5s ease forwards;

  ${({ type }) =>
    type === "error" &&
    css`
      stroke: #ff0000; /* 에러 색상 */
    `}
  ${({ type }) =>
    type === "warning" &&
    css`
      stroke: #ffa500; /* 경고 색상 */
    `}
`;

export const Toast = ({ message, type = "success" }) => {
  return (
    <Container type={type}>
      <CheckIcon type={type} viewBox="0 0 24 24">
        {/* 상황에 따라 다른 아이콘을 표시할 수 있도록 분기 가능 */}
        {type === "success" && <path d="M4 12l4 4L20 6" />}
        {/* 성공 체크 아이콘 */}
        {type === "error" && <path d="M6 6l12 12M6 18L18 6" />}
        {/* 에러 X 아이콘 */}
        {type === "warning" && (
          <path d="M12 2L2 22h20L12 2z M12 16v-4 M12 20h0" />
        )}
        {/* 경고 아이콘 */}
      </CheckIcon>
      {message}
    </Container>
  );
};
