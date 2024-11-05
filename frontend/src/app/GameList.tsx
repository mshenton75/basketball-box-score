import { BoxScore, Game} from "./BoxScore";
import { getGames } from "./api";
import { useState, useEffect } from "react";

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
          <BoxScore {...game}></BoxScore>
        </li>
      ))}
    </ul>
  )
}
