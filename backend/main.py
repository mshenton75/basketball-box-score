from typing import Union

from fastapi import FastAPI
from pydantic import BaseModel

from routes import api

app = FastAPI()

app.include_router(api.router)