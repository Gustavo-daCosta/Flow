from pydantic import BaseModel
from typing import List

class DateTime(BaseModel):
    date: str
    exit_time: str
    return_time: str

class Moods(BaseModel):
    ambience: List[str]
    vibe: List[str]
    gastronomy: List[str]

class DataModel(BaseModel):
    local: str
    max_price: int
    datetime: DateTime
    food: List[str]
    transport_types: List[str]
    accessibility: bool
    pet_friendly: bool
    child_friendly: bool
    moods: Moods
