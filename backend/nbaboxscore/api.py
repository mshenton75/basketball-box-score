from django.http import HttpResponse
from django.urls import path
from nba_api.live.nba.endpoints import scoreboard

urlpatterns = [
    path("/scoreboard", get_scoreboard, name="scoreboard"),
]

def get_scoreboard(request):
  games = scoreboard.ScoreBoard()
  return HttpResponse(games.get_json())