import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getRecipientById } from '../api/recipients.js';
import { HeaderService } from '../components/Header/HeaderService.jsx';

function PostDetailPage() {
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [recipient, setRecipient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRecipientById(id);
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
      <h1>Post Detail Page</h1>
      <h1>Post Detail Page</h1>
      <p>Post ID: {id}</p>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {recipient && (
        <div>
          <h2>{recipient.name}</h2>
          <p>Background Color: {recipient.backgroundColor}</p>
          <img src={recipient.backgroundImageURL} alt="Background" style={{ width: '300px', height: 'auto' }} />
          <p>Created At: {new Date(recipient.createdAt).toLocaleString()}</p>
          <p>Message Count: {recipient.messageCount}</p>
          <p>Reaction Count: {recipient.reactionCount}</p>
          <div>
            <h3>Recent Messages</h3>
            {recipient.recentMessages.length > 0 ? (
              <ul>
                {recipient.recentMessages.map((message, index) => (
                  <li key={index}>{message}</li>
                ))}
              </ul>
            ) : (
              <p>No recent messages</p>
            )}
          </div>
          <div>
            <h3>Top Reactions</h3>
            {recipient.topReactions.length > 0 ? (
              <ul>
                {recipient.topReactions.map((reaction, index) => (
                  <li key={index}>{reaction}</li>
                ))}
              </ul>
            ) : (
              <p>No top reactions</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetailPage;
