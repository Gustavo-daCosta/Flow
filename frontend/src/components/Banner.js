// src/components/Banner.js
import React from 'react';
import './styles/Banner.css'; // Estilo separado para o componente

const Banner = () => {
    return (
        <div className="banner-container">
            <div className="banner-content">
                <h1>Quer conhecer novos lugares?</h1>
                <p>Preencha as informações abaixo para criarmos a melhor agenda de turismo pensando em você!</p>
            </div>
        </div>
    );
};

export default Banner;
