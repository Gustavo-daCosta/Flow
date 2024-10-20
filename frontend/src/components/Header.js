// src/components/Header.js
import React from 'react';
import './styles/Header.css'; // Você pode criar este arquivo para estilizar o cabeçalho
import logo from './assets/logo.svg';
import person from './assets/person.svg';

const Header = () => {
    return (
        <header className="header" style={{ borderBottom: '2px solid black', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <div className="logo">
                <img src={logo} alt="Logo Flow" />
            </div>
            <button className="login-btn">
                Login
                <img src={person} alt="Logo Flow" />
            </button>
        </header>
    );
};

export default Header;
