import styled from "styled-components";
import { useRef, useState } from "react";
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

const Container = styled.div`
  height: calc(100vh - 133px); // 헤더 제외 높이
  overflow-y: auto;
  background-color: ${({ $backgroundColor }) => $backgroundColor || "beige"};
  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${$backgroundImage}') no-repeat center/cover;
  `}
`;

const GridWrap = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  padding: 113px 0;
  margin: 0 auto;
  max-width: 1200px;
`;

const InfiniteScrollTargetDOM = styled.div`
  width: 100%;
  height: 1px;
  background-color: transparent;
`;

const PostDetailPage = ({ isEdit }) => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardInfo, setSelectedCardInfo] = useState({});
  // 커스텀 Hook을 활용하여 데이터 fetching을 보다 효율적으로 처리합니다.
  const { recipient } = useGetRecipientById(id);
  const { messages, error: messagesError } = useGetMessagesByRecipientId(id);
  const target = useRef();

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

  const handleModalOpen = (isOpen = false, cardInfo = "") => {
    if (isOpen === true) {
      setIsModalOpen(true);
      setSelectedCardInfo(cardInfo);
    } else {
      setIsModalOpen(false);
      setSelectedCardInfo({});
    }
  };

  return (
    <div>
      <HeaderContainer />
      <HeaderService recipient={recipient} messages={messages.results} />
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
              onClick={() => handleModalOpen(true, message)}
            />
            
          ))}
          {isEdit && <DeleteButtonContainer selectedPaperId={recipient.id} />}
        </GridWrap>
      </Container>
      <InfiniteScrollTargetDOM ref={target} />
      {isModalOpen && (
        <ModalCardContainer
          handleModalOpen={handleModalOpen}
          selectedCardInfo={selectedCardInfo}
        ></ModalCardContainer>
      )}
    </div>
  );
};

export default PostDetailPage;
