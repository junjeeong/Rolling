import React from 'react';
import LandingSection from './LandingSection';
import { Card1, Card2, CardImg1, CardImg2 } from './Cards';
import IntroSection from './IntroSection';
import PointBox from './PointBox';
import Title from './Title';
import SubTitle from './SubTitle';
import StartButton from './StartButton';
import cardImg1 from '../../assets/images/cardImg1.png';
import cardImg2 from '../../assets/images/cardImg2.png';

export default function DesktopLandingDetail() {
	return (
		<LandingSection>
			<Card1>
				<IntroSection>
					<PointBox>Point. 01</PointBox>
					<Title>
						누구나 손쉽게, 온라인
						<br />
						롤링 페이퍼를 만들 수 있어요
					</Title>
					<SubTitle>로그인 없이 자유롭게 만들어요.</SubTitle>
				</IntroSection>
				<CardImg1 style={{ backgroundImage: `url(${cardImg1})` }} />
			</Card1>

			<Card2>
				<CardImg2 style={{ backgroundImage: `url(${cardImg2})` }} />
				<IntroSection>
					<PointBox>Point. 02</PointBox>
					<Title>
						서로에게 이모지로 감정을
						<br />
						표현해보세요
					</Title>
					<SubTitle>롤링 페이퍼에 이모지를 추가할 수 있어요</SubTitle>
				</IntroSection>
			</Card2>

			<StartButton to='/list'>구경해보기</StartButton>
		</LandingSection>
	);	
}