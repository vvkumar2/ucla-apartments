import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

import ApartmentBoxList from '../components/apartment-box-list';
import Filters from '../components/filters';
import Footer from '../components/footer';
import CustomMap from '../components/google-maps';
import Navbar from '../components/navbar';

// Function to get the minimum value of the range for beds, baths, and sqft
function getMinValue(inputString) {
  if (inputString.includes('$')) {
    inputString = inputString.replaceAll('$', '');
  }
  if (inputString.includes('-')) {
    inputString = inputString.substr(0, inputString.indexOf('-') - 1);
  }
  if (inputString.includes(',')) {
    inputString = inputString.replaceAll(',', '');
  }
  if (inputString === 'Call for Rent' || inputString === '') {
    inputString = '100000';
  }

  return parseFloat(inputString, 10);
}

// Function to get the maximum value of the range for beds, baths, and sqft
function getMaxValue(inputString) {
  if (inputString.includes('$')) {
    inputString = inputString.replaceAll('$', '');
  }
  if (inputString.includes('-')) {
    inputString = inputString.substr(inputString.indexOf('-') + 1, inputString.length);
  }
  if (inputString.includes(',')) {
    inputString = inputString.replaceAll(',', '');
  }
  if (inputString === 'Call for Rent' || inputString === '') {
    inputString = '0';
  }

  return parseFloat(inputString, 10);
}

