import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderService } from "../../components/Header/HeaderService.jsx";
import { AddCard } from "../../components/common/Card/AddCard.jsx";
import { PaperCard } from "../../components/common/Card/PaperCard.jsx";
import {
  useGetRecipientById,
  useGetMessagesByRecipientId,
} from "../../hooks/useGetRecipients.jsx";
import HeaderContainer from "../../containers/Header/HeaderContainer.jsx";
import ModalCardContainer from "../../containers/Modal/ModalCardContainer.jsx";
import { DeleteButtonContainer } from "../../containers/Post/DeleteButtonContainer.jsx";
import useRecipients from "../../hooks/useRecipients.jsx";

const Container = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  background-color: ${({ $backgroundColor }) => $backgroundColor || "beige"};
  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${$backgroundImage}') no-repeat center/cover;`}
  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 0 24px;
  }
  @media (max-width: 768px) {
    padding: 0 20px;
  }
`;

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  // padding: 113px 0;
  margin: 113px auto;
  max-width: 1200px;
  // 테블릿 사이즈
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 80px 0;
  }
  // 모바일 사이즈
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 80px 20px;
  }
`;

const PostDetailPage = ({ isEdit }) => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardInfo, setSelectedCardInfo] = useState({});
  // 커스텀 Hook을 활용하여 데이터 fetching을 보다 효율적으로 처리합니다.
  const { recipient, setRecipient } = useRecipients(id);
  const { messages, error: messagesError } = useGetMessagesByRecipientId(id);

  // 오류 및 로딩 처리
  if (messagesError) {
    return <p style={{ color: "red" }}>Error: {messagesError}</p>;
  }

  if (!recipient) {
    return <p>Loading recipient...</p>;
  }

  if (!messages) {
    return <p>Loading messages...</p>;
  }

  const openModal = (cardInfo) => {
    setIsModalOpen(true);
    setSelectedCardInfo(cardInfo);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCardInfo({});
  };

  return (
    <div style={{ height: "calc(100vh - 133px)" }}>
      <HeaderContainer />
      <HeaderService
        recipient={recipient}
        setRecipient={setRecipient}
        messages={messages.results}
      />
      <Container
        $backgroundColor={recipient?.backgroundColor}
        $backgroundImage={recipient?.backgroundImageURL}
      >
        <GridWrap>
          <AddCard id={id} />
          {/* message 배열의 길이만큼 PaperCard 생성 */}
          {messages.results.map((message) => (
            <PaperCard
              key={message.id}
              message={message}
              isEdit={isEdit}
              onClick={() => openModal(message)}
            />
          ))}
        </GridWrap>
        {isEdit && <DeleteButtonContainer selectedPaperId={recipient.id} />}
      </Container>
      {isModalOpen && (
        <ModalCardContainer
          onClose={closeModal}
          selectedCardInfo={selectedCardInfo}
        ></ModalCardContainer>
      )}
    </div>
  );
};

export default PostDetailPage;
