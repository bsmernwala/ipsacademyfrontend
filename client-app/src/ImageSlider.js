import React, { useState, useEffect } from "react";
import "./ImageSlider.css";
import pic1 from "./assets/sliderpic1.webp";
import pic2 from "./assets/sliderpic2.webp";
import pic3 from "./assets/sliderpic3.webp";
import pic4 from "./assets/sliderpic4.webp";
import pic5 from "./assets/sliderpic5.webp";

function ImageSlider() {
  const images = [
    pic1,pic2,pic3,pic4,pic5
  ];

  const [current, setCurrent] = useState(0);

  // Auto Slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  return (
    <div className="slider">
      <button className="prev" onClick={prevSlide}>
        ❮
      </button>

      <img
        src={images[current]}
        alt="slider"
        className="slider-image"
      />

      <button className="next" onClick={nextSlide}>
        ❯
      </button>

      <div className="dots">
        {images.map((_, index) => (
          <span
            key={index}
            className={current === index ? "dot active" : "dot"}
            onClick={() => setCurrent(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;