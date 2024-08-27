import ShareDropdown from "../components/Share/ShareDropdown";
import useKakaoShare from "../hooks/useShareKakao";

export const Home = () => {
  // 카카오 SDK 로드용 커스텀 훅
  const isKakaoReady = useKakaoShare();

  return (
    <div id="homeContainer" style={{ padding: "20px" }}>
      <h1>Share Example</h1>
      {isKakaoReady && <ShareDropdown />}
    </div>
  );
};
