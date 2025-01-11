"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BreakIllustration from "@/public/illustrations/whyIllustration.svg";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

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
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
      const now = new Date();
      const currentTimeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      breaks.forEach((breakTime, index) => {
        if (
          currentTimeStr === breakTime.breakStart &&
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
          currentTimeStr === breakTime.breakEnd &&
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
    }, 1000);

    return () => clearInterval(interval);
  }, [breaks, loggedBreaks]);

  const isBreakOngoing = breaks.some((breakTime) => {
    const [breakStartHours, breakStartMinutes] = breakTime.breakStart
      .split(":")
      .map(Number);
    const [breakEndHours, breakEndMinutes] = breakTime.breakEnd
      .split(":")
      .map(Number);

    const breakStart = new Date(currentTime);
    breakStart.setHours(breakStartHours, breakStartMinutes, 0, 0);

    const breakEnd = new Date(currentTime);
    breakEnd.setHours(breakEndHours, breakEndMinutes, 0, 0);

    return currentTime >= breakStart && currentTime <= breakEnd;
  });

  const nextBreak = breaks.find((breakTime) => {
    const [breakStartHours, breakStartMinutes] = breakTime.breakStart
      .split(":")
      .map(Number);
    const breakStart = new Date(currentTime);
    breakStart.setHours(breakStartHours, breakStartMinutes, 0, 0);
    return currentTime < breakStart;
  });

  return (
    <div className="flex flex-col items-center justify-center px-4 pb-4 sm:px-6 md:overflow-hidden">
      <div className="w-full max-w-2xl overflow-hidden">
        <div className="flex flex-col items-center gap-6 p-4 sm:gap-8 sm:p-6 md:flex-row md:p-8">
          <div className="flex justify-center md:w-1/2">
            <Image
              src={BreakIllustration}
              alt="Break Illustration"
              className="h-auto w-[300px] max-w-3xl md:w-full"
              priority
            />
          </div>
          <div className="w-full space-y-4 sm:space-y-6 md:w-1/2">
            {isBreakOngoing ? (
              <>
                <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl md:text-left">
                  Break Time!
                </h1>
                <div className="flex items-center space-x-4">
                  {true ? (
                    <>
                      <div className="relative h-20 w-20 overflow-hidden rounded-lg shadow-lg">
                        <Image
                          src="https://upload.wikimedia.org/wikipedia/en/4/45/Skyfall_cover.png"
                          alt="Skyfall by Adele"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">Skyfall</p>
                        <p className="text-sm text-muted-foreground">Adele</p>
                        <div className="mt-2 h-1 w-48 rounded-full bg-secondary">
                          <Progress
                            value={50}
                            className="h-1 rounded-full bg-primary"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Skeleton className="h-20 w-20" />
                      <div className="flex flex-col">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="mt-2 h-4 w-16" />
                        <Skeleton className="mt-2 h-2 w-48 rounded-full" />
                      </div>
                    </>
                  )}
                </div>
              </>
            ) : nextBreak ? (
              <>
                <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl md:text-left">
                  Waiting for Break...
                </h1>
                <p className="text-center text-lg sm:text-xl md:text-left">
                  There's nothing more to do. Relax and wait for your upcoming
                  break!
                </p>
                <div className="space-y-2">
                  <p className="text-center text-base font-semibold sm:text-lg md:text-left">
                    Next Break:
                  </p>
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <Clock className="w-5 text-muted-foreground" />
                    <span className="text-sm sm:text-base">
                      Starts: {nextBreak?.breakStart}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-2 md:justify-start">
                    <Clock className="w-5 text-muted-foreground" />
                    <span className="text-sm sm:text-base">
                      Ends: {nextBreak?.breakEnd}
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl md:text-left">
                  All done for today!
                </h1>
                <p className="text-center text-lg sm:text-xl md:text-left">
                  There are no more classes scheduled for today.
                </p>
              </>
            )}
            <div className="space-y-4">
              <Button
                variant="outline"
                className="w-full py-2 text-sm sm:py-3 sm:text-base"
              >
                <Calendar className="mr-2 h-4 w-4" /> View Schedule
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
