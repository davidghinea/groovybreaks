import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { User2 } from "lucide-react";

import Image from "next/image";

export default function ProfileCard({
  username,
  img,
}: {
  username: string | null | undefined;
  img: string | null | undefined;
}) {
  return (
    <Card className="flex h-[100%] w-[100%] items-center pl-8">
      {username && img ? (
        <Image
          src={img}
          alt="Profile Picture"
          width={56}
          height={56}
          className="flex h-[56px] w-[56px] items-center justify-center rounded-full outline outline-1 outline-muted"
        />
      ) : (
        <div className="flex h-[56px] w-[56px] items-center justify-center rounded-full outline outline-1 outline-muted">
          <User2 className="h-[28px] w-[28px]" />
        </div>
      )}

      <Separator orientation="vertical" className="ml-6 mr-6 h-7" />

      <CardHeader className="pl-0">
        <CardTitle>{username ? username : "Profile"}</CardTitle>
        <CardDescription>
          {username ? "View Profile" : "Log in to view profile."}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
