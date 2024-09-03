import styled from "styled-components";
import checkImage from "../../assets/images/bg_option_check.png";
import { COLORS } from "../../constants/colors";
import { PASTEL_COLORS } from "../../constants/pastelColors";

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
  let pastelColor = null;

  switch (color) {
    case COLORS[1]:
      // purple = --purple-200 (#ecd9ff)
      pastelColor = PASTEL_COLORS[1];
      break;
    case COLORS[2]:
      // blue = --blue-200 (#b1e4ff)
      pastelColor = PASTEL_COLORS[2];
      break;
    case COLORS[3]:
      // green = --green-200 (#d0f5c3)
      pastelColor = PASTEL_COLORS[3];
      break;
    default:
      // 기본 색깔 beige = --beige-200 (#ffe2ad)
      pastelColor = PASTEL_COLORS[0];
      break;
  }

  return (
    <Wrapper size={size}>
      <Container color={pastelColor} size={size} $imgUrl={imgUrl} />
      {isSelected && <CheckIcon src={checkImage} alt="Check" />}
    </Wrapper>
  );
};

export default BackgroundOption;
