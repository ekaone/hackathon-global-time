"use client";

import { useState, useEffect } from "react";
import { DateTime } from "luxon";

interface CountdownTimerProps {
  targetDate: DateTime;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
  });
  const [isPast, setIsPast] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = DateTime.now();
      const diff = targetDate.diff(now, [
        "days",
        "hours",
        "minutes",
        "seconds",
        "milliseconds",
      ]);

      if (diff.milliseconds < 0) {
        // Deadline has passed
        setTimeRemaining({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
        });
        setIsPast(true);
        return;
      }

      setIsPast(false);
      setTimeRemaining({
        days: Math.floor(diff.days),
        hours: Math.floor(diff.hours),
        minutes: Math.floor(diff.minutes),
        seconds: Math.floor(diff.seconds),
        milliseconds: Math.floor(diff.milliseconds),
      });
    };

    // Initial calculation
    calculateTimeRemaining();

    // Update every 10ms for smooth millisecond display
    const intervalId = setInterval(calculateTimeRemaining, 10);

    return () => clearInterval(intervalId);
  }, [targetDate]);

  const formatNumber = (num: number, digits: number) => {
    return num.toString().padStart(digits, "0");
  };

  return (
    <div className="mb-12 text-center">
      <h2 className="text-xl mb-4 text-[#e8d8c3]">
        TIME {isPast ? "ELAPSED" : "REMAINING"}
      </h2>
      {isPast ? (
        <div className="text-2xl md:text-3xl font-bold text-[#e8d8c3]">
          This event has already occurred
        </div>
      ) : (
        <>
          <div className="flex justify-center items-center flex-wrap gap-2 md:gap-4">
            <TimeUnit value={timeRemaining.days} label="DAYS" />
            <Separator />
            <TimeUnit value={timeRemaining.hours} label="HOURS" />
            <Separator />
            <TimeUnit value={timeRemaining.minutes} label="MINUTES" />
            <Separator />
            <TimeUnit value={timeRemaining.seconds} label="SECONDS" />
            <Separator />
            <div className="flex flex-col items-center">
              <div className="text-xl text-[#e8d8c3] md:text-2xl font-bold font-mono">
                {formatNumber(timeRemaining.milliseconds, 3)}
              </div>
              <div className="text-xs text-[#e8d8c3] opacity-70">
                MILLISECONDS
              </div>
            </div>
          </div>
          <div className="mt-6 text-sm text-[#e8d8c3] opacity-70">
            Target: {targetDate.toLocal().toFormat("MMMM dd, yyyy HH:mm:ss")}{" "}
            {targetDate.toLocal().toFormat("ZZZZ")}
          </div>
        </>
      )}
    </div>
  );
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-3xl md:text-5xl font-bold font-mono bg-gradient-to-b from-[#f5f5dc] to-[#e8d8c3] text-transparent bg-clip-text">
        {value.toString().padStart(2, "0")}
      </div>
      <div className="text-xs text-[#e8d8c3] opacity-70">{label}</div>
    </div>
  );
}

function Separator() {
  return (
    <div className="text-3xl md:text-5xl font-bold text-[#e8d8c3] animate-pulse">
      :
    </div>
  );
}
