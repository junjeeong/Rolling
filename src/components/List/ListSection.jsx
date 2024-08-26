import styled from 'styled-components';
import { Layout } from '../../styles/DefaultLayout';

const ListSection = styled(Layout)`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-top: 64px;
	padding-bottom: 100px;

	@media (max-width: 1248px) {
		overflow-x: hidden;
		height: calc(100svh);
	}

	@media (max-width: 768px) {
		overflow-x: hidden;
		padding-bottom: 0;
	}
`;

export default ListSection;