"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { SpotifyIcon } from "@/public/icons/spotify-icon";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  const handleSpotifySignIn = async () => {
    await signIn("spotify");
  };
  return (
    <Button
      className="w-full bg-primary text-muted transition-colors hover:bg-primary/90"
      onClick={handleSpotifySignIn}
    >
      <SpotifyIcon className="mr-2 h-5 w-5" />
      Sign in with Spotify
    </Button>
  );
};

export default SignInButton;
