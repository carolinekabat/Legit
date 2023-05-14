import React, { MouseEventHandler } from 'react';

interface NavbarProps {
  handleDisconnect: MouseEventHandler<HTMLButtonElement>;
}

const Navbar: React.FC<NavbarProps> = ({ handleDisconnect }) => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="img/legit-logo-nouns.png" alt="Logo" />
      </div>
      <div className="connect-button">
        <button onClick={handleDisconnect}>Disconnect</button>
      </div>
      <style jsx>{`
        .navbar {
          display: flex;
          width: 100%;
          justify-content: space-between;
          align-items: center;
          height: 60px;
          padding: 0 20px;
          background-color: #f5f5f5;
        }
        .logo img {
          height: 40px;
        }
        // .connect-button button {
        //   padding: 8px 16px;
        //   background-color: #007bff;
        //   color: #fff;
        //   border: none;
        //   border-radius: 4px;
        //   cursor: pointer;
        // }
      `}</style>
    </nav>
  );
};

export default Navbar;
