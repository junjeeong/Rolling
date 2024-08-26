import styled from 'styled-components';

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

export default PointBox;