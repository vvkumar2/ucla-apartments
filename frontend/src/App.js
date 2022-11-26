import React, { useState, useEffect } from "react";
import Listings from './pages/listings/listings';
import './App.css';

function App() {
  // EXAMPLE CODE FOR TESTING
  const [data, setdata] = useState([]);

  useEffect(() => {
    // Using fetch to fetch the api from 
    // flask server it will be redirected to proxy
    fetch("/data")
    .then((response) => response.json())
    .then((elements) => setdata(elements))
  }, []);

  return (
    <div className="App">
      <Listings />
    </div>
  );
}

export default App;
