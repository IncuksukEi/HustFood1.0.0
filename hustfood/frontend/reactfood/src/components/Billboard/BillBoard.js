import React, { useState, useEffect } from 'react';
//import { getBillboardImages } from '../../services/productService';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './BillBoard.css';
import { billboardData } from '../../data/billBoradData';

const BillBoard = () => {
    const [images, setImages] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        /*const fetchImages = async () => {
            try {
                const data = await getBillboardImages();
                setImages(data);
            } catch (error) {
                console.error('Error fetching billboard images:', error);
            }
        };
        fetchImages();*/
        setImages(billboardData); // Sử dụng dữ liệu tạm thời từ billboardData

    }, []);

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

    // Fallback image khi API chưa hoạt động
    const defaultImage = {
        url_img: "kfc-banner.jpg",
        name: "KFC Special Offer",
    };

    const displayedImages = images.length > 0 ? images : [defaultImage];

    return (
        <div className="billboard-container">
            <button className="slider-button prev" onClick={prevSlide}>
                <FaChevronLeft />
            </button>
            
            <div className="billboard-content">
                <img 
                    src={displayedImages[currentIndex].url_img} 
                    alt={displayedImages[currentIndex].name}
                    className="billboard-image"
                />
            </div>

            <button className="slider-button next" onClick={nextSlide}>
                <FaChevronRight />
            </button>
            
            <div className="dots">
                {displayedImages.map((_, index) => (
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
