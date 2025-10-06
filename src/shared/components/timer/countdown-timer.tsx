import { useState, useEffect } from "react";
import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
} from "date-fns";
import "./countdown-timer.css";

interface CountdownTimerProps {
  targetDate: Date;
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      if (now >= targetDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = differenceInDays(targetDate, now);
      const hours = differenceInHours(targetDate, now) % 24;
      const minutes = differenceInMinutes(targetDate, now) % 60;
      const seconds = differenceInSeconds(targetDate, now) % 60;

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown-timer">
      <div className="timer-unit">
        <span className="timer-label">Days</span>
        <span className="timer-number">
          {String(timeLeft.days).padStart(2, "0")}
        </span>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-unit">
        <span className="timer-label">Hours</span>
        <span className="timer-number">
          {String(timeLeft.hours).padStart(2, "0")}
        </span>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-unit">
        <span className="timer-label">Minutes</span>
        <span className="timer-number">
          {String(timeLeft.minutes).padStart(2, "0")}
        </span>
      </div>
      <span className="timer-separator">:</span>
      <div className="timer-unit">
        <span className="timer-label">Seconds</span>
        <span className="timer-number">
          {String(timeLeft.seconds).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
