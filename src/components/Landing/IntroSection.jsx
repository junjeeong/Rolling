import styled from 'styled-components';

const IntroSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	position: relative;
	margin-left: 60px;

	@media (min-width: 1024px) {
		width: 340px;
	}

	@media (min-width: 769px) and (max-width: 1023px) {
		margin-top: 40px;
	}

	@media (max-width: 768px) {
		margin-bottom: 50px;
	}
`;

export default IntroSection;