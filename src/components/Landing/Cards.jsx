import styled from 'styled-components';

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
		height: 362px;
	}
`;

const Card1 = styled(CardBase)`
	margin-bottom: 30px;

	@media (min-width: 769px) and (max-width: 1023px) {
		height: 440px;
		flex-direction: column;
		justify-content: center;
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
		justify-content: center;
	}

	@media (max-width: 768px) {
		padding: 24px 24px 51px 24px;
		flex-direction: column;
		justify-content: flex-start;
		height: 100%
		margin-bottom: 37px;
		overflow: hidden;
	}
`;

const CardImg1 = styled.div`
	background-size: auto;
	background-position: center;
	background-repeat: no-repeat;
	width: 664px;
	height: 186px;
	margin: -12px;

	@media (max-width: 768px) {
		width: 369px;
		height: 104px;
		margin: -7.14px -7.245px;
	}
`;

const CardImg2 = styled(CardImg1)`
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	width: 720px;
	height: 220px;

	@media (max-width: 768px) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 90px;
	}
`;

export { Card1, Card2, CardImg1, CardImg2 };