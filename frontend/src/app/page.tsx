"use client";

import { BoxScore, Game} from "./BoxScore";
import { getGames } from "./api";
import { useState, useEffect } from "react";

export default function Home() {
  return (<Games/>);
}

function Games() {
  const [games, setGames] = useState<Game[]>([])
  const [selectedGame, setSelectedGame] = useState<Game | null>()

  useEffect(() => {
      getGames()
      .then(response => {
        setGames(response);
      })
  }, []);

  return (
    <div className="row">
      <div className="col-auto">
        <ul className="px-0">
          {games.map((game, idx) => (
            <li 
              key={idx} 
              className ="border" 
              onClick={() => game.status !== "scheduled" && setSelectedGame(game)}
            > 
              <div className="p-4">
                <h4>{game.awayTeam.name} at {game.homeTeam.name}</h4>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="col">
        {selectedGame && <BoxScore {...selectedGame}></BoxScore>}
      </div>
    </div>
  )
}
