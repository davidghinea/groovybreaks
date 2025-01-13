"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BreakIllustration from "@/public/illustrations/whyIllustration.svg";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { currentlyPlayingType } from "@/lib/types";

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
  const [currentlyPlaying, setCurrentlyPlaying] =
    useState<currentlyPlayingType>({
      progress_ms: 0,
      albumImage: "https://via.placeholder.com/300", // placeholder image - to do: replace with custom image
      artistName: "Unknown Artist",
      duration_ms: 0,
      trackName: "Unknown Track",
    });
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

  async function getPlayback() {
    try {
      const response = await fetch("/api/getPlayback", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setCurrentlyPlaying({
        progress_ms: data.progress_ms,
        albumImage: data.item.album.images[0].url,
        artistName: data.item.album.artists[0].name,
        duration_ms: data.item.duration_ms,
        trackName: data.item.name,
      });
    } catch (error) {
      console.error("Error fetching playback status:", error);
      throw error;
    }
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
            getPlayback();
          } else {
            GenerateAndResume(deviceId);
            getPlayback();
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

  useEffect(() => {
    if (isBreakOngoing) {
      const playbackInterval = setInterval(() => {
        getPlayback();
      }, 1000);

      return () => clearInterval(playbackInterval);
    }
  }, [isBreakOngoing]);
  // this seems unnecessary, but without it if someone changes the song within Spotify, we would not be able to tell.
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
                          src={currentlyPlaying.albumImage}
                          alt={currentlyPlaying.trackName}
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <p className="text-lg font-semibold">
                          {currentlyPlaying.trackName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {currentlyPlaying.artistName}
                        </p>
                        <div className="mt-2 h-1 w-36 rounded-full bg-secondary">
                          <Progress
                            value={
                              currentlyPlaying.progress_ms
                                ? (currentlyPlaying.progress_ms * 100) /
                                  currentlyPlaying.duration_ms
                                : 0
                            }
                            className="h-1 rounded-full bg-primary"
                          />
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">
                          {currentlyPlaying.progress_ms
                            ? `${Math.floor(currentlyPlaying.progress_ms / 60000)}:${String(
                                Math.floor(
                                  (currentlyPlaying.progress_ms % 60000) / 1000,
                                ),
                              ).padStart(
                                2,
                                "0",
                              )} / ${Math.floor(currentlyPlaying.duration_ms / 60000)}:${String(
                                Math.floor(
                                  (currentlyPlaying.duration_ms % 60000) / 1000,
                                ),
                              ).padStart(2, "0")}`
                            : `- / ${Math.floor(currentlyPlaying.duration_ms / 60000)}:${String(
                                Math.floor(
                                  (currentlyPlaying.duration_ms % 60000) / 1000,
                                ),
                              ).padStart(2, "0")}`}
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
                  Waiting for Break
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
                  All done for today
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
