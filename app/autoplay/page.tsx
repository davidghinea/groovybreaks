"use server";

import { getDevices } from "@/lib/userFunctions";
import { getServerSession } from "next-auth";
import BreakVerifier from "../_components/BreakVerifier";
import { options } from "../api/auth/[...nextauth]/options";
import DeviceSelector from "../_components/DeviceSelector";
import { SearchParamsType } from "@/lib/types";
import NotAuth from "../_components/NotAuth";

export default async function Autoplay({
  searchParams,
}: {
  searchParams: SearchParamsType;
}) {
  const session = await getServerSession(options);

  // Check if the user is authenticated
  if (!session?.user) {
    return <NotAuth />;
  }

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
        <p className="text-center text-destructive">
          Missing required parameters
        </p>
      </div>
    );
  }

  const startTime = searchParams.startTime as string;
  const classDuration = parseInt(searchParams.classDuration as string);
  const breakDuration = parseInt(searchParams.breakDuration as string);
  const breakNumber = parseInt(searchParams.breakNumber as string);
  const playlistId = searchParams.id as string;
  const deviceId = searchParams.deviceId as string;

  // validate numeric values

  if (isNaN(classDuration) || classDuration <= 0) {
    return (
      <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
        <p className="text-center text-destructive">
          Invalid class duration value
        </p>
      </div>
    );
  }

  if (isNaN(breakDuration) || breakDuration <= 0) {
    return (
      <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
        <p className="text-center text-destructive">
          Invalid break duration value
        </p>
      </div>
    );
  }

  if (isNaN(breakNumber) || breakNumber <= 0) {
    return (
      <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
        <p className="text-center text-destructive">
          Invalid break number value
        </p>
      </div>
    );
  }

  // validate time format (HH:mm)
  const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
  if (!timeRegex.test(startTime)) {
    return (
      <div className="flex h-[100dvh] w-[100dvw] items-center justify-center">
        <p className="text-center text-destructive">
          Invalid start time format
        </p>
      </div>
    );
  }

  // TO DO: make a separate component for these text-destructive errors, to display a better-styled page. Also improve messages so they are user friendly.

  const accessToken = session?.user?.accessToken ?? null;
  const availableDevices = await getDevices(accessToken);

  return (
    <div className="top-20 flex h-[100dvh] w-[100dvw] items-center justify-center overflow-hidden md:top-0">
      <div className="flex flex-col items-center justify-center rounded-lg p-6 shadow-2xl md:p-4">
        <BreakVerifier
          startTime={startTime}
          classDuration={classDuration}
          breakDuration={breakDuration}
          breakNumber={breakNumber}
          id={playlistId}
          deviceId={deviceId}
        />
        {availableDevices.devices.length > 0 && availableDevices ? (
          <DeviceSelector availableDevices={availableDevices} />
        ) : (
          <h1 className="text-center">
            No playback devices were found. Please ensure that the device you
            wish to use as your speaker has Spotify running.
          </h1>
        )}
      </div>
    </div>
  );
}
