import React from 'react';
import { LayoutRouteProps, useNavigate } from 'react-router-dom';

export default function Layout({ children }: LayoutRouteProps) {
  const nav = useNavigate();

  const Header = () => {
    return (
      <header className="header">
        <h3 className="header-title">Games App</h3>
      </header>
    );
  };

  const NavBar = () => {
    const handleBack = () => {
      nav(-1);
    };
    const handleShowGames = () => {
      nav('games');
    };
    return (
      <nav className="nav-bar">
        <ul className="nav-list">
          <li className="nav-li" onClick={handleBack}>
            Back
          </li>
          <li className="nav-li" onClick={handleShowGames}>
            Show Games
          </li>
        </ul>
      </nav>
    );
  };

  const Footer = () => {
    return (
      <div className="footer-container">
        <footer className="footer">
          <p className="footer">&copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  };

  return (
    <>
      <Header />
      <NavBar />
      <main className="main-area">{children}</main>
      <Footer />
    </>
  );
}
