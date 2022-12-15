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

            if name == None or "for rent" in name.lower():  # skip bad listings or non-listing elements
                continue

            address = apt.xpath(
                './/*[@class="property-address js-url"]/text()').extract_first()
            url = apt.xpath(
                './/*[@class="property-link"]/@href').extract_first()

            beds_raw = apt.xpath(
                './/*[@class="property-beds"]/text()').extract_first().split(' ')

            beds = ""
            if beds_raw[0] == "Studio":
                if len(beds_raw) >= 3:
                    beds = beds_raw[2]
                else:
                    beds = "1"
            else:
                beds = beds_raw[0]

            baths = 2
            sqft = 2000
            monthly_rent = apt.xpath(
                './/*[@class="property-pricing"]/text()').extract_first()
            distance = "1.5 miles"

            yield {"name": name, "address": address, "url": url, "beds": beds, "baths": baths, "sqft": sqft, "monthly_rent": monthly_rent, "distance": distance}


# uncomment this code and run python scraper.py to run the scraper as a standalone script
# if __name__ == "__main__":
#     process = CrawlerProcess({
#         'USER_AGENT': 'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 5.1)'
#     })

#     process.crawl(ApartmentsSpider)
#     process.start()  # the script will block here until the crawling is finished
