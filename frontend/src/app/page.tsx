"use client";

import Image from "next/image";
import { useState } from "react";
import { gameList } from "./GameList";

export default function Home() {
  return (
    <div className="row text-center">
      <div className="col-4 offset-4">
        {gameList()}
      </div>
    </div>
  );
}
