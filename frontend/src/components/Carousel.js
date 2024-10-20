// src/components/Carousel.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import img1 from './assets/img1.jpg';
import img2 from './assets/img2.jpg';
import img3 from './assets/img3.jpg';

const ImageCarousel = () => {
    return (
        <div className="carousel-wrapper">
            <Carousel
                showArrows={true}
                showThumbs={false}
                infiniteLoop={true}
                autoPlay={true}
                interval={5000}
            >
                <div>
                    <img src={img1} alt="Imagem 1" />
                </div>
                <div>
                    <img src={img2} alt="Imagem 2" />
                </div>
                <div>
                    <img src={img3} alt="Imagem 3" />
                </div>
            </Carousel>
        </div>
    );
};

export default ImageCarousel;