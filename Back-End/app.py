'''FastAPI é utilizado para criação de API's com facilidade em python'''
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from helpers import maps
from config.env import get_api_key
from models.data_model import DataModel
from helpers import LLM
import json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/get-places")
async def get_places(location: str, restaurantsIncluded: bool = False) -> list:
    API_KEY = get_api_key("MAPS")
    
    points = list()
    points.append(await maps.get_places_from_maps(API_KEY, location))
    
    if restaurantsIncluded:
        points.append(await maps.get_places_from_maps(API_KEY, location, 'restaurant'))
    
    return points

@app.get("/get-route")
def get_route_link(origin, destination, mode='driving'):
    route_link = maps.get_route_link(origin, destination, mode)
    return route_link

@app.post("/create-turistic-route")
async def create_turistic_route(person_data: DataModel):
    API_KEY = get_api_key("TOGETHER")
    
    location = await maps.get_coordinates_from_address(get_api_key("MAPS"), person_data.local)
    
    places_content = await get_places(location)
    touristic_route = await LLM.get_touristic_route(API_KEY, places_content, person_data)
    touristic_route = json.loads(str(touristic_route)[3:-3])
    
    lista_pontos = touristic_route['roteiro']
    for i in range(len(lista_pontos)):
        if i == 0:
            lista_pontos[i]["link_rota"] = get_route_link(person_data.local, lista_pontos[i]['nome'])
        else:
            lista_pontos[i]["link_rota"] = get_route_link(lista_pontos[i-1]['nome'], lista_pontos[i]['nome'])
    
    touristic_route['roteiro'] = lista_pontos
    
    print(touristic_route)
    return touristic_route