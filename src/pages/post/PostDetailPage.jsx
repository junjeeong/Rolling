import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getRecipientById,
  getMessagesByRecipientId,
} from "../../api/recipients.js";
import { HeaderService } from "../../components/Header/HeaderService.jsx";
import { AddCard } from "../../components/common/Card/AddCard.jsx";
import { PaperCard } from "../../components/common/Card/PaperCard.jsx";

import HeaderContainer from "../../containers/Header/HeaderContainer.jsx";
import styled from "styled-components";

// getRecipientById api 테스트 페이지 /9-3/recipients/${id}/
const Container = styled.div`
  background-color: red;
`;

function PostDetailPage() {
  const { id, recipient_id } = useParams();
  const [error, setError] = useState(null);
  function PostDetailPage() {
    return (
      <div>
        <HeaderContainer />
        <HeaderService recipient={recipient} />
        <Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              padding: "113px 0",
              margin: "0 auto",
              maxWidth: "1200px",
            }}
          >
            <AddCard id={id} />
            {/* message 배열의 길이만큼 PaperCard  */}
            {message.map((item) => (
              <PaperCard key={item.id} sender={item} />
            ))}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
          </div>
        </Container>
      </div>
    );
  }
}

export default PostDetailPage;
