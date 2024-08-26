import styled from 'styled-components';

const Container = styled.div`
	margin-bottom: 6.4rem;
	display: flex;
	flex-direction: column;
	justify-content: center;

	@media (max-width: 1248px) {
		width: 100%;
		margin-bottom: 15.6rem;
	}

	@media (max-width: 768px) {
		margin-bottom: 6.6rem;
	}
`;

export default Container;