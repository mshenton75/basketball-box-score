from fastapi import APIRouter
from pydantic import BaseModel
from nba_api.live.nba.endpoints import scoreboard

router = APIRouter(
    prefix="/api",
    tags=["api"],
)

class Game(BaseModel):
  home_team: str
  away_team: str

@router.get("/games")
def games() -> list[Game]:
  def serialize_game(game): 
    home_team = f"{game['homeTeam']['teamCity']} {game['homeTeam']['teamName']}"
    away_team = f"{game['awayTeam']['teamCity']} {game['awayTeam']['teamName']}"
    return Game(home_team=home_team, away_team=away_team)

  games = scoreboard.ScoreBoard().get_dict()['scoreboard']['games']
  return map(serialize_game, games)
