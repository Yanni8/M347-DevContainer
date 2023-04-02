from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.staticfiles import StaticFiles

from app.db.model import Base
from app.schemas import Score
from app.db.database import SessionLocal, engine
from app.service import score_service

Base.metadata.create_all(bind=engine)

BASE_URL = "/api/v1"

app = FastAPI()

app.mount("/", StaticFiles(directory="web", html = True), name="web")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get(f"{BASE_URL}/highscore", )
async def get_highscore(db: Session = Depends(get_db)) -> int:
    """
    Http Endpoint to get the highscore over all played games
    """
    return score_service.get_highscore(db)


@app.post(f"{BASE_URL}/score/")
async def add_new_score(score: Score, db: Session = Depends(get_db)) -> str:
    """
    Http Endpoint to add a new Score to the collection. If no user_id is provied,
    will the script automatic generate a random Userid
    """
    if score.points < 0:
        raise HTTPException(detail="The score needs to be a positive value (>= 0)", status_code=409)

    return score_service.insert_new_score(score, db)


@app.get(f"{BASE_URL}/score/")
async def get_all_scores(user_id: str = "", db: Session = Depends(get_db)) -> list[Score]:
    """
    Http Endpoint to get all played games of a sigel User
    """
    if user_id == "":
        raise HTTPException(detail="You have to provide a UserId", status_code=409)
    return score_service.get_scores_of_user(user_id, db)
