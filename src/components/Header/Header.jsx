import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logoImg from '../../assets/images/logo.png';
import OutlineButton from '../common/Button/OutlineButton.jsx';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  border-bottom: 1px solid var(--gray-300);
  background: var(--white);
  z-index: 10;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  height: 64px;
  margin: 0 auto;
  @media (max-width: 1248px) {
    padding: 0 24px;
  }
  @media (max-width: 640px) {
    padding: 0 16px;
  }
`;

const RollingButton = styled(OutlineButton)`
  padding: 4px 20px;
  font-size: 1.2rem;
  line-height: 2rem;
  border-radius: 8px;

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }

  @media (max-width: 640px) {
    font-size: 1rem;
    padding: 3px 10px;
  }
`;

const Header = ({ existingPath }) => (
  <HeaderContainer>
    <Navigation>
      <div>
        <Link to="/">
          <img src={logoImg} alt="롤링 로고" />
        </Link>
      </div>
      {existingPath && <RollingButton to="/post">롤링 페이퍼 만들기</RollingButton>}
    </Navigation>
  </HeaderContainer>
);

export default Header;
