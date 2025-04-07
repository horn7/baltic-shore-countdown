import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  targetDate: Date;
  className?: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate, className }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [animationFlags, setAnimationFlags] = useState({
    days: false,
    hours: false,
    minutes: false,
    seconds: false
  });

  // Calculate the time left initially and set interval to update every second
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;

      if (diff >= 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        const newTime = { days, hours, minutes, seconds };

        const updatedFlags = {
          days: newTime.days !== timeLeft.days,
          hours: newTime.hours !== timeLeft.hours,
          minutes: newTime.minutes !== timeLeft.minutes,
          seconds: newTime.seconds !== timeLeft.seconds
        };

        setTimeLeft(newTime);
        setAnimationFlags(updatedFlags);

        setTimeout(() => {
          setAnimationFlags({ days: false, hours: false, minutes: false, seconds: false });
        }, 400); // Duration of animation ~400ms
      }
    };

    // Initial calculation and setInterval
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    // Cleanup interval when the component unmounts
    return () => clearInterval(timer);
  }, [targetDate]); // Only depend on targetDate, avoid dependency on timeLeft

  const TimeUnit: React.FC<{ value: number; label: string; animate: boolean }> = ({ value, label, animate }) => (
    <div className="flex flex-col items-center mx-2 sm:mx-4">
      <div className="relative h-20 w-15 overflow-hidden flex justify-center items-center">
        <span
          className={cn(
            "text-5xl font-semibold transition-transform duration-400",
            animate && "animate-slide"
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
      <TimeUnit value={timeLeft.days} label="Dni" animate={animationFlags.days} />
      <TimeUnit value={timeLeft.hours} label="Godzin" animate={animationFlags.hours} />
      <TimeUnit value={timeLeft.minutes} label="Minut" animate={animationFlags.minutes} />
      <TimeUnit value={timeLeft.seconds} label="Sekund" animate={animationFlags.seconds} />
    </div>
  );
};

export default CountdownTimer;
