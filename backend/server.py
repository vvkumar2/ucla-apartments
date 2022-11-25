# Import flask and datetime module for showing date and time
from flask import Flask

# Initializing flask app
app = Flask(__name__)

# Route for seeing a data
@app.route('/data')
def get_data():
  
    # Returning an api for showing in  reactjs
    return {
        'Status':"Connected"
    }
  
      
# Running app
if __name__ == '__main__':
    app.run(debug=True)