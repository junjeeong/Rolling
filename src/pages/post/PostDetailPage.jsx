import { useParams } from 'react-router-dom';
import { useGetRecipientById, useGetMessagesByRecipientId } from '../../hooks/useGetRecipients.jsx';
import { HeaderService } from '../../components/Header/HeaderService.jsx';
import { AddCard } from '../../components/common/Card/AddCard.jsx';
import { PaperCard } from '../../components/common/Card/PaperCard.jsx';
import HeaderContainer from '../../containers/Header/HeaderContainer.jsx';
import styled from 'styled-components';

// 스타일 정의
const Container = styled.div`
  height: calc(100vh - 133px); // 헤더 제외 높이
  background-color: ${({ $backgroundColor }) => $backgroundColor || 'white'}; // 기본 색상 지정
  overflow-y: hidden;
`;

function PostDetailPage() {
  const { id } = useParams();

  // 커스텀 Hook을 활용하여 데이터 fetching을 보다 효율적으로 처리합니다.
  const { recipient } = useGetRecipientById(id);
  const { messages, error: messagesError } = useGetMessagesByRecipientId(id);

  // 오류 및 로딩 처리
  if (messagesError) {
    return <p style={{ color: 'red' }}>Error: {messagesError}</p>;
  }

  if (!recipient) {
    return <p>Loading recipient...</p>;
  }

  if (!messages) {
    return <p>Loading messages...</p>;
  }

  return (
    <div>
      <HeaderContainer />
      <HeaderService recipient={recipient} />
      <Container $backgroundColor={recipient?.backgroundColor}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '113px 0', margin: '0 auto', maxWidth: '1200px' }}>
          <AddCard id={id} />
          {/* message 배열의 길이만큼 PaperCard 생성 */}
          {messages.results.map((message) => (
            <PaperCard key={message.id} message={message} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default PostDetailPage;
