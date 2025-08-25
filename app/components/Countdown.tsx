import { useState, useEffect } from "react";
import { config } from "@/lib/config";

const CountdownTimer = () => {
  const calculateTimeLeft = () => {
    // Use the date from config, which is set to September 28, 2025
    const targetDate = new Date(config.eventDate);
    const now = new Date();
    const difference = Number(targetDate) - Number(now);

    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div className="flex justify-center space-x-6 sm:space-x-8 mt-6 text-center font-legan">
      <div className="flex flex-col">
        <span className="text-4xl sm:text-5xl font-bold">{timeLeft.days}</span>
        <span className="text-xs uppercase tracking-wide mt-1 opacity-90">DAYS</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl sm:text-5xl font-bold">{timeLeft.hours}</span>
        <span className="text-xs uppercase tracking-wide mt-1 opacity-90">HOURS</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl sm:text-5xl font-bold">{timeLeft.minutes}</span>
        <span className="text-xs uppercase tracking-wide mt-1 opacity-90">MINUTES</span>
      </div>
      <div className="flex flex-col">
        <span className="text-4xl sm:text-5xl font-bold">{timeLeft.seconds}</span>
        <span className="text-xs uppercase tracking-wide mt-1 opacity-90">SECONDS</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
