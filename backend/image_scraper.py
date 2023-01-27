import os
import time
import json
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.action_chains import ActionChains


# Set options for selenium (headless)
options = Options()
options.add_experimental_option("detach", True)

# Initialize the Service object with path to chromedriver and then initialize the driver
s = Service('/chromedriver_mac64/chromedriver.exe')
driver = webdriver.Chrome(service=s, options=options)

# read apartment_data.json file and store in variable
with open('../frontend/src/data/apartment_data.json') as f:
    apartment_data_json = json.load(f)

# Loop through apartment_data_json and get the apartment.com url for each apartment
for apartment in apartment_data_json:
    driver.get(apartment["url"])
    time.sleep(2)
    # Find the photos tab and click it
    submit = driver.find_element("xpath", "//*[@id='carouselPillPhotosLink']")
    submit.click()
    time.sleep(2)
    # Loop through the photos and get the background image url
    for photo in driver.find_elements("xpath", "//*[@class='photoItem']/div"):
        try:
            hover = ActionChains(driver)
            hover.move_to_element(photo).perform()
            time.sleep(.05)
        except:
            pass
        if photo.value_of_css_property("background-image") != "none":
            print(photo.value_of_css_property("background-image")[5:-2])
            apartment["all_image_urls"].append(photo.value_of_css_property("background-image")[5:-2])

# clear the data in the apartment_data_json file
with open('../frontend/src/data/apartment_data.json','w') as f:
    pass

# write the updated apartment_data_json to the apartment_data_json file
with open('../frontend/src/data/apartment_data.json','w') as f:
    json.dump(apartment_data_json, f, indent=1)