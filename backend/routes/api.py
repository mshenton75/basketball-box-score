from fastapi import APIRouter
from pydantic import BaseModel
from nba_api.live.nba.endpoints import scoreboard

router = APIRouter(
    prefix="/api",
    tags=["api"],
)

class Stats(BaseModel):
  name: str 
  position: str
  points: int 
  rebounds: int 
  assists: int

class Team(BaseModel):
  name: str
  stats: list[Stats]

class Game(BaseModel):
  homeTeam: Team
  awayTeam: Team

@router.get("/games")
def games() -> list[Game]:
  def serialize_game(game): 
    home_team = {
      "name": f"{game['homeTeam']['teamCity']} {game['homeTeam']['teamName']}",
      "stats": fake_stats() # TODO: NBA-25: Use real player stats
    }
    away_team = {
      "name": f"{game['awayTeam']['teamCity']} {game['awayTeam']['teamName']}",
      "stats": fake_stats() # TODO: NBA-25: Use real player stats
    }
    return Game(homeTeam=home_team, awayTeam=away_team)

  games = scoreboard.ScoreBoard().get_dict()['scoreboard']['games']
  return map(serialize_game, games)


def fake_stats():
  return [
    {
        "name": "Player A",
        "position": "SF",
        "points": 0,
        "rebounds": 0,
        "assists": 0
    },
    {
        "name": "Player B",
        "position": "C",
        "points": 0,
        "rebounds": 0,
        "assists": 0
    },
    {
        "name": "Player C",
        "position": "SG",
        "points": 0,
        "rebounds": 0,
        "assists": 0
    }
]