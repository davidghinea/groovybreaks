"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AvailableDevices } from "@/lib/types";

const DeviceSelector = ({
  availableDevices,
}: {
  availableDevices: AvailableDevices;
}) => {
  const router = useRouter();
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>("");

  useEffect(() => {
    if (!selectedDeviceId && availableDevices.devices.length > 0) {
      const firstDeviceId = availableDevices.devices[0].id;
      if (firstDeviceId) {
        setSelectedDeviceId(firstDeviceId);
        updateSearchParams(firstDeviceId);
      }
    }
  }, [availableDevices, selectedDeviceId]);

  const updateSearchParams = (deviceId: string) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("deviceId", deviceId);
    router.push(`${window.location.pathname}?${currentParams.toString()}`);
  };

  const handleSelect = (deviceId: string) => {
    setSelectedDeviceId(deviceId);
    updateSearchParams(deviceId);
  };

  return (
    <Select onValueChange={handleSelect} value={selectedDeviceId}>
      <SelectTrigger className="w-[500px]">
        <SelectValue placeholder="Select Device" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Available Devices</SelectLabel>
          {availableDevices.devices
            .filter((device) => device.id !== null)
            .map((device) => (
              <SelectItem
                key={device.id ?? ""}
                value={device.id ?? ""}
                className={device.is_active ? "bg-pink" : "bg-blue"}
              >
                {device.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DeviceSelector;
