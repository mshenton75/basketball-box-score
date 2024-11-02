import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export type Team = {
  name: string,
  stats: PlayerStats[]
}

type PlayerStats = {
  name: string,
  position: Position,
  points: number,
  rebounds: number, 
  assists: number,
}

type Position = "PG" | "SG" | "SF" | "PF" | "C"

export function BoxScore({ awayTeam, homeTeam }:  { awayTeam: Team; homeTeam: Team }) {

  const [isExpanded, toggleExpanded] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team>(homeTeam)

  const teamButton = function (team: Team) {
    const variant = team == selectedTeam ? "primary" : "outline-primary"
    return <Button className="mx-2" variant={variant} onClick={() => setSelectedTeam(team)}>{team.name}</Button>;  
  }

  return ( 
    <Card bg="light" className="my-4 cursor-pointer">
      <Card.Header className="cursor-pointer" onClick={() => toggleExpanded(!isExpanded)}>{awayTeam.name} at {homeTeam.name}</Card.Header>
      {isExpanded &&
          <Card.Body>
            <div>
              <div className="d-flex my-2">
                {teamButton(homeTeam)}
                {teamButton(awayTeam)}
              </div>
              {boxScore(selectedTeam.stats)}
            </div>
        </Card.Body>
      }
    </Card>
  )
}

// TODO: NBA-16: Use real game data
function boxScore(stats: PlayerStats[]) {
  return ( 
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Player</th>
          <th>Position</th>
          <th>Points</th>
          <th>Assists</th>
          <th>Rebounds</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((playerStats) => (
          <tr key={playerStats.name}>
            <td>{playerStats.name}</td>
            <td>{playerStats.position}</td>
            <td>{playerStats.points}</td>
            <td>{playerStats.assists}</td>
            <td>{playerStats.rebounds}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
