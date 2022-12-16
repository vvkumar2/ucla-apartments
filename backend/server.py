# Import flask and datetime module for showing date and time
from flask import Flask
from scraper import apartment_list


# Initializing flask app
app = Flask(__name__)

@app.route('/')
def hello_world():
    """
    a health check
    :return "string health check"
    """
    return "string health check"

# # Route for seeing a data
@app.route('/data')
def get_data():
    # Returning an api for showing in  reactjs
    return apartment_list
  
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)
