import { useState } from "react";
import { v4 as uuid } from 'uuid';
import Card from 'react-bootstrap/Card';

export function GameList() {
  const [numClicks, setNumClicks] = useState<number | undefined >(undefined);
  // TODO: NBA-16: Use real game data
  const games = [
    new Game("Celtics", "Knicks"),
    new Game("Nuggets", "Lakers"),
    new Game("Suns", "Clippers")
  ]

  return ( 
    <ul>
      {games.map((game) => (
        <li key={game.uid}> 
          <Card bg="light" className="my-4">
            <Card.Body>
              <Card.Text>{game.awayTeam} at {game.homeTeam}</Card.Text>
            </Card.Body>
          </Card>
        </li>
      ))}
    </ul>
  )
}

class Game {
  homeTeam: string;
  awayTeam: string;
  uid: string;

  constructor(homeTeam: string, awayTeam: string) {
    this.homeTeam = homeTeam;
    this.awayTeam = awayTeam;
    this.uid = uuid();
  }
}