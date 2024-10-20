from time import sleep
import requests

async def get_places_from_maps(
    api_key: str,
    coordinates: str,
    place_type: str = 'tourist_attraction',
    radius: int = 30000,
    opennow: bool = True
) -> list:
    params = {
        'location': coordinates,
        'radius': radius,
        'type': place_type,
        'opennow': opennow,
        'key': api_key
    }
    
    url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json'
    places = []
    next_page_token = None

    while len(places) < 60:
        if next_page_token:
            params['pagetoken'] = next_page_token
        
        response = requests.get(url, params=params)
        results = response.json()
        
        if results['status'] != 'OK':
            print(f"Erro: {results['status']}")
            break

        places.extend(results.get('results', []))

        next_page_token = results.get('next_page_token')        
        if next_page_token:
            sleep(5)
        else:
            break

    return places[:60]

async def get_coordinates_from_address(API_KEY: str, address: str) -> str:
    url = f'https://maps.googleapis.com/maps/api/geocode/json'
    
    params = {
        'address': address,
        'key': API_KEY
    }

    response = requests.get(url, params=params)
    data = response.json()

    if data['status'] == 'OK':
        result = data['results'][0]
        coordinates = result['geometry']['location']
        return {
            'latitude': coordinates['lat'],
            'longitude': coordinates['lng']
        }
    else:
        return { 'error': f"Erro ao obter as coordenadas: {data['status']}" }

def get_route_link(origin: str, destination: str, mode: str = 'driving') -> str:
    maps_link = f"https://www.google.com/maps/dir/?api=1&origin={origin}&destination={destination}&travelmode={mode}"
    return maps_link
    