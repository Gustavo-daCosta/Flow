'''FastAPI é utilizado para criação de API's com facilidade em python'''
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from helpers import maps
from config.env import get_maps_api_key
from models.data_model import DataModel

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    '''Função para teste da API'''
    return {"Hello": "World"}

@app.get("/get-places")
async def get_places(location: str, restaurants: bool = True):
    API_KEY = get_maps_api_key()
    
    touristic_points = await maps.get_places_from_maps(API_KEY, location)
    return touristic_points

@app.post("/create-turistic-route")
async def create_turistic_route(data: DataModel):
    return data
