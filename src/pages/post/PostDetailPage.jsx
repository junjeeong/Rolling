import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { HeaderService } from "../../components/Header/HeaderService.jsx";
import { AddCard } from "../../components/common/Card/AddCard.jsx";
import { PaperCard } from "../../components/common/Card/PaperCard.jsx";
import { useGetMessagesByRecipientId } from "../../hooks/useGetRecipients.jsx";
import HeaderContainer from "../../containers/Header/HeaderContainer.jsx";
import ModalCardContainer from "../../containers/Modal/ModalCardContainer.jsx";
import { DeleteButtonContainer } from "../../containers/Post/DeleteButtonContainer.jsx";
import useRecipients from "../../hooks/useRecipients.jsx";
import usePastelColor from "../../hooks/usePastelColor.jsx";

const Container = styled.div`
  display: flex;
  position: relative;
  background-color: ${({ $backgroundColor }) => $backgroundColor || "beige"};
  ${({ $backgroundImage }) =>
    $backgroundImage &&
    `background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${$backgroundImage}') no-repeat center/cover;`}
  background-size: cover;
  min-height: calc(100vh - 133px);
  @media (max-width: 1200px) {
    flex-direction: column;
    padding: 0 24px;
  }
  @media (max-width: 820px) {
    // iPad Air
    overflow-x: hidden;
    padding: 0 10px;
  }
  @media (max-width: 768px) {
    overflow-x: hidden;
    min-height: calc(100vh - 104px);
    // backgroundImage 크기
    background-size: cover;
  }
`;

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
  margin: 113px auto;
  max-width: 1200px;
  // 테블릿 사이즈
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 93px auto;
  }
  // 모바일 사이즈
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    margin: 24px auto;
  }
`;

const PostDetailPage = ({ isEdit }) => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardInfo, setSelectedCardInfo] = useState({});
  // 커스텀 Hook을 활용하여 데이터 fetching을 보다 효율적으로 처리합니다.
  const { recipient, setRecipient } = useRecipients(id);
  const { messages, error: messagesError } = useGetMessagesByRecipientId(id);

  // 백그라운드 컬러 파스텔 컬러로 변경
  const pastelColor = usePastelColor(recipient?.backgroundColor);

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
        $backgroundColor={pastelColor}
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
