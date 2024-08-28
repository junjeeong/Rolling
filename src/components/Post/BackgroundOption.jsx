import styled from "styled-components";
import checkImage from "../../assets/images/bg_option_check.png";

const BackgroundOption = ({ color, size, isSelected, imgUrl }) => {
  return (
    <Container color={color} size={size} $imgUrl={imgUrl}>
      {isSelected && <CheckIcon src={checkImage} alt="Check" />}
    </Container>
  );
};

const Container = styled.div`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background-color: ${({ color }) => color};
  background-image: url(${({ $imgUrl }) => $imgUrl});
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 8px;
`;

const CheckIcon = styled.img`
  width: 44px;
  height: 44px;
  position: absolute;
`;

export default BackgroundOption;
