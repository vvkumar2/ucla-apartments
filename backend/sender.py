# this script takes the apartment_data.json file and sends it to supabase
import os
import json
from dotenv import load_dotenv
from supabase import create_client, Client

# supabase setup: retrieve url and key from .env file and create client
load_dotenv()
url: str = os.getenv('REACT_APP_SUPABASE_URL')
key: str = os.getenv('REACT_APP_SUPABASE_ANON_KEY')
supabase: Client = create_client(url, key);

# read apartment_data.json file and store in variable
with open('../frontend/src/data/apartment_data.json') as f:
    apartment_data_json = json.load(f)

# insert apartment_data.json into supabase
for apartment in apartment_data_json:
    if apartment["sqft"]=="":
        apartment["sqft"] = "Unknown"
    data = supabase.table('apartment_data').insert(apartment).execute()

