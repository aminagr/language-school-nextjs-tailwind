'use client';
import { useState, useEffect } from "react";

export default function MiniGallery() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const images = [
    { src: "/images/st.jpg", alt: "Image 9" },
    { src: "/images/moscow4.jpg", alt: "Image 4" },
    { src: "/images/moscow3.jpg", alt: "Image 3" },
    { src: "/images/moscow2.jpg", alt: "Image 2" },
    { src: "/images/moscow7.jpg", alt: "Image 7" },
    { src: "/images/moscow6.jpg", alt: "Image 6" },
    { src: "/images/st2.jpg", alt: "Image 8" },
    { src: "/images/moscow5.jpg", alt: "Image 5" },
    { src: "/images/moscow.jpg", alt: "Image 1" },
  ];


  const openModal = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };


  const closeModal = () => {
    setIsModalOpen(false);
  };


  const goToNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  
  const goToPrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length); 
  };


  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };


  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      } else if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isModalOpen]);

 
  const displayedImages = [
    images[activeIndex],
    images[(activeIndex + 1) % images.length],
    images[(activeIndex + 2) % images.length],
  ];

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 py-16">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-gray-800">Galerie d'images</h2>
      </div>

     
      <div className="relative flex justify-center items-center space-x-4">
        {displayedImages.map((image, index) => (
          <div key={index} className="group relative cursor-pointer">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-64 object-cover rounded-lg shadow-lg transform group-hover:scale-105 transition-all"
              onClick={() => openModal(activeIndex + index)} 
            />
          </div>
        ))}


        <button
          onClick={goToPrev}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-xl text-gray-800 z-10"
        >
          &#60;
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-xl text-gray-800 z-10"
        >
          &#62;
        </button>
      </div>

<div className="flex flex-wrap justify-center mt-6 space-x-4 space-y-4">
  {images.map((image, index) => (
    <div
      key={index}
      className={`cursor-pointer border-2 ${activeIndex === index ? "border-black" : "border-transparent"}`} 
      onClick={() => openModal(index)}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="w-24 h-24 object-cover rounded-lg transition-all" 
      />
    </div>
  ))}
</div>


  
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleOverlayClick} 
        >
          <div className="relative max-w-5xl w-full p-4" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl font-bold"
            >
              &#10005;
            </button>
            <div className="flex justify-center items-center">
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-xl text-gray-800"
              >
                &#60;
              </button>
              <img
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-xl text-gray-800"
              >
                &#62;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
