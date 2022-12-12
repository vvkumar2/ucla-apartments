from requests_html import HTMLSession
from bs4 import BeautifulSoup

page_number = 3
session = HTMLSession()
resp = session.get(f"https://www.renthop.com/apartments-for-rent/westwood-los-angeles-ca?min_price=0&max_price=100000&bathrooms=1&search_title=Westwood&page={page_number}&sort=hopscore")
    
# Render JavaScript code
resp.html.render()

# Create BS4 object and find_all for apartment listing elements
soup = BeautifulSoup(resp.html.html, "lxml")
results = soup.find_all(class_ = "search-info")
print(results)