import scrapy
from scrapy.crawler import CrawlerProcess

# to update frontend: clear apartment_data.json, cd into backend, and run: scrapy runspider scraper.py -o ../frontend/src/data/apartment_data.json


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
        street_city = response.xpath(
            './/*[@class="propertyAddressContainer"]/h2/span/text()').extract()
        state_zip = response.xpath(
            './/*[@class="stateZipContainer"]/span/text()').extract()

        address = street_city[0] + " " + street_city[1] + \
            ", " + state_zip[0] + " " + state_zip[1]

        # scrape image url
        image_styling = response.xpath(
            './/*[@class="aspectRatioImage "]/@style').extract_first()
        open_paren = image_styling.find("(")
        close_paren = image_styling.rfind(")")

        if open_paren != -1 and close_paren != -1:
            image_url = image_styling[open_paren + 2:close_paren - 1] # remove one past parantheses to remove opening and closing quotes

        # scrape all other details
        details_list = response.xpath(
            './/*[@id="priceBedBathAreaInfoWrapper"]//ul/li')

        for entry in details_list:
            label = entry.xpath(
                './/*[@class="rentInfoLabel"]/text()').extract_first()
            value = entry.xpath(
                './/*[@class="rentInfoDetail"]/text()').extract_first()

            if label == "Monthly Rent":
                rent = value
            elif label == "Bedrooms":
                beds = (" ").join(value.split()[:-1])
            elif label == "Bathrooms":
                baths = (" ").join(value.split()[:-1])
            elif label == "Square Feet":
                sqft = (" ").join(value.split()[:-2])

        yield {"name": name, "url": url, "address": address, "beds": beds, "baths": baths, "sqft": sqft, "rent": rent, "image_url": image_url}


# uncomment this code and run python scraper.py to run the scraper as a standalone script
# if __name__ == "__main__":
#     process = CrawlerProcess({
#         'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
#     })

#     process.crawl(ApartmentsSpider)
#     process.start()  # the script will block here until the crawling is finished
