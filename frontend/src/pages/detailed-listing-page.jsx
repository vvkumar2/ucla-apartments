import { faArrowsToDot, faBath, faBed, faSackDollar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { createClient } from '@supabase/supabase-js';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ReactComponent as HeartIcon } from '../assets/heart-icon.svg';
import Carousel from '../components/carousel-components/carousel/carousel';
import FeatureListBox from '../components/feature-list-box';
import Footer from '../components/footer';
import Navbar from '../components/navbar';
import useUserContext from '../context/user.context';
import { addItemToSupabaseCategory, checkIfItemInSupabaseCategory } from '../utils/supabase-utils';

// Creating a supabase client to access the database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const DetailedListingPage = () => {
  // Getting the id of the apartment from the url
  const queryParameters = new URLSearchParams(window.location.search);
  const id = queryParameters.get('id');
  const [apartmentInfo, setApartmentInfo] = useState([]);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(false);
  const { email } = useUserContext();
  const [screenSize, setScreenSize] = useState(window.innerWidth);
console.log(screenSize)

  // Updating the screen size when the window is resized
  useEffect(() => {
    return window.addEventListener('resize', () => setScreenSize(window.innerWidth));
  }, []);

  // Fetching the apartment details from the database using the id from the url
  useEffect(() => {
    async function fetchApartmentDetails() {
      if (id > 0) {
        const { data, error } = await supabase.from('apartment_data').select('*').eq('id', id);

        if (error) setError(true);
        else {
          if (data.length !== 0) setApartmentInfo(data[0]);
          else setError(true);
        }
      } else setError(true);
    }
    fetchApartmentDetails();
  }, [id]);

  // Checking if the apartment is already in the liked items list
  useEffect(() => {
    async function checkIfLiked() {
      const response = await checkIfItemInSupabaseCategory(email, apartmentInfo, 'LIKED');
      setLiked(response ? true : false);
    }
    checkIfLiked();
  }, [email, apartmentInfo]);

  // Function to add the apartment to the liked items list
  async function addToLiked() {
    if (email === '') {
      toast.error('Please login to add to liked items');
      return;
    } else {
      const response = await addItemToSupabaseCategory(email, 'LIKED', apartmentInfo);
      if (!liked)
        toast.success('Added to liked items');
      else
        toast.error('Removed from liked items');
      setLiked(response ? true : false);
    }
  }

  return (
    <div className="">
      {/* If the apartment id is valid, display the apartment details */}
      {apartmentInfo.length !== 0 && !error && (
        <div>
          <Navbar />
          {/* Displaying the apartment images in a carousel using pure-react-carousel library */}
          <Carousel apartmentInfo={apartmentInfo} numSlides={screenSize>950 ? 3 : screenSize > 700 ? 2 : screenSize > 400 ? 1 : .75}/>
          {/* Displaying the apartment details */}
          <div className="mt-14 flex flex-col md:flex-row md:px-[8rem] lg:px-[12rem]">
            <div className="mx-[48px] md:mr-auto md:ml-0 flex md:w-7/12 flex-col gap-8">
              <div className="flex flex-row">
                <h2 className="text-left text-3xl">{apartmentInfo.address}</h2>
                <HeartIcon
                  className={
                    liked
                      ? 'ml-auto mt-2 w-16 fill-red-400 stroke-red-400 stroke-1 hover:cursor-pointer'
                      : 'ml-auto mt-2 w-16 fill-none stroke-red-400 stroke-1 hover:cursor-pointer hover:fill-red-100'
                  }
                  onClick={() => addToLiked()}
                />
              </div>
              <div>
                <div className="text-black-500 flex flex-row gap-7 text-base">
                  <h1>
                    <FontAwesomeIcon icon={faBed} className="text-xl text-blue-700" />
                    &nbsp;{apartmentInfo.beds} Beds
                  </h1>
                  <h1>
                    <FontAwesomeIcon icon={faBath} className="text-xl text-blue-700" />
                    &nbsp;{apartmentInfo.baths} Baths
                  </h1>
                </div>
                <div className="text-black-500 flex flex-row gap-7 text-base mt-8">
                  <h1>
                    <FontAwesomeIcon icon={faArrowsToDot} className="text-xl text-blue-700" />
                    &nbsp;{apartmentInfo.sqft}
                    sqft
                  </h1>
                  <h1>
                    <FontAwesomeIcon icon={faSackDollar} className="text-xl text-blue-700" />
                    &nbsp;{apartmentInfo.rent}
                    /Month
                  </h1>
                </div>
              </div>

              {apartmentInfo.about_text !== '' && (
                <div className="text-left text-base leading-7 text-slate-600">
                  <p className="">{apartmentInfo.about_text}</p>
                </div>
              )}
              {/* Displaying the apartment features in a FeatureListBox component if they exist */}
              {apartmentInfo.unique_features.length !== 0 && (
                <FeatureListBox
                  section_header="Unique Features"
                  features_list={apartmentInfo.unique_features}
                />
              )}
              {apartmentInfo.community_amenities.length !== 0 && (
                <FeatureListBox
                  section_header="Amenities"
                  features_list={apartmentInfo.community_amenities}
                />
              )}
              {apartmentInfo.property_services.length !== 0 && (
                <FeatureListBox
                  section_header="Property Services"
                  features_list={apartmentInfo.property_services}
                />
              )}
              {apartmentInfo.apartment_highlights.length !== 0 && (
                <FeatureListBox
                  section_header="Apartment Highlights"
                  features_list={apartmentInfo.apartment_highlights}
                />
              )}
              {apartmentInfo.kitchen_features.length !== 0 && (
                <FeatureListBox
                  section_header="Kitchen Features"
                  features_list={apartmentInfo.kitchen_features}
                />
              )}
              {apartmentInfo.floor_plan_features.length !== 0 && (
                <FeatureListBox
                  section_header="Floor Plan Features"
                  features_list={apartmentInfo.floor_plan_features}
                />
              )}
              {apartmentInfo.utilities.length !== 0 && (
                <FeatureListBox
                  section_header="Utilities"
                  features_list={apartmentInfo.utilities}
                />
              )}
            </div>

            {/* Displaying the contact information for the apartment */}
            <div className="w-[75%] mx-auto mt-8 md:w-1/3 md:ml-auto md:mr-0 md:mt-0 h-max sticky top-44 self-start text-center">
              <div className="divide-y divide-slate-400 rounded-xl bg-white p-6 shadow-standard">
                <div className="flex flex-col gap-3 pb-6 ">
                  <h1 className="text-2xl font-bold">Contact</h1>
                  {apartmentInfo.phone_number_href !== null && (
                    <h1>
                      <a href={apartmentInfo.phone_number_href} className="hover:text-blue-700">
                        {' '}
                        {apartmentInfo.phone_number}
                      </a>
                    </h1>
                  )}
                  {apartmentInfo.website_url !== null && (
                    <h1>
                      <a href={apartmentInfo.website_url} className="text-blue-700">
                        {' '}
                        Visit Property Website
                      </a>
                    </h1>
                  )}
                </div>
                {/* Displaying the office hours if they exist */}
                {apartmentInfo.office_hours.length !== 0 && (
                  <div className="flex flex-col gap-3">
                    <h1 className="pt-6 text-2xl font-bold">Hours</h1>
                    {apartmentInfo.office_hours.map((hour, index) => {
                      return (
                        <h1 key={index} className="">
                          {hour.days} &nbsp;
                          {hour.hours}
                        </h1>
                      );
                    })}
                  </div>
                )}
              </div>
              { /* Displaying the apartment's logo if it exists */ }
              {apartmentInfo.seller_logo_url !== "https://www.apartments.com/a/775e0d/content/images/fallbackimage.png" &&
              <div>
                <img
                  className="mx-auto mt-8 rounded-xl bg-white p-2 shadow-standard"
                  src={apartmentInfo.seller_logo_url}
                  alt=""
                  style={{
                    maxWidth: '150px',
                    maxHeight: '70px',
                    verticalAlign: 'middle',
                  }}
                />
              </div>
              }
            </div>
          </div>
          <Footer />
          <ToastContainer hideProgressBar={true} />
        </div>
      )}
      {apartmentInfo.length !== 0 ||
        (error && (
          <div>
            <Navbar />
            <h1 className="mt-64 text-3xl text-slate-600">Listing not found</h1>
          </div>
        ))}
    </div>
  );
};

export default DetailedListingPage;
