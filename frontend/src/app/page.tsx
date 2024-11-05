"use client";

import { Games } from "./GameList";

export default function Home() {
  return (
    <div className="row text-center">
      <div className="col-4 offset-4">
        <Games/>
      </div>
    </div>
  );
}
