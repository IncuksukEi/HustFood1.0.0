import React, { useState } from 'react';
import  { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './BillBoard.css';
import { billboardData } from '../../data/billBoradData';

const BillBoard = () => {
    const navigate = useNavigate();
    const images = billboardData;
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleImageClick = (currentIndex) => {
        const link = `/search?q=${images[currentIndex].query}`;
        navigate(link);
    };

    return (
        <div className="billboard-container">
            <button className="slider-button prev" onClick={prevSlide}>
                <FaChevronLeft />
            </button>
            
            <div className="billboard-content">
                <img 
                    src={images[currentIndex].url_img} 
                    alt={images[currentIndex].name}
                    className="billboard-image"
                    onClick={() => handleImageClick(currentIndex)}
                />
            </div>

            <button className="slider-button next" onClick={nextSlide}>
                <FaChevronRight />
            </button>
            
            <div className="dots">
                {images.map((_, index) => (
                    <span 
                        key={index} 
                        className={`dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default BillBoard;
