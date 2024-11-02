import { useState } from "react";
import { BoxScore } from "./BoxScore";

export function GameList() {
  // TODO: NBA-16: Use real game data
  const games = [
    new Game("Celtics", "Knicks"),
    new Game("Nuggets", "Lakers"),
    new Game("Suns", "Clippers")
  ]

  return ( 
    <ul>
      {games.map((game, idx) => (
        <li key={idx}> 
          <BoxScore awayTeam={game.awayTeam} homeTeam={game.homeTeam}></BoxScore>
        </li>
      ))}
    </ul>
  )
}

class Game {
  homeTeam: string;
  awayTeam: string;

  constructor(homeTeam: string, awayTeam: string) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
  }
}