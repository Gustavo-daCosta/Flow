import os
from dotenv import load_dotenv

def get_maps_api_key() -> str:
    load_dotenv(dotenv_path='config/.env')
    API_KEY = os.getenv('MAPS_API_KEY')
    print(API_KEY)
    return str(API_KEY)
