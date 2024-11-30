"use server";

import { getDevices } from "@/lib/userFunctions";
import { getServerSession } from "next-auth";
import BreakVerifier from "../_components/BreakVerifier";
import { options } from "../api/auth/[...nextauth]/options";
import DeviceSelector from "../_components/DeviceSelector";

export default async function Autoplay({
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

  const session = await getServerSession(options);
  const accessToken = session?.user?.accessToken ?? null;
  const availableDevices = await getDevices(accessToken);

  return (
    <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-xl font-bold">Class Schedule</div>
        <p>Start Time: {startTime}</p>
        <p>Class Duration: {classDuration} minutes</p>
        <p>Break Duration: {breakDuration} minutes</p>
        <p>Number of Breaks: {breakNumber}</p>
      </div>
      <BreakVerifier
        startTime={startTime}
        classDuration={classDuration}
        breakDuration={breakDuration}
        breakNumber={breakNumber}
        id={playlistId}
      />
      {availableDevices.devices.length > 0 ? (
        <DeviceSelector availableDevices={availableDevices} />
      ) : (
        <h1>
          No playback devices were found. Please ensure that the device you wish
          to use as your speaker has Spotify running.
        </h1>
      )}
    </div>
  );
}
