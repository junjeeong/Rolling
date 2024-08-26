import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header.jsx';

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
      <Header />
      <MainLayout>
        <Outlet />
      </MainLayout>
    </Layout>
  );
};
