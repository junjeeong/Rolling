import styled from 'styled-components';
import PrimaryButton from '../common/Button/PrimaryButton';

const StartButton = styled(PrimaryButton)`
	margin-bottom: 174px;
	line-height: 2.8rem;
	font-size: 1.8rem;
	white-space: nowrap;

	span {
		display: flex;
		justify-content: center;
		width: 160px;
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

export default StartButton;