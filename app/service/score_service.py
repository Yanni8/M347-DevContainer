import random

from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db import model
from app.schemas import Score as HttpScore


def get_highscore(db: Session) -> int:
    return db.query(func.max(model.Score.points)).first()[0]


def insert_new_score(score: HttpScore, db: Session) -> str:
    if score.user_id is None:
        score.user_id = "%032x" % random.getrandbits(256)
    db_score = model.Score(score)
    db.add(db_score)
    db.commit()
    db.refresh(db_score)
    return score.user_id


def get_scores_of_user(user_id: str, db: Session) -> list[model.Score]:
    return db.query(model.Score).filter(model.Score.user_id == user_id).all()

