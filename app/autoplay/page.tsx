"use client";

import { useEffect, useState } from "react";

export default function Autoplay({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // validate required params exist
  if (
    !searchParams.startTime ||
    !searchParams.classDuration ||
    !searchParams.breakDuration ||
    !searchParams.breakNumber ||
    !searchParams.id
  ) {
    return (
      <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
        <p className="text-destructive">Missing required parameters</p>
      </div>
    );
  }

  const startTime = searchParams.startTime as string;
  const classDuration = parseInt(searchParams.classDuration as string);
  const breakDuration = parseInt(searchParams.breakDuration as string);
  const breakNumber = parseInt(searchParams.breakNumber as string);
  const playlistId = searchParams.id as string;

  // validate numeric values
  if (
    isNaN(classDuration) ||
    isNaN(breakDuration) ||
    isNaN(breakNumber) ||
    classDuration <= 0 ||
    breakDuration <= 0 ||
    breakNumber <= 0
  ) {
    return (
      <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
        <p className="text-destructive">
          Invalid duration or break number values
        </p>
      </div>
    );
  }

  // validate time format (HH:mm)
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(startTime)) {
    return (
      <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
        <p className="text-destructive">Invalid start time format</p>
      </div>
    );
  }

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
    <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-xl font-bold">Class Schedule</div>
        <p>Start Time: {startTime}</p>
        <p>Class Duration: {classDuration} minutes</p>
        <p>Break Duration: {breakDuration} minutes</p>
        <p>Number of Breaks: {breakNumber}</p>

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
      </div>
    </div>
  );
}