// This is the Listings page component that renders all the apartments for selected school and allows user to filter them by different parameters such as price, number of bedrooms, etc.
const Listings = ({hideLoader, showLoader}) => {
  const [apartments, setApartments] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const [mapView, setMapView] = useState(false);

  // search/sort/filter states
  const [sortBy, setSortBy] = useState('');
  const [searchField, setSearchField] = useState('');
  const [minBedField, setMinBedField] = useState(NaN);
  const [maxBedField, setMaxBedField] = useState(NaN);
  const [minBathField, setMinBathField] = useState(NaN);
  const [maxBathField, setMaxBathField] = useState(NaN);
  const [minRentField, setMinRentField] = useState(NaN);
  const [maxRentField, setMaxRentField] = useState(NaN);

  useEffect(() => {
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    async function getListingData() {
      await supabase
        .from('apartment_data')
        .select('*')
        .then((json_data) => {
          setApartments(json_data.data);
        });
    }
    getListingData();
  }, []);

  useEffect(() => {
    var newFilteredApartments = apartments.filter((apartment) => {
      return apartment.name.toLocaleLowerCase().includes(searchField);
    });

    if (sortBy !== '') {
      if (sortBy === 'Price Ascending') {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMinValue(a['rent']) - getMinValue(b['rent']);
        });
      }
      if (sortBy === 'Sqft: Ascending') {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMinValue(a['sqft']) - getMinValue(b['sqft']);
        });
      }
      if (sortBy === 'Price Descending') {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMaxValue(b['rent']) - getMaxValue(a['rent']);
        });
      }
      if (sortBy === 'Sqft: Descending') {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          return getMaxValue(b['sqft']) - getMaxValue(a['sqft']);
        });
      }
      if (sortBy === 'Distance to UCLA') {
        newFilteredApartments = newFilteredApartments.sort((a, b) => {
          let dista = a['distance'];
          let distb = b['distance'];
          return dista - distb;
        });
      }
    }

    // Filter apartments based on bed field
    if (!isNaN(minBedField) && minBedField !== '') {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let beds = getMaxValue(apartment.beds);
        return beds >= minBedField;
      });
    }
    if (!isNaN(maxBedField) && maxBedField !== '') {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let beds = getMinValue(apartment.beds);
        return beds <= maxBedField;
      });
    }

    // Filter apartments based on bath field
    if (!isNaN(minBathField) && minBathField !== '') {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let baths = getMaxValue(apartment.baths);
        return baths >= minBathField;
      });
    }
    if (!isNaN(maxBathField) && maxBathField !== '') {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let baths = getMinValue(apartment.baths);
        return baths <= maxBathField;
      });
    }

    // Filter apartments based on min rent field
    if (!isNaN(minRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let rent = getMaxValue(apartment.rent);

        return rent >= minRentField;
      });
    }

    // Filter apartments based on max rent field
    if (!isNaN(maxRentField)) {
      newFilteredApartments = newFilteredApartments.filter((apartment) => {
        let rent = getMinValue(apartment.rent);

        return rent <= maxRentField;
      });
    }

    setFilteredApartments(newFilteredApartments);
  }, [
    apartments,
    sortBy,
    searchField,
    minBedField,
    maxBedField,
    minBathField,
    maxBathField,
    minRentField,
    maxRentField,
    setFilteredApartments,
  ]);

  // Search field handlers for each filter
  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  };
  const onMinBedChange = (event) => {
    console.log("Min bed: " + event.target.value)
    if (event !== null) {
      setMinBedField(event.target.value);
    } else {
      setMinBedField('');
    }
  };
  const onMaxBedChange = (event) => {
    console.log("Max bed: " + event.target.value)
    if (event !== null) {
      setMaxBedField(event.target.value);
    } else {
      setMaxBedField('');
    }
  };
  const onMinBathChange = (event) => {
    console.log("Min bath: " + event.target.value)
    if (event !== null) {
      setMinBathField(event.target.value);
    } else {
      setMinBathField('');
    }
  };
  const onMaxBathChange = (event) => {
    console.log("Max bath: " + event.target.value)
    if (event !== null) {
      setMaxBathField(event.target.value);
    } else {
      setMaxBathField('');
    }
  };
  const onMinRentChange = (event) => {
    console.log("Min rent: " + event.target.value)
    const minRent = event.target.value;
    setMinRentField(parseFloat(minRent, 10));
  };
  const onMaxRentChange = (event) => {
    console.log("Max rent: " + event.target.value)
    const maxRent = event.target.value;
    setMaxRentField(parseFloat(maxRent, 10));
  };

  // On search handler for "Sort By" filter
  const sortByChangeHandler = (newSortByValue, newSortByLabel) => {
    setSortBy(newSortByLabel);
  };

  // Reset filters
  const resetFilters = () => {
    setSortBy('None');
    setSearchField('');
    setMinBedField(NaN);
    setMaxBedField(NaN);
    setMinBathField(NaN);
    setMaxBathField(NaN);
    setMinRentField(NaN);
    setMaxRentField(NaN);
  };

  const resetBaths = () => {
    setMinBathField(NaN);
    setMaxBathField(NaN);
  };

  const resetBeds = () => {
    setMinBedField(NaN);
    setMaxBedField(NaN);
  };

  const resetRent = () => {
    setMinRentField(NaN);
    setMaxRentField(NaN);
  };

  const listingsPerPage = 10;
  let pageLimit = 5;
  let maxPages = Math.ceil(filteredApartments.length / listingsPerPage);

  return (
    <div>
      <Navbar showBackground={mapView} color_scheme={'LIGHT'} />
      <div className="flex flex-col gap-12">
        <div className="flex h-[400px] items-center justify-center bg-black bg-opacity-80 bg-santa-monica-background bg-cover bg-blend-darken">
          <h1 className="px-site-standard text-center text-4xl font-bold text-white">
            Apartments Near UCLA
          </h1>
        </div>
        <div className="relative flex flex-col gap-10 px-site-standard">
          <div className="mb-16 ml-2 flex flex-row gap-4">
            <button
              onClick={() => setMapView(false)}
              className={`text-md  ${!mapView ? 'font-semibold text-blue-700' : 'text-gray-500'}`}
            >
              List View
            </button>
            <h1 className="text-gray-500">|</h1>
            <button
              onClick={() => setMapView(true)}
              className={`text-md  ${mapView ? 'font-semibold text-blue-700' : 'text-gray-500'}`}
            >
              Map View
            </button>
          </div>
          <Filters
            searchFieldChangeHandler={onSearchChange}
            sortByChangeHandler={sortByChangeHandler}
            minBedFieldChangeHandler={onMinBedChange}
            maxBedFieldChangeHandler={onMaxBedChange}
            minBathFieldChangeHandler={onMinBathChange}
            maxBathFieldChangeHandler={onMaxBathChange}
            minRentFieldChangeHandler={onMinRentChange}
            maxRentFieldChangeHandler={onMaxRentChange}
            resetFilters={resetFilters}
            resetBaths={resetBaths}
            resetBeds={resetBeds}
            resetRent={resetRent}
            minBathField={minBathField}
            maxBathField={maxBathField}
            minBedField={minBedField}
            maxBedField={maxBedField}
            minRentField={minRentField}
            maxRentField={maxRentField}
            sortByField={sortBy}
          />
          {!mapView && (
            <ApartmentBoxList
              apartmentList={filteredApartments}
              dataLimit={listingsPerPage}
              pageLimit={maxPages < pageLimit ? maxPages : pageLimit}
              maxPagesInput={maxPages}
              hideLoader={hideLoader} 
              showLoader={showLoader}
            />
          )}
          {mapView && (
            <div className="">
              <CustomMap apartmentList={filteredApartments} />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Listings;
