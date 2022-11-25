import React, { useState, useEffect } from "react";
import Listings from './pages/listings/listings';
import './App.css';

function App() {
  // EXAMPLE CODE FOR TESTING
  const [data, setdata] = useState({
    connection_status: "Not Connected"
  });

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data").then((res) =>
        res.json().then((data) => {
            // Setting a data from api
            setdata({
              connection_status: data.Status
            });
        })
    );
  }, []);

  console.log(data)



  return (
    <div className="App">
      <Listings />
    </div>
  );
}

export default App;
