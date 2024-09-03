import { useEffect, useState } from "react";
import styled from "styled-components";
import ShareImage from "../../assets/images/icons/share.png";

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  width: 56px;
  height: 36px;
  background-color: transparent;
  background-image: url(${ShareImage});
  background-size: contain;
  background-repeat: no-repeat;
  border: none;
  cursor: pointer;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 1000;
  overflow: hidden;
  width: 160px;
  padding: 8px 0;
`;

const DropdownItem = styled.button`
  padding: 10px 16px;
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background-color: #f1f1f1;
  }

  &:not(:last-child) {
    border-bottom: 1px solid #ddd;
  }
`;

const KakaoShareButton = ({ onCloseDropdown }) => {
  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
    }

    window.Kakao.Share.createDefaultButton({
      container: "#kakaotalk-sharing-btn",
      objectType: "feed",
      content: {
        title: "롤링 페이퍼",
        description: "Rolling에서 롤링 페이퍼를 작성해보세요!",
        imageUrl: "https://fe93.netlify.app/logo.png",
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
        {
          title: "앱으로 보기",
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  }, []);

  useEffect(() => {
    // 현재 window.open 함수를 originalWindowOpen 변수에 저장
    // 나중에 원래의 window.open 동작을 복원하기 위해 필요
    const originalWindowOpen = window.open;

    // window.open 함수를 재정의
    window.open = (...args) => {
      // 팝업이 열리기 직전에 onCloseDropdown 함수를 호출하여 드롭다운을 닫음
      onCloseDropdown();
      // 원래의 window.open 함수 호출
      return originalWindowOpen(...args);
    };

    // 컴포넌트가 언마운트될 때 실행, window.open을 원래의 함수로 복원
    return () => {
      window.open = originalWindowOpen;
    };
  }, [onCloseDropdown]);

  return <DropdownItem id="kakaotalk-sharing-btn">카카오톡 공유</DropdownItem>;
};

const ShareDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseDropdown = () => {
    setIsOpen(false);
  };

  const copyURL = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      // TODO Modal 로 대체 예정
      alert("URL이 복사되었습니다!");
      // URL 복사 후 드롭다운 메뉴 닫기
      handleCloseDropdown();
    } catch (err) {
      console.error("URL 복사 실패:", err);
    }
  };

  return (
    <DropdownContainer>
      <DropdownButton onClick={handleToggleDropdown} />
      {isOpen && (
        <DropdownMenu>
          <KakaoShareButton onCloseDropdown={handleCloseDropdown} />
          <DropdownItem onClick={copyURL}>URL 공유</DropdownItem>
        </DropdownMenu>
      )}
    </DropdownContainer>
  );
};

export default ShareDropdown;
