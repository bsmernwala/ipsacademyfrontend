// // import React, { useState, useEffect } from "react";
// // import "./ImageSlider.css";
// // import pic1 from "./assets/sliderpic1.webp";
// // import pic2 from "./assets/sliderpic2.webp";
// // import pic3 from "./assets/sliderpic3.webp";
// // import pic4 from "./assets/sliderpic4.webp";
// // import pic5 from "./assets/sliderpic5.webp";

// // function ImageSlider() {
// //   const images = [
// //     pic1,pic2,pic3,pic4,pic5
// //   ];

// //   const [current, setCurrent] = useState(0);

// //   // Auto Slide
// //   useEffect(() => {
// //     const interval = setInterval(() => {
// //       setCurrent((prev) => (prev + 1) % images.length);
// //     }, 3000);

// //     return () => clearInterval(interval);
// //   }, [images.length]);

// //   const nextSlide = () => {
// //     setCurrent((prev) => (prev + 1) % images.length);
// //   };

// //   const prevSlide = () => {
// //     setCurrent((prev) =>
// //       prev === 0 ? images.length - 1 : prev - 1
// //     );
// //   };

// //   return (
// //     <div className="slider">
// //       <button className="prev" onClick={prevSlide}>
// //         ❮
// //       </button>

// //       <img
// //         src={images[current]}
// //         alt="slider"
// //         className="slider-image"
// //       />

// //       <button className="next" onClick={nextSlide}>
// //         ❯
// //       </button>

// //       <div className="dots">
// //         {images.map((_, index) => (
// //           <span
// //             key={index}
// //             className={current === index ? "dot active" : "dot"}
// //             onClick={() => setCurrent(index)}
// //           ></span>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }

// // export default ImageSlider;

// import React, { useState, useEffect, useRef } from "react";
// import "./ImageSlider.css";

// import pic1 from "./assets/sliderpic1.webp";
// import pic2 from "./assets/sliderpic2.webp";
// import pic3 from "./assets/sliderpic3.webp";
// import pic4 from "./assets/sliderpic4.webp";
// import pic5 from "./assets/sliderpic5.webp";

// const images = [pic1, pic2, pic3, pic4, pic5];

// function ImageSlider() {
//   const [current, setCurrent] = useState(0);
//   const [pause, setPause] = useState(false);

//   const touchStart = useRef(0);
//   const touchEnd = useRef(0);

//   useEffect(() => {
//     if (pause) return;

//     const timer = setInterval(() => {
//       nextSlide();
//     }, 3500);

//     return () => clearInterval(timer);
//   }, [current, pause]);

//   useEffect(() => {
//     const handleKey = (e) => {
//       if (e.key === "ArrowRight") nextSlide();
//       if (e.key === "ArrowLeft") prevSlide();
//     };

//     window.addEventListener("keydown", handleKey);

//     return () => window.removeEventListener("keydown", handleKey);
//   }, []);

//   const nextSlide = () => {
//     setCurrent((prev) => (prev + 1) % images.length);
//   };

//   const prevSlide = () => {
//     setCurrent((prev) =>
//       prev === 0 ? images.length - 1 : prev - 1
//     );
//   };

//   const handleTouchStart = (e) => {
//     touchStart.current = e.targetTouches[0].clientX;
//   };

//   const handleTouchMove = (e) => {
//     touchEnd.current = e.targetTouches[0].clientX;
//   };

//   const handleTouchEnd = () => {
//     if (touchStart.current - touchEnd.current > 70) {
//       nextSlide();
//     }

//     if (touchStart.current - touchEnd.current < -70) {
//       prevSlide();
//     }
//   };

//   return (
//     <div
//       className="slider"
//       onMouseEnter={() => setPause(true)}
//       onMouseLeave={() => setPause(false)}
//       onTouchStart={handleTouchStart}
//       onTouchMove={handleTouchMove}
//       onTouchEnd={handleTouchEnd}
//     >
//       <div
//         className="slider-track"
//         style={{
//           transform: `translateX(-${current * 100}%)`,
//         }}
//       >
//         {images.map((img, index) => (
//           <div className="slide" key={index}>
//             <img src={img} alt={`Slide ${index + 1}`} />

