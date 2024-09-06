// Timer.js
import React, { useState, useEffect, useCallback } from 'react';

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const handleTimeUp = useCallback(() => {
    if (onTimeUp) onTimeUp();
  }, [onTimeUp]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleTimeUp]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="text-3xl font-bold text-red-500 mb-6">
      Time Left: {formatTime(timeLeft)}
    </div>
  );
};

export default Timer;
