"use client";

import Image from "next/image";
import { useState } from "react";
import { GameList } from "./GameList";

export default function Home() {
  return (
    <div className="row text-center">
      <div className="col-4 offset-4">
        <GameList />
      </div>
    </div>
  );
}


// function Button() {
// //   const [numClicks, setNumClicks] = useState<number | undefined >(undefined);

// //   return (
// //     <button 
// //       className="rounded bg-black text-white p-4"
// //       onClick={() => setNumClicks(numClicks === undefined ? 0 : numClicks + 1)}
// //     >
// //       Clicked {numClicks}
// //     </button>
// //   )
// // }