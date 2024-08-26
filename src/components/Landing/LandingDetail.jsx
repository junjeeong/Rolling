import React from 'react';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import { MobileLandingDetail, TabletLandingDetail, DesktopLandingDetail } from './LandingDetails';

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