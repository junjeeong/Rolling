import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';

const HeaderContainer = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const listPaths = ['/', '/list'];
  const existingPath = listPaths.includes(location.pathname);
  // 모바일 디바이스에서 특정 경로가 아닐 경우 헤더를 숨김
  if (isMobile && !existingPath) {
    return null;
  }

  // 로직 처리 후 UI 컴포넌트로 전달
  return <Header existingPath={existingPath} />;
};

export default HeaderContainer;
