import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User2, ChevronRight } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfileCard({
  username,
  img,
}: {
  username: string | null | undefined;
  img: string | null | undefined;
}) {
  return (
    <Card className="flex h-16 items-center gap-4 border border-muted bg-background p-3 hover:bg-accent">
      {username && img ? (
        <Avatar className="h-10 w-10 rounded-sm">
          <AvatarImage src={img} alt="Profile Picture" />
          <AvatarFallback className="rounded-sm">
            {username.charAt(0)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-secondary">
          <User2 className="h-5 w-5 text-secondary-foreground" />
        </div>
      )}

      <CardHeader className="space-y-0 p-0">
        <CardTitle className="self-start text-base font-medium">
          {username || "Profile"}
        </CardTitle>
        <CardDescription className="text-xs text-muted-foreground">
          {username && img ? "View Profile" : "to view profile"}
        </CardDescription>
      </CardHeader>

      <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
    </Card>
  );
}
