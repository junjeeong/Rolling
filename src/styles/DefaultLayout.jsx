import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import HeaderContainer from '../containers/HeaderContainer';

const Layout = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const MainLayout = styled.div`
  margin-top: 65px;
`;

export const DefaultLayout = () => {
  return (
    <Layout>
      <HeaderContainer />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </Layout>
  );
};
