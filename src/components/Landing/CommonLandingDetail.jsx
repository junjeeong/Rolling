import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import cardImg1 from "../../assets/images/cardImg1.png";
import cardImg2 from "../../assets/images/cardImg2.png";
import PrimaryButton from "../common/Button/PrimaryButton";
import Header from "../Header/Header";
import mobileCardImg1 from "../../assets/images/mobileCardImg1.png";
import mobileCardImg2 from "../../assets/images/mobileCardImg2.png";

//랜딩 레이아웃
const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  //margin값이 css 우선순위 규칙때문에 적용이 안 되어,!important 사용
  margin-top: 124px !important;

  @media (max-width: 360px) {
    padding: 0;
    max-width: 360px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  @media (max-width: 1024px) {
    max-width: 95%;
    margin: 0 auto;
    gap: 57px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
  }

	@media (max-width: 768px) {
		gap: 0px;
		justify-content: normal;
		margin-top: 110px !important;
	}
`;

//LandingSection
const LandingSection = styled(Layout)`
  width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 124px;

  @media (max-width: 1248px) {
    padding: 0 24px;
  }

  @media (max-width: 768px) {
    padding: 0 20px;
    margin-top: 42px;
    min-height: calc(100lvh + 65px);
  }
`;

//Cards
const CardBase = styled.div`
  width: 100%;
  height: 324px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: var(--surface);

  @media (min-width: 769px) and (max-width: 1023px) {
    height: 440px;
    justify-content: center;
  }

  @media (max-width: 768px) {
		width: 90%;
    height: 362px;
  }
`;

const Card1 = styled(CardBase)`
  margin-bottom: 30px;

  @media (min-width: 769px) and (max-width: 1023px) {
    position: relative;
    height: 440px;
    flex-direction: column;
    justify-content: center;

    & > :first-child {
      position: absolute;
      top: 60px;
      left: 60px;
    }

    & > :nth-child(2) {
      position: absolute;
      top: 70%;
      left: 52%;
      transform: translate(-50%, -50%);
    }
  }

  @media (max-width: 768px) {
    padding: 24px 24px 51px 24px;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    margin-bottom: 24px;
    overflow: hidden;
  }
`;

const Card2 = styled(CardBase)`
  justify-content: flex-start;
  margin-bottom: 48px;

  @media (min-width: 769px) and (max-width: 1023px) {
    position: relative;
    flex-direction: column;
    justify-content: center;

    & > :first-child {
      position: absolute;
      top: 75%;
      left: 55%;
      transform: translate(-50%, -50%);
    }

    & > :nth-child(2) {
      position: absolute;
      top: 60px;
      left: 60px;
    }
  }

  @media (max-width: 768px) {
    padding: 24px 24px 51px 24px;
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    margin-bottom: 37px;
    overflow: hidden;

		& > :nth-child(2) {
      left: 20px;
    }
  }
`;

const CardImg1 = styled.div`
  background-size: auto;
  background-position: center;
  background-repeat: no-repeat;
  width: 664px;
  height: 186px;
  margin: -12px;
  margin-right: 40px;

  @media (max-width: 768px) {
    width: 369px;
    height: 104px;
    margin: -7.14px -7.245px;
  }

  @media (max-width: 1024px) {
    order: 2;
  }
`;

const CardImg2 = styled.div`
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 220px;
  width: 664px;
  margin: -12px;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 113px;
  }

  @media (max-width: 1024px) {
    order: 2;
  }
`;

//IntroSection
const IntroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  margin-left: 60px;

  @media (min-width: 769px) and (max-width: 1023px) {
    width: 340px;
    order: 1;
    margin-left: 0px;
    margin-bottom: 36px;
  }

  @media (max-width: 768px) {
    margin-bottom: 50px;
		margin-left: -50px;
		margin-top: 15px;
  }
`;

//PointBox
const PointBox = styled.div`
  padding: 6px 12px;
  margin-bottom: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--purple-600);
  border-radius: 50px;
  font-size: 14px;
  color: var(--white);
  font-weight: var(--font-bold);
  letter-spacing: -0.005em;

  @media (max-width: 768px) {
    padding: 4px 12px;
    top: -44px;
  }
`;

//Title
const Title = styled.h2`
  padding: 0px;
  margin-bottom: 8px;
  font-weight: var(--font-bold);
  font-size: 24px;
  line-height: 36px;
  letter-spacing: -0.01em;
  color: var(--gray-900);

  ${({ isTablet }) =>
    isTablet &&
    css`
      white-space: nowrap;
      br {
        display: none;
      }
    `}

  @media (max-width: 768px) {
    font-size: 18px;
    line-height: 28px;

		${({ isMobile }) =>
		isMobile &&
		css`
			white-space: normal;
			br {
				display: inline;
			}
		`}
  }
`;

//SubTitle
const SubTitle = styled.h3`
  font-weight: var(--font-regular);
  font-size: 18px;
  line-height: 28px;
  letter-spacing: -0.01em;
  color: var(--gray-500);

  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 22px;
  }
`;

//StartButton
const StartButton = styled(PrimaryButton)`
  width: 280px;
  margin-bottom: 174px;
  line-height: 2.8rem;
  font-size: 1.2rem;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    display: flex;
    justify-content: center;
    width: 230px;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    width: 100%;
    margin-bottom: 24px;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 24px 0px;
  }
`;

const CommonLandingDetail = ({ className }) => {
  const [isTablet, setIsTablet] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
			setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // 초기 실행을 위해 호출
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const existingPath = true;

  return (
    <>
      <Header existingPath={existingPath} />
      <LandingSection className={className}>
        <Card1>
          <IntroSection>
            <PointBox>Point. 01</PointBox>
            <Title isTablet={isTablet} isMobile={isMobile}>
              누구나 손쉽게, 온라인
              <br />
              롤링 페이퍼를 만들 수 있어요
            </Title>
            <SubTitle>로그인 없이 자유롭게 만들어요.</SubTitle>
          </IntroSection>
          <CardImg1 style={{ 
						backgroundImage: isMobile
							? `url(${mobileCardImg1})`
							: `url(${cardImg1})`, 
						}} />
        </Card1>

        <Card2>
          <CardImg2 style={{ 
						backgroundImage: isMobile
							? `url(${mobileCardImg2})`
							: `url(${cardImg2})`, 
						}} />
          <IntroSection>
            <PointBox>Point. 02</PointBox>
            <Title isTablet={isTablet} isMobile={isMobile}>
              서로에게 이모지로 감정을
              <br />
              표현해보세요
            </Title>
            <SubTitle>롤링 페이퍼에 이모지를 추가할 수 있어요</SubTitle>
          </IntroSection>
        </Card2>

        <StartButton to="/list">구경해보기</StartButton>
      </LandingSection>
    </>
  );
};

export default CommonLandingDetail;
