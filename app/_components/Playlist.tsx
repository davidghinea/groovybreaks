import React from "react";
import Image from "next/image";

export default function Playlist({ img, name }: { img: string; name: string }) {
  return (
    <>
      <span>{name}</span>
      <Image src={img} width={128} height={128} alt="ceva" />
    </>
    // Needs to be styled...
  );
}
