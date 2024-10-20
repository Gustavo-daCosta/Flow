import os
from dotenv import load_dotenv

def get_maps_api_key() -> str:
    load_dotenv(dotenv_path='.env')
    API_KEY = os.getenv('MAPS_API_KEY')
    return str(API_KEY)
