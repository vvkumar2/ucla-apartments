# import HTMLSession from requests_html
import os
import requests
import googlemaps
from dotenv import load_dotenv
from requests_html import HTMLSession
from bs4 import BeautifulSoup


try:
    # GOOGLE MAPS API SETUP:
    # Import and set up Google Maps API
    load_dotenv()
    GMAPS_API_KEY = os.getenv('GMAPS_API_KEY')
    gmaps = googlemaps.Client(key=GMAPS_API_KEY)

    # Set up parameters for API Call
    ucla_address = "405 Hilgard Ave, Los Angeles, CA 90095"
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"

    # Make API request
    endpoint = f"{base_url}?address={ucla_address}&key={GMAPS_API_KEY}"

    # Get coordinates of UCLA
    result_coordinate = (requests.get(endpoint)).json()['results'][0]['geometry']['location']
    ucla_lat = result_coordinate['lat']
    ucla_lng = result_coordinate['lng']

except Exception as e: 
    print(e)


# WEB SCRAPING:
# Initialize list of aparment data
apartment_list = []

# Create an HTML Session object and use to connect to needed webpage
for page_number in range(1, 2):
    print(page_number)
    session = HTMLSession()
    resp = session.get(f"https://www.renthop.com/apartments-for-rent/westwood-los-angeles-ca?min_price=0&max_price=100000&bathrooms=1&search_title=Westwood&page={page_number}&sort=hopscore")
    
    # Render JavaScript code
    resp.html.render()

    # Create BS4 object and find_all for apartment listing elements
    soup = BeautifulSoup(resp.html.html, "lxml")
    results = soup.find_all(class_ = "search-info")

    # Web scrape for information that we need
    for result in results:
        # Gets name
        name = result.find(class_ = "font-size-12 b").text.strip()

        # Computes address by taking name and adding ", town, city"
        address = name + ", " + str(result.find(class_ = "font-size-8").text).strip()
        
        # Retrieves number of beds/bath and sqft by using this specific class
        bed_bath_sqft = result.find_all(class_ = "font-size-10 d-inline-block align-bottom")
        
        # Then, removes all text except the number and adds in list
        for i in range(len(bed_bath_sqft)):
            entry_text = bed_bath_sqft[i].text.strip().split(" ")[0]
            bed_bath_sqft[i] = entry_text
            if entry_text == "Studio":
                bed_bath_sqft[i] = 1
    
        # Remove empty strings from list
        while("" in bed_bath_sqft):
            bed_bath_sqft.remove("")
        
        # Retrieves rent
        rent = result.find(class_ = "d-inline-block align-middle b font-size-20").text.strip()

        # Find distance from apartment->ucla (already have ucla coords, need to find coords of apartment address)
        # Make API request
        try:
            endpoint = f"{base_url}?address={address}&key={GMAPS_API_KEY}"

            # Get coordinates of apartment
            result_coordinate = (requests.get(endpoint)).json()['results'][0]['geometry']['location']
            apartment_lat = result_coordinate['lat']
            apartment_lng = result_coordinate['lng']
            origin = (ucla_lat, ucla_lng)
            destination = (apartment_lat, apartment_lng)

            # Get distance between coords and then convert to miles
            result_distance = gmaps.distance_matrix(origin, destination, mode='walking')["rows"][0]["elements"][0]["distance"]["value"]  
            result_distance = 0.621371 * result_distance/1000
            result_distance = round(result_distance, 2)
        except:
            print("map error", page_number, name)

        if name and address and len(bed_bath_sqft) == 3 and rent and result_distance:
            apartment = ({
                "name": name,
                "address": address,
                "url": "rentinwestwood.com",
                "bed": float(bed_bath_sqft[0]),
                "bath": float(bed_bath_sqft[1]),
                "sqft": float(bed_bath_sqft[2].replace(",", "")),
                "rent": float(rent[1:].replace(",", "")),
                "distance": result_distance
            })

            if not any(d["name"] == name for d in apartment_list):
                apartment_list.append(apartment)
            else:
                print("exists", page_number, name)
    session.close()

# print (apartment_list)