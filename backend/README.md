# Web Scraping

## Important Files
* scraper.py
* image_scraper.py
* sender.py

## How to use:
* cd into the backend directory
* activate virtual environment
* run `pip install requirement.txt`
* run `scrapy runspider scraper.py -o ../frontend/src/data/apartment_data.json` to scrape majority of the data and place it into apartment_data.json
* run `python3 image_scraper.py` to scrape the rest of the images
* run `python3 sender.py` to send the data in apartment_data.json to be stored in supabase