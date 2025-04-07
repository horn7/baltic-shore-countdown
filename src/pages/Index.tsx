
import { useMemo } from "react";
import CountdownTimer from "../components/CountdownTimer";

const Index = () => {
  const targetDate = useMemo(() => new Date("April 28, 2025 00:00:00"), []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-center justify-center font-montserrat">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: "url('miedzy.jpeg')",
          filter: "brightness(0.9)"
        }}
      ></div>
      
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-black/10"></div>
      
      {/* Content Container */}
      <div className="relative z-20 px-6 py-10 w-full max-w-4xl">
        <div className="flex flex-col items-center">
          <h1 className="text-3xl md:text-5xl font-light text-white mb-6 text-center">
            <span className="font-semibold">Międzyzdroje</span><br /><small>here we go again</small>
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
