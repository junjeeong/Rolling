import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import HeaderContainer from '../containers/Header/HeaderContainer';

export const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
// 이건 랜딩,리스트 페이지에서 다시 따로 정의해주기
`
const FullLayout = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw; /* 화면 너비 전체로 수정 */
  height: 100vh; /* 화면 높이 전체로 설정 */
`;

const ContentLayout = styled.div`
  max-width: 1200px;
  margin-top: 65px;
  padding: 20px;
`;

export const DefaultLayout = () => {
  return (
    <FullLayout>
      <ContentLayout>
        <HeaderContainer />
        <Outlet />
      </ContentLayout>
    </FullLayout>
  );
};
