import React from "react";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { MobileLandingDetail, TabletLandingDetail, DesktopLandingDetail } from "../Landing/DeviceLandingDetail";
import cardImg1 from "../../assets/images/cardImg1.png";
import cardImg2 from "../../assets/images/cardImg2.png";

export default function LandingDetail() {
  const { width } = useWindowDimensions();

  if (width <= 640) {
    return <MobileLandingDetail cardImg1={cardImg1} cardImg2={cardImg2} />;
  } else if (width <= 1024) {
    return <TabletLandingDetail cardImg1={cardImg1} cardImg2={cardImg2} />;
  } else {
    return <DesktopLandingDetail cardImg1={cardImg1} cardImg2={cardImg2} />;
  }
}
