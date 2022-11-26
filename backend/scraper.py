import requests
import random
from bs4 import BeautifulSoup

# session = HTMLSession()

URL = "https://rentinwestwood.com/"
page = requests.get(URL)
soup = BeautifulSoup(page.content, "html.parser")

# f=open("rentinwestwood.html", "w")
# f.write(soup.prettify())
# f.close()

apartment_name = []
apartment_address = []
apartment_beds = []
apartment_baths = []

# Get apartment names
results = soup.find_all(class_ = "c1-98")
for result in results:
    if result.getText() != ("HERE" or ""):
            apartment_name.append(result.getText())

# Get apartment addresses
for index, name in list(enumerate(apartment_name)):
    apartment_address.append(name + " Los Angeles, CA 90024")
    apartment_name[index] = apartment_name[index].replace(" Avenue", '').replace(" Drive", '')


# HAVE TO FINISH WEB SCRAPING, I just stopped here 
# b/c i wanted to test out how to pass it to flask and then react

# Finalize list of dictionaries to pass to flask app
apartment_list = []
if len(apartment_name) == len(apartment_address):
    for i in range(0, len(apartment_address)):
        apartment_list.append({
            "name": apartment_name[i],
            "address": apartment_address[i],
            "url": "rentinwestwood.com",
            "bed": random.randint(2, 5),
            "bath": random.randint(1, 4),
            "rent": 100*random.randint(30, 40)
        })
