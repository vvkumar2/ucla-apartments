import React, { useState, useEffect } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { createClient } from '@supabase/supabase-js'
import './google-maps.styles.css'
import SavedApartmentBox from '../saved-apartment-box/saved-apartment-box.component';
import MapsApartmentBox from '../maps-apartment-box/maps-apartment-box.component';

// Creating a supabase client to connect to the database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Retrieving google maps api key
const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

function CustomMap({ google }) {
  const [locations, setLocations] = useState([])
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)
  const [activeMarker, setActiveMarker] = useState({props: {id: 0, name: "", image_url: "", address: "", latitude: 0, longitude: 0, rent: "", sqft: ""}})

  function onMarkerClick (props, marker, e) {
    if (showingInfoWindow && activeMarker.props.id === marker.props.id) {
      setShowingInfoWindow(false)
    } else {
      setActiveMarker(marker)
      setShowingInfoWindow(true)
    }
  };
  function onClose (props) {
      setShowingInfoWindow(false)
  }

  useEffect(() => {
    async function getListingData() {
      await supabase
        .from('apartment_data')
        .select('id, name, image_url, address, latitude, longitude, rent, sqft')
        .then((json_data) => {setLocations(json_data.data)})
    }
    getListingData()
  }, [])

    return (
        <Map
          google={google}
          containerStyle={{
              position: "static",
              width: "100%",
              height: "100%"
          }}
          style={{
              width: "100%",
              height: "100%"
          }}
          center={{"lat": 34.06, "lng": -118.44}}
          initialCenter={{"lat": 34.06, "lng": -118.44}}
          zoom={15}
          disableDefaultUI={true}
        >
          {locations.map((coords, key) => {
            return (
              <Marker
                key={key}
                position={{"lat": coords.latitude, "lng": coords.longitude}}
                props={coords}
                onClick={onMarkerClick}
                name={'Kenyatta International Convention Centre'}
              />
            )
          })}
          <InfoWindow
            marker={activeMarker}
            visible={showingInfoWindow}
            onClose={onClose}
          >
            <MapsApartmentBox address={activeMarker.props.address} image_url={activeMarker.props.image_url} name={activeMarker.props.name} rent={activeMarker.props.rent} sqft={activeMarker.props.sqft} id={activeMarker.props.id} />
          </InfoWindow>
        </Map>
    )
};

export default GoogleApiWrapper({
    apiKey: googleMapsApiKey
})(CustomMap);