"use client";

import { useEffect, useState } from "react";

export default function BreakVerifier({
  startTime,
  classDuration,
  breakDuration,
  breakNumber,
  id,
}: {
  startTime: string;
  classDuration: number;
  breakDuration: number;
  breakNumber: number;
  id: string;
}) {
  // Calculate break times
  const calculateNextBreaks = () => {
    const [hours, minutes] = startTime.split(":").map(Number);
    let currentTime = new Date();
    currentTime.setHours(hours, minutes, 0, 0);

    const breaks = [];
    // Calculate the specified number of breaks
    for (let i = 0; i < breakNumber; i++) {
      // Add class duration to get break start
      let breakStart = new Date(currentTime.getTime() + classDuration * 60000);
      // Add break duration to get break end
      let breakEnd = new Date(breakStart.getTime() + breakDuration * 60000);

      breaks.push({
        breakStart: `${String(breakStart.getHours()).padStart(2, "0")}:${String(breakStart.getMinutes()).padStart(2, "0")}`,
        breakEnd: `${String(breakEnd.getHours()).padStart(2, "0")}:${String(breakEnd.getMinutes()).padStart(2, "0")}`,
      });

      // Set current time to break end to calculate next period
      currentTime = new Date(breakEnd.getTime());
    }
    return breaks;
  };

  const breaks = calculateNextBreaks();
  const [loggedBreaks, setLoggedBreaks] = useState(new Set());

  // Set up an interval to check the current time against breakStart times
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      breaks.forEach((breakTime) => {
        if (
          currentTime === breakTime.breakStart &&
          !loggedBreaks.has(breakTime.breakStart)
        ) {
          console.log(
            `It's time for a break! Break starts at ${breakTime.breakStart}`,
          );
          setLoggedBreaks((prev) => new Set(prev).add(breakTime.breakStart));
        }
      });
    }, 1000); // Check every second

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [breaks, loggedBreaks]);
  return (
    <div className="mt-4">
      <div className="font-semibold">Upcoming Breaks:</div>
      {breaks.map((breakTime, index) => (
        <div key={index} className="mt-2">
          <p>Break {index + 1}:</p>
          <p>Starts: {breakTime.breakStart}</p>
          <p>Ends: {breakTime.breakEnd}</p>
        </div>
      ))}
    </div>
  );
}