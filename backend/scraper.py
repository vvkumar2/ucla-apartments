from multiprocessing.connection import Client
import scrapy
from scrapy.crawler import CrawlerProcess
import googlemaps
import requests
import os
from dotenv import load_dotenv

# to update frontend: clear apartment_data.json, cd into backend, and run: scrapy runspider scraper.py -o ../frontend/src/data/apartment_data.json

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
    result_coordinate = (requests.get(endpoint)).json()[
        'results'][0]['geometry']['location']
    ucla_lat = result_coordinate['lat']
    ucla_lng = result_coordinate['lng']
except Exception as e:
    print(e)



class ApartmentsSpider(scrapy.Spider):
    name = 'quotes'
    allowed_domains = ['apartments.com']
    start_urls = ['https://www.apartments.com/?sk=b86712dabbb5b6b82224f2abd23fd484&bb=jm7pnwtxnN9z89iO',
                  'https://www.apartments.com/2/?sk=941f7553eeb2814b8b602c615a72f073&bb=-0nhkx4xnN_xg8iO']

    def parse(self, response):
        apartments = response.xpath('//*[@id="placardContainer"]/ul/li')

        for apt in apartments:
            name = apt.xpath(
                './/*[@class="property-title"]/span/text()').extract_first()

            if name == None:  # skip non-listings
                continue

            url = apt.xpath(
                './/*[@class="property-link"]/@href').extract_first()
            apt_request = scrapy.Request(
                url, callback=self.parse_apt_page, cb_kwargs=dict(name=name, url=url))
            yield apt_request

    def parse_apt_page(self, response, name, url):
        address, beds, baths, sqft, rent, image_url = "", "", "", "", "", ""

        # scrape address
        
        street = response.xpath(
            './/*[@id="propertyAddressRow"]/div/h2/span[1]/span/text()').extract_first()
        city = response.xpath(
            './/*[@id="propertyAddressRow"]/div/h2/span[2]/text()').extract_first()   
        state = response.xpath(
            './/*[@class="stateZipContainer"]/span[1]/text()').extract_first()
        zip_code = response.xpath(
            './/*[@class="stateZipContainer"]/span[2]/text()').extract_first()

        if street == None or city == None or state == None or zip_code == None:
            return
        address = street + " " + city + \
            ", " + state + " " + zip_code

        # scrape cover image url
        main_image_url = response.xpath(
            './/*[@class="aspectRatioElement"]/div/img/@src').extract_first()

        # scrape other pictures
        # all_image_urls = response.xpath(
        #     './/*[@class="aspectRatioElement"]/div/img/@src').extract()

        # scrape seller logo
        seller_logo_url = response.xpath(
            './/*[@id="propertyHeader"]/div[2]/img/@src').extract_first()

        # get phone number
        phone_number = response.xpath(
            './/*[@class="phoneNumber"]/text()').extract_first()
        
        phone_number_href = ''.join(c for c in phone_number if c.isdigit())
        phone_number_href = "tel:" + phone_number_href

        # scrape about section
        about_text = response.xpath(
            './/*[@id="descriptionSection"]/p/text()').extract_first()

        # scrape unique features
        unique_features = response.xpath(
            './/*[@id="99"]/ul/li/span/text()').extract()

        # scrape website link
        website_url = response.xpath(
            './/*[@id="officeHoursSection"]/div/div/div[1]/div[2]/a/@href').extract_first()
        
        # scrape hours of operation
        days_of_operation = response.xpath(
            './/*[@class="daysHoursContainer"]/span[1]/text()').extract()
            
        hours_of_operation = response.xpath(
            './/*[@class="daysHoursContainer"]/span[2]/text()').extract()
        
        office_hours = []

        if len(days_of_operation) == len(hours_of_operation):
            for i in range(len(days_of_operation)):
                office_hours.append({"days": days_of_operation[i].strip().replace("\r", "").replace("\n", ""), "hours": hours_of_operation[i].strip().replace("\r", "").replace("\n", "")})

        # scrape community amenities
        community_amenities = response.xpath(
            './/*[@class="amenityCard"]/p/text()').extract()
        
        # scrape property services
        property_services = response.xpath(
            './/*[@id="amenityGroup1"]/ul/li/span/text()').extract()

        # get distance from UCLA
        coordinates = get_distance_from_ucla(address)
        distance_from_ucla = coordinates[0]
        apartment_lat = coordinates[1]
        apartment_lng = coordinates[2]

        # scrape all other details
        details_list = response.xpath(
            './/*[@id="priceBedBathAreaInfoWrapper"]//ul/li')

        # scrape apartment highlights
        apartment_highlights = response.xpath(
            './/*[@id="amenityGroup5"]/ul/li/span/text()').extract()

        # scrape kitchen appliances
        kitchen_features = response.xpath(
            './/*[@id="amenityGroup6"]/ul/li/span/text()').extract()

        # scrape floor plan features
        floor_plan_features = response.xpath(
            './/*[@id="amenityGroup7"]/ul/li/span/text()').extract()

        # scrape garage spaces
        garage_spaces = response.xpath(
            './/*[@id="profileV2FeesWrapper"]/div[1]/div/div/div[2]/ul/li[1]/div[2]/div/text()').extract()

        # scrape included utilities
        included_utilities = response.xpath(
            './/*[@id="profileV2FeesWrapper"]/div[3]/div[1]/div/div/div[2]/ul/li/div/div[1]/text()').extract()

        # append garage spaces to included utilities
        included_utilities += garage_spaces

        # scrape url to go to images page
        # images_page_url = response.xpath(
        #     './/*[@id="profileV2FeesWrapper"]/div[3]/div[1]/div/div/div[2]/ul/li/div/div[1]/text()').extract()


        for entry in details_list:
            label = entry.xpath(
                './/*[@class="rentInfoLabel"]/text()').extract_first()
            value = entry.xpath(
                './/*[@class="rentInfoDetail"]/text()').extract_first()

            if label == "Monthly Rent":
                rent = value
            elif label == "Bedrooms":
                if value and len(value) > 1:
                    beds = (" ").join(value.split()[:-1])
            elif label == "Bathrooms":
                if value and len(value) > 1:
                    baths = (" ").join(value.split()[:-1])
            elif label == "Square Feet":
                if value and len(value) > 1:
                    sqft = (" ").join(value.split()[:-2])
            

        yield {"name": name, "url": url, "address": address, "beds": beds, "baths": baths, "sqft": sqft, "phone_number": phone_number, "phone_number_href": phone_number_href, "image_url": main_image_url, "all_image_urls": [], "seller_logo_url": seller_logo_url, "rent": rent, "distance": distance_from_ucla, "latitude": apartment_lat, "longitude": apartment_lng, "about_text": about_text, "unique_features": unique_features, "website_url": website_url, "office_hours": office_hours, "community_amenities": community_amenities, "property_services": property_services, "apartment_highlights": apartment_highlights, "kitchen_features": kitchen_features, "floor_plan_features": floor_plan_features, "utilities": included_utilities }


def get_distance_from_ucla(address):
    '''
    Returns the distance from UCLA in miles
    Returns -1 if address is invalid or if there is an error
    '''
    try:
        # print(address)
        endpoint = f"{base_url}?address={address}&key={GMAPS_API_KEY}"

        # Get coordinates of apartment
        result_coordinate = (requests.get(endpoint)).json()[
            'results'][0]['geometry']['location']
        apartment_lat = result_coordinate['lat']
        apartment_lng = result_coordinate['lng']
        origin = (ucla_lat, ucla_lng)
        destination = (apartment_lat, apartment_lng)

        # Get distance between coords and then convert to miles
        result_distance = gmaps.distance_matrix(origin, destination, mode='walking')[
            "rows"][0]["elements"][0]["distance"]["value"]
        result_distance = 0.621371 * result_distance/1000
        result_distance = round(result_distance, 2)
        return result_distance, apartment_lat, apartment_lng
    except:
        return -1


# uncomment this code and run python scraper.py to run the scraper as a standalone script
# if __name__ == "__main__":
#     process = CrawlerProcess({
#         'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
#     })

#     process.crawl(ApartmentsSpider)
#     process.start()  # the script will block here until the crawling is finished
