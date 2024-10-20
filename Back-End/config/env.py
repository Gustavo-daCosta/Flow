import os
from dotenv import load_dotenv

def get_api_key(service: str) -> str:
    load_dotenv(dotenv_path='.env')
    API_KEY = os.getenv(f'{service.upper()}_API_KEY')
    return str(API_KEY)
