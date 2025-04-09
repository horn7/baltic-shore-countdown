import { useMemo, useState, useEffect } from "react";
import CountdownTimer from "../components/CountdownTimer";

const Index = () => {
  const targetDate = useMemo(() => new Date("April 28, 2025 00:00:00"), []);
  
  // Lista dostępnych zdjęć
  const images = [
    "yogi.jpeg", 
    "ola.jpeg", 
    "miedzy.jpeg", 
    "kaja-ola.jpeg",
    "ola-marta.jpeg"
  ];

  // Losowy obraz na początku
  const getRandomImage = () => images[Math.floor(Math.random() * images.length)];

  // Stan do trzymania aktualnego obrazu
  const [currentImage, setCurrentImage] = useState(getRandomImage);
  const [isFading, setIsFading] = useState(false);
  
  // Ustawiamy interwał do zmiany zdjęć co 5 sekund
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Rozpocznij fade-out
      setTimeout(() => {
        setCurrentImage(prev => {
          const currentIndex = images.indexOf(prev);
          const nextIndex = (currentIndex + 1) % images.length;
          return images[nextIndex];
        });
        setIsFading(false); // Zakończ fade-in po zmianie obrazu
      }, 2000); // Fade trwa 2 sekundę
    }, 20000); // Zmiana co 20 sekund

    return () => clearInterval(interval); // Czyszczenie interwału po zakończeniu
  }, []);
  
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-montserrat">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-2000"
        style={{ 
          backgroundImage: `url(${currentImage})`,
          filter: "brightness(0.9)"
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/10"></div>
      
      {/* Content Container */}
      <div className="relative z-20 px-6 py-10 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-light text-white mb-6 text-center">
            <span className="font-semibold"><br /><br /><br /><br /><br /><br />Międzyzdroje</span><br />
          </h1>
          
          <div className="backdrop-blur-md bg-white/30 rounded-xl p-8 md:p-12 shadow-lg border border-white/20 animate-pulse-soft">
            <h2 className="text-xl md:text-2xl text-center text-white mb-8">
              Do wyjazdu zostało:
            </h2>
            
            <CountdownTimer targetDate={targetDate} className="text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
