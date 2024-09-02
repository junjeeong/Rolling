import styled from 'styled-components';
import PrimaryButton from '../components/common/Button/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import LogoIcon from '../assets/images/icons/LogoIcon.svg';
import QuestionMark from '../assets/images/icons/QuestionMark.svg';
import EllipsisLoading from '../components/Loading/EllipsisLoading';

const Container = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  max-width: 720px;
  margin: 60px auto;

  @media (max-width: 1248px) {
    margin: 150px auto;
    padding: 0 20px;
  }

  @media (max-width: 640px) {
    margin: 150px auto;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
	margin-bottom: 50px;
`;

const ErrorTitle = styled.h1`
  font-size: 90px;
	font-weight: var(--font-bold);
  color: var(--purple-800);
	margin-bottom: 80px;
	text-align: center;

  @media (max-width: 1248px) {
    font-size: 110px;
  }

  @media (max-width: 640px) {
    font-size: 90px;
  }
`;

const IconWrapper = styled.div`
	display: flex;
	align-items: center;
	width: 400px;
	margin-bottom: 60px;
`;


const ErrorMessage = styled.h2`
  font-size: 30px;
	font-weight: var(--font-medium);
	color: var(--gray-500);

  @media (max-width: 1248px) {
    font-size: 30px;
  }

  @media (max-width: 640px) {
    font-size: 15px;
  }
`;

const ErrorButton = styled(PrimaryButton)`
  width: 40%;
  height: 70px;
  border-radius: 12px;
  font-size: 1.2rem;
	color: var(--white);
	background-color: var(--purple-600);

  @media (max-width: 640px) {
    border-radius: 5px;
    width: 120px;
    height: 45px;
    font-size: 15px;
  }
`;

function NotFoundPage() {
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate(`/`);
  };

  return (
    <Container>
      <ErrorTitle>
				404
				<br/>
				ERROR
			</ErrorTitle>
			<IconWrapper>
				<LogoIcon />
				<EllipsisLoading />
				<QuestionMark />
			</IconWrapper>
      <MessageContainer>
        <ErrorMessage>존재하지 않는 페이지입니다</ErrorMessage>
        <ErrorMessage>
          올바른 주소가 맞는지 다시 한번 확인해 주세요
        </ErrorMessage>
      </MessageContainer>
      <ErrorButton onClick={handleHomePage}>홈으로 가기</ErrorButton>
    </Container>
  );
}

export default NotFoundPage;
