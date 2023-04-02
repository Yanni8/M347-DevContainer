from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.model import Base
from app.schemas import Score
from app.db.database import SessionLocal, engine
from app.service import score_service

Base.metadata.create_all(bind=engine)

app = FastAPI()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/highscore")
async def get_highscore(db: Session = Depends(get_db)) -> int:
    return score_service.get_highscore(db)


@app.post("/")
async def add_new_score(score: Score, db: Session = Depends(get_db)) -> str:
    if score.points < 0:
        raise HTTPException(detail="The score needs to be a positive value (>= 0)", status_code=409)

    return score_service.insert_new_score(score, db)
