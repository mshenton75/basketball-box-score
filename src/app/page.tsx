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
