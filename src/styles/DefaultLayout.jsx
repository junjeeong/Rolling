import React from "react";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import HeaderContainer from "../containers/Header/HeaderContainer";

// 기존 스타일 정의
const FullLayout = styled.div`
  display: flex;
  justify-content: center;
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
