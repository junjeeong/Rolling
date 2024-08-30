import styled from "styled-components";
import CommonLandingDetail from "./CommonLandingDetail";

const MobileLandingDetail = styled(CommonLandingDetail)`
  padding: 0;
  max-width: 360px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const TabletLandingDetail = styled(CommonLandingDetail)`
  max-width: 640px;
  margin: 0 auto;
  gap: 57px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const DesktopLandingDetail = styled(CommonLandingDetail)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

export { MobileLandingDetail, TabletLandingDetail, DesktopLandingDetail };