//             <div className="overlay">
//               <h2>Big Sale</h2>
//               <p>Up to 70% OFF</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <button className="nav prev" onClick={prevSlide}>
//         &#10094;
//       </button>

//       <button className="nav next" onClick={nextSlide}>
//         &#10095;
//       </button>

//       <div className="dots">
//         {images.map((_, index) => (
//           <span
//             key={index}
//             className={current === index ? "dot active" : "dot"}
//             onClick={() => setCurrent(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

// export default ImageSlider;
import React, { useState, useEffect, useRef } from "react";
import "./ImageSlider.css";

import pic0 from "./assets/sliderpic0.png";
import pic1 from "./assets/sliderpic1.webp";
import pic2 from "./assets/sliderpic2.webp";
import pic3 from "./assets/sliderpic3.webp";
import pic4 from "./assets/sliderpic4.png";
import pic5 from "./assets/sliderpic5.webp";
import pic6 from "./assets/sliderpic6.webp";
import pic7 from "./assets/sliderpic7.png";
import pic8 from "./assets/sliderpic8.png";
import pic9 from "./assets/sliderpic9.png";
import pic10 from "./assets/sliderpic10.png";
import pic11 from "./assets/sliderpic11.png";
import pic12 from "./assets/sliderpic12.png";


const sliderImages = [pic0, pic1, pic2, pic3, pic4, pic5,pic6,pic7,pic8,pic9,pic10,pic11,pic12];

// Clone last image at beginning and first image at end
const images = [
  sliderImages[sliderImages.length - 1],
  ...sliderImages,
  sliderImages[0],
];

function ImageSlider() {
  const [current, setCurrent] = useState(1);
  const [transition, setTransition] = useState(true);
  const [pause, setPause] = useState(false);

  const touchStart = useRef(0);
  const touchEnd = useRef(0);

  // Auto Slide
  useEffect(() => {
    if (pause) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [pause]);

  const nextSlide = () => {
    if (current >= images.length - 1) return;
    setCurrent((prev) => prev + 1);
    setTransition(true);
  };

  const prevSlide = () => {
    if (current <= 0) return;
    setCurrent((prev) => prev - 1);
    setTransition(true);
  };

  // Infinite Loop
  const handleTransitionEnd = () => {
    if (current === images.length - 1) {
      setTransition(false);
      setCurrent(1);
    }

    if (current === 0) {
      setTransition(false);
      setCurrent(images.length - 2);
    }
  };

  useEffect(() => {
    if (!transition) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTransition(true);
        });
      });
    }
  }, [transition]);

  // Keyboard
  useEffect(() => {
    const keyHandler = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };

    window.addEventListener("keydown", keyHandler);

    return () => window.removeEventListener("keydown", keyHandler);
  }, [current]);

  // Swipe
  const handleTouchStart = (e) => {
    touchStart.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEnd.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStart.current - touchEnd.current > 60) {
      nextSlide();
    }

    if (touchStart.current - touchEnd.current < -60) {
      prevSlide();
    }
  };

  return (
    <div
      className="slider"
      onMouseEnter={() => setPause(true)}
      onMouseLeave={() => setPause(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        className="slider-track"
        style={{
          transform: `translateX(-${current * 100}%)`,
          transition: transition ? "transform 0.6s ease-in-out" : "none",
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {images.map((img, index) => (
          <div className="slide" key={index}>
            <img src={img} alt={`Slide ${index}`} />

            {/* <div className="overlay">
              <h2>Big Sale</h2>
              <p>Up to 70% OFF</p>
            </div> */}
          </div>
        ))}
      </div>

      <button className="nav prev" onClick={prevSlide}>
        &#10094;
      </button>

      <button className="nav next" onClick={nextSlide}>
        &#10095;
      </button>

      <div className="dots">
        {sliderImages.map((_, index) => (
          <span
            key={index}
            className={
              current === index + 1
                ? "dot active"
                : "dot"
            }
            onClick={() => {
              setCurrent(index + 1);
              setTransition(true);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;