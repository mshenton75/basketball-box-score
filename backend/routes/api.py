from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional
from nba_api.live.nba.endpoints import scoreboard, boxscore

router = APIRouter(
    prefix="/api",
    tags=["api"],
)

class Team(BaseModel):
  name: str
  id: str

class Game(BaseModel):
  homeTeam: Team
  awayTeam: Team
  id: str

@router.get("/games")
def games() -> list[Game]:
  def serialize_game(game): 
    home_team = { 
      "name": f"{game['homeTeam']['teamCity']} {game['homeTeam']['teamName']}",
      "id": str(game["homeTeam"]["teamId"])
    }
    away_team = { 
      "name": f"{game['awayTeam']['teamCity']} {game['awayTeam']['teamName']}",
      "id": str(game["awayTeam"]["teamId"])
    }
    return Game(homeTeam=home_team, awayTeam=away_team, id=str(game['gameId']))

  games = scoreboard.ScoreBoard().get_dict()['scoreboard']['games']
  return map(serialize_game, games)


class Stats(BaseModel):
  name: str 
  position: Optional[str] = None
  points: int 
  rebounds: int 
  assists: int

class GameStats(BaseModel):
  homeTeam: list[Stats]
  awayTeam: list[Stats]

@router.get("/game/{game_id}")
def game(game_id) -> GameStats:
  def serialize_player(player):
    return Stats(
      name=player["name"],
      position=player.get("position"),
      points=player["statistics"]["points"],
      rebounds=player["statistics"]["reboundsTotal"],
      assists=player["statistics"]["assists"]
    )

  box_score = boxscore.BoxScore(game_id).get_dict()["game"]
  return GameStats(
    homeTeam=map(serialize_player, box_score["homeTeam"]["players"]),
    awayTeam=map(serialize_player, box_score["awayTeam"]["players"])
  )
