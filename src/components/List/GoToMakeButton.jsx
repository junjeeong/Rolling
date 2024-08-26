import PrimaryButton from "../common/Button/PrimaryButton";
import styled from 'styled-components';

const GoToMakeButton = styled(PrimaryButton)`
	padding: 14px 60px;
	line-height: 2.8rem;
	font-size: 1.8rem;
	white-space: nowrap;

	span {
		display: flex;
		justify-content: center;
		width: 160px;
	}

	@media (max-width: 1248px) {
		min-width: calc(100% - 48px);
		display: flex;
		justify-content: center;
	}

	@media (max-width: 768px) {
		min-width: calc(100% - 40px);
		display: flex;
		justify-content: center;
	}
`;

export default GoToMakeButton;