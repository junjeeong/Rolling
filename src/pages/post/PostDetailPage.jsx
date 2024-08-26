import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipientById, getMessagesByRecipientId } from '../../api/recipients.js';
import { HeaderService } from '../../components/Header/HeaderService.jsx';
import { AddCard } from '../../components/common/Card/AddCard.jsx';
import { PaperCard } from '../../components/common/Card/PaperCard.jsx';

// getRecipientById api 테스트 페이지 /9-3/recipients/${id}/
function PostDetailPage() {
  const { id, recipient_id } = useParams();
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState(null);
  const [sender, setSender] = useState([]);
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipientById(id);
        setRecipient(data);
        // 새로운 API 호출
        const response = await getMessagesByRecipientId(id);
        setSender(response);
        setMessage(response.results);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id, recipient_id]);

  return (
    <div>
      <HeaderService recipient={recipient} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', padding: '113px 0' }}>
        <AddCard />
        {/* message 배열의 길이만큼 PaperCard  */}
        {message.map((item) => (
          <PaperCard key={item.id} sender={item} />
        ))}

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      </div>
    </div>
  );
}

export default PostDetailPage;
