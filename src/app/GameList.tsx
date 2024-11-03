import { BoxScore, Team } from "./BoxScore";

export function gameList() {
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
  homeTeam: Team;
  awayTeam: Team;

  constructor(homeTeam: string, awayTeam: string) {
    this.homeTeam = {
      name: homeTeam,
      // TODO: NBA-16: Use real game data
      stats: [
        {
          name: "LeBron James",
          position: "SF",
          points: 25,
          rebounds: 11, 
          assists: 5
        },
        {
          name: "Anthony Davis",
          position: "C",
          points: 33,
          rebounds: 14, 
          assists: 2
        },
        {
          name: "Austin Reeves",
          position: "SG",
          points: 13,
          rebounds: 6, 
          assists: 3
        }
      ]
    }
    this.awayTeam = {
      name: awayTeam,
      stats:  [
        {
          name: "Kevin Durant",
          position: "SF",
          points: 22,
          rebounds: 7, 
          assists: 3
        },
        {
          name: "Devin Booker",
          position: "SG",
          points: 27,
          rebounds: 4, 
          assists: 9
        }
      ]
    }
  }
}