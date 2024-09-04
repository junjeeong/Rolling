import React, { useEffect, useState } from "react";
import { getAllUser } from "../../api/recipients";
import { useNavigate } from "react-router-dom";
import CardList from "./CardList";
import styled, { createGlobalStyle } from "styled-components";
import PrimaryButton from "../../components/common/Button/PrimaryButton";
import Header from "../../components/Header/Header";

const ScrollStyle = createGlobalStyle`
  body {
    overflow-x: hidden;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  * {
    box-sizing: inherit;
  }
`;

//리스트 레이아웃
const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;

	@media (max-width: 768px) {
		padding: 0px;
	}
`;

//ListSection
const ListSection = styled(Layout)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 100px;
	margin-top: 50px;

  @media (min-width: 769px) and (max-width: 1023px) {
    width: 80%;
    height: calc(100svh);
  }

	@media (max-width: 768px) {
		overflow-x: hidden;
		width: 100%;
		padding-bottom: 0;
		margin-top: 70px;
	}
`;

//Container
const Container = styled.div`
  margin-bottom: 6.4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1248px) {
    margin-bottom: 8rem;
    width: 100vw;
  }

  @media (max-width: 768px) {
    margin-bottom: 3rem;
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
    margin-left: 44px;
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
  width: 280px;
  padding: 14px 60px;
  line-height: 2.8rem;
  font-size: 1.2rem;
  white-space: nowrap;

  display: flex;
  align-items: center;
  justify-content: center;

  span {
    display: flex;
    justify-content: center;
    width: 160px;
  }

  @media (min-width: 769px) and (max-width: 1023px) {
    width: 90%;
    display: flex;
    justify-content: center;
  }

  @media (max-width: 768px) {
    width: 90%;
    display: flex;
    justify-content: center;
  }
`;

const MarginWrap = styled.div`
  @media (min-width: 769px) and (max-width: 1023px) {
    height: 300px;
  }

@media (max-width: 768px) {
	height: 150px;
}
`

export default function CommonListDetail() {
	const [loading, setLoading] = useState(false);
  const [popularMessages, setPopularMessages] = useState([]);
  const [recentMessages, setRecentMessages] = useState([]);
  const [hasMorePopular, setHasMorePopular] = useState(true);
  const [hasMoreRecent, setHasMoreRecent] = useState(true);
  const navigate = useNavigate();

	const fetchPopularUsers = async () => {
    setLoading(true);
    try {
      const limit = 20;
      const users = await getAllUser({ limit, offset: 0 }); // 인기 리스트의 경우 offset을 0으로 고정
      const { results, ...data } = users;

			const filteredResults = results.filter(
				(message) => new Date(message.createdAt) > new Date('2024-08-24') // 특정 날짜 이후의 데이터만 가져옴
			);

      setPopularMessages((prev) => {
        const newMessages = filteredResults.filter(
					(newMessage) => !prev.some((prevMessage) => prevMessage.id === newMessage.id)
				);
        return [...prev, ...newMessages];
      });

      setHasMorePopular(data !== null);
    } catch (error) {
      console.error("Failed to fetch popular users:", error);
    } finally {
      setLoading(false);
    }
  };

	const fetchRecentUsers = async () => {
    setLoading(true);
    try {
      const limit = 20;
      const users = await getAllUser({ limit, offset: 0 }); // 최근 리스트는 limit을 20으로 설정
      const { results, ...data } = users;

			const filteredResults = results.filter(
        (message) => new Date(message.createdAt) > new Date('2024-08-24')
      );

      setRecentMessages((prev) => {
        const newMessages = filteredResults.filter(
					(newMessage) => !prev.some((prevMessage) => prevMessage.id === newMessage.id)
				);
        return [...prev, ...newMessages];
      });

      setHasMoreRecent(data !== null);
    } catch (error) {
      console.error("Failed to fetch recent users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasMorePopular) {
      fetchPopularUsers();
    }
    if (hasMoreRecent) {
      fetchRecentUsers();
    }
  }, []);

	const handleCardClick = (recipientId) => {
    navigate(`/post/${recipientId}`);
  };

	// 인기 롤링 페이퍼는 messageCount에 따라 정렬
	const sortedPopularMessages = [...popularMessages].sort((a, b) => Number(b.messageCount) - Number(a.messageCount));
	// **8개의 데이터만 화면에 표시**
	const popularMessagesToDisplay = sortedPopularMessages.slice(0, 8);
  // 최근에 만든 롤링 페이퍼는 createdAt에 따라 정렬
  const sortedRecentMessages = [...recentMessages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const existingPath = true;

  return (
    <>
			<Header existingPath={existingPath} />
      <ScrollStyle />
      <ListSection>
        <Container>
          <Title>인기 롤링 페이퍼 🔥</Title>
          <CardList loading={loading} messages={popularMessagesToDisplay} handleCardClick={handleCardClick} />
          <Title>최근에 만든 롤링 페이퍼 ⭐️</Title>
          <CardList loading={loading} messages={sortedRecentMessages} handleCardClick={handleCardClick} />
        </Container>
        <GoToMakeButton to="/post">나도 만들어보기</GoToMakeButton>
      </ListSection>
      <MarginWrap />
    </>
  );
}
