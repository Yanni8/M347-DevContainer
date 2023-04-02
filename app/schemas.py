from pydantic import BaseModel


class Score(BaseModel):
    user_id: str
    points: int

    class Config:
        orm_mode = True
