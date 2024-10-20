from time import sleep
import requests

#location = '-23.57232,-46.70866'  # Coordenadas do Share Butantã

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
