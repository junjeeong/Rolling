import React, { useEffect, useState } from 'react';
import { getAllUser } from '../../api/recipients';
import { useNavigate } from 'react-router-dom';
import CardListSection from './CardListSection';
import styled from 'styled-components';
import PrimaryButton from '../common/Button/PrimaryButton';

//로직 컴포넌트

//리스트 레이아웃
const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`

//ListSection
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

//Container
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

//Title
const Title = styled.h2`
	margin-top: 50px;
	margin-bottom: 16px;
	font-size: 24px;
	line-height: 36px;
	letter-spacing: -0.01em;
	font-weight: var(--font-bold);
	color: var(--black);

	@media (max-width: 1248px) {
		margin-top: 50px;
		margin-left: 24px;
		margin-bottom: 16px;
	}

	@media (max-width: 768px) {
		font-size: 20px;
		line-height: 30px;
		font-weight: var(--font-medium);
		margin-top: 40px;
		margin-left: 20px;
		margin-bottom: 12px;
		letter-spacing: normal;
	}
`;

//GoToMakeButton
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

export default function CommonListDetail() {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchUser = async () => {
    setLoading(true);
    try{
      const limit = 10;
      const users = await getAllUser({ limit, offset });
      const { results, ...data } = users;

      setMessages((prev) => {
        const newMessages = results.filter(
          newMessage => !prev.some(prevMessage => prevMessage.id === newMessage.id)
        );
        return [...prev, ...newMessages];
      });

      if (data !== null) {
        setHasMore(true);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMore) {
      fetchUser();
    }
  }, [offset]);

  const sortMessages = [...messages].sort(
    (a, b) => b.messageCount - a.messageCount
  );
  const dateSortMessages = [...messages].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const handleCardClick = (recipientId) => {
    navigate(`/post/${recipientId}`);
  };

  return (
    <ListSection>
      <Container>
        <Title>인기 롤링 페이퍼 🔥</Title>
        <CardListSection
          loading={loading}
          messages={sortMessages}
          handleCardClick={handleCardClick}
        />
        <Title>최근에 만든 롤링 페이퍼 ⭐️</Title>
        <CardListSection
          loading={loading}
          messages={dateSortMessages}
          handleCardClick={handleCardClick}
        />
      </Container>
      <GoToMakeButton to='/post'>나도 만들어보기</GoToMakeButton>
    </ListSection>
  );
}
