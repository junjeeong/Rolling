import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipientById } from '../api/recipients.js';
import { HeaderService } from '../components/Header/HeaderService.jsx';
import { AddCard } from '../components/common/Card/AddCard.jsx';
import { PaperCard } from '../components/common/Card/PaperCard.jsx';

// getRecipientById api 테스트 페이지 /9-3/recipients/${id}/
function PostDetailPage() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipientById(id);
        console.log('Fetched recipient:', data); // 로그 추가
        setRecipient(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <HeaderService recipient={recipient} />
      <AddCard />
      <PaperCard recipient={recipient} />

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
}

export default PostDetailPage;
