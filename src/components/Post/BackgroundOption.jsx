import styled from "styled-components";
import checkImage from "../../assets/images/bg_option_check.png";
import { getPastelColor } from "../../hooks/usePastelColor";

const Wrapper = styled.div`
  position: relative;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-size: cover;
  background-position: center;
  border-radius: 8px;
  opacity: 0.7;
`;

const CheckIcon = styled.img`
  width: 44px;
  height: 44px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const BackgroundOption = ({ color, size, isSelected, imgUrl }) => {
  // 배경 컬러를 원색에서 파스텔 컬러로 변경
  const pastelColor = getPastelColor(color);

  return (
    <Wrapper size={size}>
      <Container color={pastelColor} size={size} $imgUrl={imgUrl} />
      {isSelected && <CheckIcon src={checkImage} alt="Check" />}
    </Wrapper>
  );
};

export default BackgroundOption;
