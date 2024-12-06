"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowUpRight,
  Clock,
  TimerOff,
  Timer,
  ListOrdered,
} from "lucide-react";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SubmitPlaylist({
  playlistName,
  product,
}: {
  playlistName: string | null | undefined;
  product: string;
}) {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [startTime, setStartTime] = useState("");
  const [classDuration, setClassDuration] = useState("");
  const [breakDuration, setBreakDuration] = useState("");
  const [breakNumber, setBreakNumber] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = () => {
    if (!startTime || !classDuration || !breakDuration || !breakNumber) return;

    // create new URLSearchParams with existing parameters
    const newSearchParams = new URLSearchParams(searchParams.toString());

    // add our new parameters
    newSearchParams.set("startTime", startTime);
    newSearchParams.set("classDuration", classDuration);
    newSearchParams.set("breakDuration", breakDuration);
    newSearchParams.set("breakNumber", breakNumber);

    router.push(`/autoplay?${newSearchParams.toString()}`);
    setOpen(false);
  };

  return (
    <section className="my-8 flex min-w-[350px] max-w-[350px] items-center justify-between space-x-4 rounded-sm bg-secondary p-3 shadow-md md:min-w-[600px] md:max-w-[600px]">
      <span className="text-sm font-medium text-secondary-foreground">
        The playlist {playlistName ? `"${playlistName}"` : ""} has been selected
      </span>
      {product === "premium" ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90">
              Groovify my break
              <ArrowUpRight className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                Schedule Autoplay Times
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="startTime" className="flex items-center gap-2">
                  <Clock className="size-4" />
                  Classes Start Time
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="classDuration"
                  className="flex items-center gap-2"
                >
                  <Timer className="size-4" />
                  Class Duration (minutes)
                </Label>
                <div>
                  <Input
                    id="classDuration"
                    type="number"
                    min="1"
                    value={classDuration}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > 0) {
                        setClassDuration(e.target.value);
                      }
                    }}
                    className="col-span-3"
                  />
                  {parseInt(classDuration) <= 0 && (
                    <p className="mt-1 text-sm text-destructive">
                      Please enter a valid number.
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="breakDuration"
                  className="flex items-center gap-2"
                >
                  <TimerOff className="size-4" />
                  Break Duration (minutes)
                </Label>
                <div>
                  <Input
                    id="breakDuration"
                    type="number"
                    min="1"
                    value={breakDuration}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > 0) {
                        setBreakDuration(e.target.value);
                      }
                    }}
                    className="col-span-3"
                  />
                  {parseInt(breakDuration) <= 0 && (
                    <p className="mt-1 text-sm text-destructive">
                      Please enter a valid number.
                    </p>
                  )}
                </div>
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="breakNumber"
                  className="flex items-center gap-2"
                >
                  <ListOrdered className="size-4" />
                  Number of Breaks
                </Label>
                <div>
                  <Input
                    id="breakNumber"
                    type="number"
                    min="1"
                    value={breakNumber}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (value > 0) {
                        setBreakNumber(e.target.value);
                      }
                    }}
                    className="col-span-3"
                  />
                  {parseInt(breakNumber) <= 0 && (
                    <p className="mt-1 text-sm text-destructive">
                      Please enter a valid number.
                    </p>
                  )}
                </div>
              </div>
              <Button
                className="mt-2"
                onClick={handleSubmit}
                disabled={
                  !startTime ||
                  !classDuration ||
                  !breakDuration ||
                  !breakNumber ||
                  parseInt(classDuration) <= 0 ||
                  parseInt(breakDuration) <= 0 ||
                  parseInt(breakNumber) <= 0
                }
              >
                Save Schedule
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          className="flex items-center gap-2 bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          onClick={() => {
            toast({
              title: "Spotify Premium Required",
              description: "This feature is only available for premium users.",
            });
          }}
        >
          Groovify my break
          <ArrowUpRight className="size-4" />
        </Button>
      )}
    </section>
  );
}
