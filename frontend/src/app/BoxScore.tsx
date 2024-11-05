import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

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
  const [activeFilterPosition, setActiveFilterPosition] = useState<Position | null>(null)

  const teamButton = function (team: Team) {
    const variant = team == selectedTeam ? "primary" : "outline-primary"
    return <Button variant={variant} onClick={() => setSelectedTeam(team)}>{team.name}</Button>;  
  }

  const filterPositions = function () {
    let positions: Position[];
    positions = ["PG", "SG", "SF", "PF", "C"]
  
    return (
      <Dropdown>
        <Dropdown.Toggle variant="dark">
          Filter positions
        </Dropdown.Toggle>
  
        <Dropdown.Menu>
          {positions.map((position) => (
            <Dropdown.Item key={position} onClick={() => setActiveFilterPosition(position)}>
              {position}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }

  const stats = selectedTeam.stats.filter((player) => 
    !activeFilterPosition || player.position == activeFilterPosition
  )

  return ( 
    <Card bg="light" className="my-4 cursor-pointer">
      <Card.Header className="cursor-pointer" onClick={() => toggleExpanded(!isExpanded)}>
        <h4>{awayTeam.name} at {homeTeam.name}</h4>
      </Card.Header>
      {isExpanded &&
          <Card.Body>
            <div>
              <Row className="my-2">
                <Col>
                  {teamButton(homeTeam)}
                </Col>
                <Col>
                  {teamButton(awayTeam)}
                </Col>
              </Row>
              <div className="text-left my-2">
                {filterPositions()}
              </div>
              {boxScore(stats)}
            </div>
        </Card.Body>
      }
    </Card>
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



