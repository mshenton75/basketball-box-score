"use client";

import Image from "next/image";
import { useState } from "react";

export default function Home() {
  return (
    <div className="text-center mt-8">
      <Button />
    </div>
  );
}


function Button() {
  const [numClicks, setNumClicks] = useState<number | undefined >(undefined);

  return (
    <button 
      className="rounded bg-black text-white p-4"
      onClick={() => setNumClicks(numClicks === undefined ? 0 : numClicks + 1)}
    >
      Clicked {numClicks}
    </button>
  )
}