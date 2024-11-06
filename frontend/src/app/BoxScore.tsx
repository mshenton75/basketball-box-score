import { useState, useEffect } from "react";
import { getGame } from "./api";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
  position: Position | null,
  points: number,
  rebounds: number, 
  assists: number,
}

type Position = "PG" | "SG" | "SF" | "PF" | "C"

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
    // <Card bg="light" className="my-4 cursor-pointer">
    //   <Card.Header className="cursor-pointer" onClick={() => toggleExpanded(!isExpanded)}>
    //     <h4>{awayTeam.name} at {homeTeam.name}</h4>
    //   </Card.Header>
    //   {isExpanded &&
    //       <Card.Body>
    //         <div>
    //           <Row className="my-2">
    //             <Col>
    //               {teamButton(homeTeam)}
    //             </Col>
    //             <Col>
    //               {teamButton(awayTeam)}
    //             </Col>
    //           </Row>
    //           {activeStats && boxScore(activeStats)}
    //         </div>
    //     </Card.Body>
    //   }
    // </Card>
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
