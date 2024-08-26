import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllUser } from '../../api/recipients';
import { useNavigate } from 'react-router-dom';
import ListSection from './ListSection';
import Container from './Container';
import Title from './Title';
import CardListSection from './CardListSection';
import GoToMakeButton from './GoToMakeButton';

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
