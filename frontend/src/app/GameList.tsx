import { BoxScore, Team } from "./BoxScore";
import { getGames } from "./api";
import { useState, useEffect } from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export type Game = { 
  homeTeam: Team 
  awayTeam: Team
}

export function Games() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
      getGames()
      .then(response => {
        setGames(response);
      })
  }, []);


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
