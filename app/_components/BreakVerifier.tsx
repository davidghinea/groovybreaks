"use client";

import { useEffect, useState } from "react";

export default function BreakVerifier({
  startTime,
  classDuration,
  breakDuration,
  breakNumber,
  id,
  deviceId,
}: {
  startTime: string;
  classDuration: number;
  breakDuration: number;
  breakNumber: number;
  id: string;
  deviceId: string;
}) {
  async function GenerateAndPlay(
    playlistId: string,
    offsetPosition: number,
    positionMs: number,
    deviceId: string,
  ): Promise<void> {
    await fetch("/api/playTrack", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        playlistId,
        offsetPosition,
        positionMs,
        deviceId,
      }),
    });
    // fetch my own api, pass it the necessary fields in the body and it will generate the accesstoken within the api route
    // view the api route for more details
  }

  async function GenerateAndPause(): Promise<void> {
    await fetch("/api/pauseTrack", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // fetch my own api, where it generates the accesstoken within the api route
    // view the api route for more details
  }

  async function GenerateAndResume(deviceId: string): Promise<void> {
    await fetch("/api/resumeTrack", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        deviceId,
      }),
    });
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

      breaks.forEach((breakTime, index) => {
        if (
          currentTime === breakTime.breakStart &&
          !loggedBreaks.has(breakTime.breakStart)
        ) {
          if (index === 0) {
            GenerateAndPlay(id, 0, 0, deviceId);
          } else {
            GenerateAndResume(deviceId);
          }
          setLoggedBreaks((prev) => new Set(prev).add(breakTime.breakStart));
        }
        if (
          currentTime === breakTime.breakEnd &&
          loggedBreaks.has(breakTime.breakStart)
        ) {
          GenerateAndPause();
          setLoggedBreaks((prev) => {
            const updated = new Set(prev);
            updated.delete(breakTime.breakStart);
            return updated;
          });
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
