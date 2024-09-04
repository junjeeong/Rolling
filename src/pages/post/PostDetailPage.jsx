import { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { HeaderService } from "../../components/Header/HeaderService.jsx";
import { AddCard } from "../../components/common/Card/AddCard.jsx";
import { PaperCard } from "../../components/common/Card/PaperCard.jsx";
import { useGetMessagesByRecipientId } from "../../hooks/useGetRecipients.jsx";
import { DeleteButtonContainer } from "../../containers/Post/DeleteButtonContainer.jsx";
import HeaderContainer from "../../containers/Header/HeaderContainer.jsx";
import ModalCardContainer from "../../containers/Modal/ModalCardContainer.jsx";
import useRecipients from "../../hooks/useRecipients.jsx";
import usePastelColor from "../../hooks/usePastelColor.jsx";
import EllipsisLoading from "../../components/Loading/EllipsisLoading.jsx";

const Container = styled.div`
  display: flex;
  position: relative;
  overflow: auto;
  background-color: ${({ $backgroundColor }) => $backgroundColor || "white"};
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
  const targetDOM = useRef();
  const [limit, setLimit] = useState(8);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCardInfo, setSelectedCardInfo] = useState({});
  // 커스텀 Hook을 활용하여 데이터 fetching을 보다 효율적으로 처리합니다.
  const { recipient, setRecipient } = useRecipients(id);
  const { messages, error: messagesError } = useGetMessagesByRecipientId(
    id,
    limit
  );
  // 백그라운드 컬러 파스텔 컬러로 변경
  const pastelColor = usePastelColor(recipient?.backgroundColor);

  // 무한스크롤 관련 함수
  useEffect(() => {
    if (!targetDOM.current || !id) return;
    // IntersectionObserver가 작동하는 방식을 정의
    const options = {
      root: null, // null이면 기본값인 뷰포트를 기준으로 요소의 교차 상태를 관찰 -> 화면에 targetDOM이 보일 경우 callback 실행
      rootMargin: "0px",
      threshold: 1, // targetDOM이 뷰포트에 "완전히" 들어왔을 때 콜백 함수가 실행
    };

    // IntersectionObserver가 교차 상태를 감지했을 때(targetDOM이 뷰포트에 완전히 보이는가!!) 호출되는 함수
    const observerCallback = (entries) => {
      if (messages.results.length < limit) return;
      // entries는 교차 상태가 변경될 때마다 객체가 추가되고 그러한 객체들이 모인 배열. 무한스크롤이기 때문에 targetDOM이 뷰포트에 보일때마다 동적으로 추가된다는 의미
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // entry.isIntersecting는 Boolean 타입으로 true일 경우 교착되었음을 발견했다는 의미
          setLimit((prevLimit) => prevLimit + 3); // targetDOM이 뷰포트에 포착될 경우 기존에 messages를 8개만 불러왔다면 Limit미디어쿼리를 3씩 추가해서 다시 받아오기.
        }
      });
    };

    // IntersectionObserver 객체를 생성하고, 관찰하려는 DOM 요소를 등록.
    // 옵저버 객체를 생성할 때 앞서 정의한 콜백 함수와 옵션을 인자로 넣어줌.
    const observer = new IntersectionObserver(observerCallback, options);
    // targetDOM 요소를 옵저버에 등록하여, 이 요소의 교차 상태를 관찰하도록 합니다.
    observer.observe(targetDOM.current);

    // 컴포넌트가 언마운트되거나, useEffect가 다시 실행될 때 옵저버를 해제하여 메모리 누수를 방지
    return () => {
      if (observer && targetDOM.current) {
        // 옵저버가 더 이상 targetDOM 요소를 관찰하지 않도록 해제합니다.
        observer.unobserve(targetDOM.current);
      }
    };
  }, [id, messages]);

  // Modal 관련 함수
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
      {recipient && messages?.results ? (
        <HeaderService
          recipient={recipient}
          setRecipient={setRecipient}
          messages={messages.results}
        />
      ) : (
        <p>Loading information...</p> // 로딩 중이거나 데이터가 없을 때 표시할 메시지
      )}
      <Container
        $backgroundColor={pastelColor}
        $backgroundImage={recipient?.backgroundImageURL}
      >
        <GridWrap>
          <AddCard id={id} />
          {/* messages가 존재하고, results 배열이 존재할 때만 렌더링 */}
          {messages?.results ? (
            messages.results.map((message) => (
              <PaperCard
                key={message.id}
                message={message}
                isEdit={isEdit}
                onClick={() => openModal(message)}
              />
            ))
          ) : (
            <p>Loading messages...</p> // 데이터가 없거나 로딩 중일 때 표시할 메시지
          )}
          {isEdit && <DeleteButtonContainer selectedPaperId={recipient?.id} />}
        </GridWrap>
      </Container>
      {messages?.results?.length >= limit && (
        <div style={{ height: "15px" }} ref={targetDOM}>
          <EllipsisLoading />
        </div>
      )}
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
