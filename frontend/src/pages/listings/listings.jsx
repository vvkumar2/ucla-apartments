import React from "react";
import ApartmentBoxList from "../../components/apartment-box-list/apartment-box-list.component";
import Filters from "../../components/filters/filters.component";
import Navbar from "../navbar/navbar";
import SectionHeader from "../../components/section-header/section-header.component";
import './listings.styles.css'
import CustomMap from "../../components/google-maps/google-maps.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMap, faList } from '@fortawesome/free-solid-svg-icons'

// This is the Listings page component that renders all the apartments for selected school and allows user to filter them by different parameters such as price, number of bedrooms, etc.
const Listings = ({ResetFilters, apartmentList, searchFieldChangeHandler, sortByChangeHandler, bedFieldChangeHandler, bathFieldChangeHandler, minRentChangeHandler, maxRentChangeHandler}) => {
  const [mapView, setMapView] = React.useState(false)
  const listingsPerPage = 10
  let pageLimit = 5
  let maxPages = Math.ceil(apartmentList.length/listingsPerPage)

  return (
    <div className="listings-page-container">
      <Navbar />
      <div className="switch-view">
        { !mapView ?
        <button className="switch-view-button" onClick={() => setMapView(!mapView)}><FontAwesomeIcon icon={faMap} /> Map View</button>
        :
        <button className="switch-view-button" onClick={() => setMapView(!mapView)}><FontAwesomeIcon icon={faList} /> Listings View</button> }
      </div>
      { !mapView && <div className="listings-section" id="listings-section-id">
        <SectionHeader locations={[{ "lat": 41.41, "lng": 2.19 }]} />
        <Filters 
          searchFieldChangeHandler={searchFieldChangeHandler}
          sortByChangeHandler={sortByChangeHandler}
          bedFieldChangeHandler={bedFieldChangeHandler}
          bathFieldChangeHandler={bathFieldChangeHandler}
          minRentChangeHandler={minRentChangeHandler}
          maxRentChangeHandler={maxRentChangeHandler}
          ResetFilters={ResetFilters}/>
        <ApartmentBoxList apartmentList={apartmentList} dataLimit={listingsPerPage} pageLimit={maxPages<pageLimit ? maxPages : pageLimit } maxPagesInput={maxPages}/>
      </div> }
      { mapView && <div className="map-section">
        <CustomMap apartmentList={apartmentList} />
      </div> }
    </div>
  );
};

export default Listings;
