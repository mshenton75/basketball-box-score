import { useState, useEffect } from "react";
import { getGame } from "./api";
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export type Game = { 
  homeTeam: Team 
  awayTeam: Team
  id: string,
  status: GameStatus
}

export type GameStatus = "scheduled" | "in-progress" | "final" | "postponed"

export type Team = {
  name: string,
  id: string
}

export type PlayerStats = {
  name: string,
  position: Position,
  points: number,
  rebounds: number, 
  assists: number,
}

type Position = "PG" | "SG" | "SF" | "PF" | "C" | "BN"

export function BoxScore({ homeTeam, awayTeam, id }:  Game) {
  const [selectedTeam, setSelectedTeam] = useState<Team>(homeTeam)
  const [stats, setStats] = useState<{ homeTeam: PlayerStats[], awayTeam: PlayerStats[] } | undefined>(undefined)
  
  useEffect(() => {
      getGame(id)
      .then(response => {
        setStats(response);
      })
  }, []);

  const teamButton = function (team: Team) {
    const variant = team.id == selectedTeam.id ? "primary" : "outline-primary"
    return <Button variant={variant} onClick={() => setSelectedTeam(team)}>{team.name}</Button>;  
  }
  const activeStats = stats && (selectedTeam.id == homeTeam.id ? stats.homeTeam : stats.awayTeam)

  return ( 
    <div>{activeStats && boxScore(activeStats)}</div>
  )
}

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
