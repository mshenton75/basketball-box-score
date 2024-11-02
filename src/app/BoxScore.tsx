import { useState } from "react";
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

export function BoxScore({ awayTeam, homeTeam }:  { awayTeam: string; homeTeam: string }) {
  const [isExpanded, toggleExpanded] = useState(false);

  return ( 
    <Card bg="light" className="my-4 cursor-pointer" onClick={() => toggleExpanded(!isExpanded)}>
      <Card.Body>
        <Card.Text>{awayTeam} at {homeTeam}</Card.Text>
        { isExpanded && boxScore() }
      </Card.Body>
    </Card>
  )
}

// TODO: NBA-16: Use real game data
function boxScore() {
  return ( 
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Player</th>
          <th>Points</th>
          <th>Assists</th>
          <th>Rebounds</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>LeBron James</td>
          <td>17</td>
          <td>11</td>
          <td>10</td>
        </tr>
        <tr>
          <td>Kevin Durant</td>
          <td>26</td>
          <td>3</td>
          <td>9</td>
        </tr>
      </tbody>
    </Table>
  )
}
