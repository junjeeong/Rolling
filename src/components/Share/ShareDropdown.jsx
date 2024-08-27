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
        description: "#친구 #지인 #동료 #가족",
        imageUrl:
          "http://k.kakaocdn.net/dn/Q2iNx/btqgeRgV54P/VLdBs9cvyn8BJXB3o7N8UK/kakaolink40_original.png",
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
    const originalWindowOpen = window.open;
    window.open = (...args) => {
      onCloseDropdown(); // 팝업이 열리기 직전에 드롭다운을 닫습니다.
      return originalWindowOpen(...args);
    };

    return () => {
      window.open = originalWindowOpen; // 컴포넌트 언마운트 시 원래 상태로 복원
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
