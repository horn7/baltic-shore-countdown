
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0
  });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        
        const newTimeLeft = { days, hours, minutes };
        
        // Trigger animation only when values change
        if (
          newTimeLeft.days !== timeLeft.days || 
          newTimeLeft.hours !== timeLeft.hours || 
          newTimeLeft.minutes !== timeLeft.minutes
        ) {
          setAnimate(true);
          setTimeout(() => setAnimate(false), 600); // Animation duration
        }
        
        setTimeLeft(newTimeLeft);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [targetDate, timeLeft]);

  const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center mx-4">
      <div className="flex relative h-20 overflow-hidden">
        <span 
          className={cn(
            "text-5xl font-semibold transition-all duration-500",
            animate && "animate-number-change"
          )}
        >
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-sm uppercase tracking-wider mt-1 opacity-80">{label}</span>
    </div>
  );

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <TimeUnit value={timeLeft.days} label="Dni" />
      <TimeUnit value={timeLeft.hours} label="Godzin" />
      <TimeUnit value={timeLeft.minutes} label="Minut" />
    </div>
  );
};

export default CountdownTimer;
