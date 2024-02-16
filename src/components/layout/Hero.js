"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Hero() {
  const [imageSrc, setImageSrc] = useState("/hookah1.webp");

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 600) {
        setImageSrc("/hookah-mob.webp");
      } else if (window.innerWidth < 1000) {
        setImageSrc("/hookah-laptop.webp");
      } else {
        setImageSrc("/hookah1.webp");
      }
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative h-[580px] lg:h-[700px]">
      <Image
        alt="hookah main"
        fill
        className="h-full w-full object-cover"
        src={imageSrc}
      />
    </section>
  );
}
