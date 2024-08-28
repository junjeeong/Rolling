import styled, { keyframes } from 'styled-components';

const ellipsis1 = keyframes`
  0% {
  transform: scale(0);
  }
  100% {
  transform: scale(1);
  }
`;
const ellipsis2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
`;

const ellipsis3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;
const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
  height: 100%;
`;

const LoaderWrapper = styled.div`
  text-align: center;
`;

const Ellipsis = styled.div`
  display: inline-block;
  position: relative;
  width: 75px;
  height: 80px;
  > div {
    position: absolute;
    top: 33px;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    background: var(--purple400);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
    &:nth-child(1) {
      left: 8px;
      animation: ${ellipsis1} 0.6s infinite;
    }
    &:nth-child(2) {
      left: 8px;
      animation: ${ellipsis2} 0.6s infinite;
    }
    &:nth-child(3) {
      left: 32px;
      animation: ${ellipsis2} 0.6s infinite;
    }
    &:nth-child(4) {
      left: 56px;
      animation: ${ellipsis3} 0.6s infinite;
    }
  }
`;

export default function EllipsisLoading() {
  return (
    <LoaderContainer>
      <LoaderWrapper>
        <Ellipsis>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </Ellipsis>
      </LoaderWrapper>
    </LoaderContainer>
  );
}
