from .database import Base
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from app.schemas import Score as HttpScore


class Score(Base):
    __tablename__ = "points"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(String(length=64), unique=False)
    points = Column(Integer)

    def __init__(self, http_score: HttpScore):
        self.user_id = http_score.user_id
        self.points = http_score.points
