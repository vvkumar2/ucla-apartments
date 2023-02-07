import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import FeatureListBox from "../components/feature-list-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAndroid, faBed, faBath, faFan, faGlobe, faAngleLeft, faAngleRight, faArrowsToDot } from '@fortawesome/free-solid-svg-icons'
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { createClient } from '@supabase/supabase-js'
import 'pure-react-carousel/dist/react-carousel.es.css';
import { ReactComponent as HeartIcon } from "../assets/heart-icon.svg";
import useUserContext from "../context/user.context";
import { checkIfItemInSupabaseCategory, addItemToSupabaseCategory } from "../utils/supabase-utils";


// Creating a supabase client to access the database
const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)


const DetailedListingPage = () => {
    // Getting the id of the apartment from the url
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    const [apartmentInfo, setApartmentInfo] = useState([])
    const [error, setError] = useState(false)
    const [liked, setLiked] = useState(false);
    const { email } = useUserContext();

    // Fetching the apartment details from the database using the id from the url
    useEffect(() => {
        async function fetchApartmentDetails (event) {
            if (id>0) {
                const { data, error } = await supabase
                    .from('apartment_data')
                    .select('*')
                    .eq('id', id);
            
                if (error)
                    setError(true)
                else {
                    if (data.length!==0) 
                        setApartmentInfo(data[0])
                    else 
                        setError(true)
                }
            }
            else 
                setError(true)
        }
        fetchApartmentDetails()
    }, [])

    // Function to add the apartment to the liked items list
    async function addToLiked() {
        const response = await addItemToSupabaseCategory(email, "LIKED", apartmentInfo);
        setLiked(response ? true : false);
    }

    useEffect(() => {
        async function checkIfLiked() {
            const response = await checkIfItemInSupabaseCategory(email, apartmentInfo, "LIKED");
            setLiked(response ? true : false);
        }
        checkIfLiked();
    }, [email, apartmentInfo]);


    return (
        <div className="mb-16">
            {/* If the apartment id is valid, display the apartment details */}
            { apartmentInfo.length!==0 && !error && <div>
            <Navbar />
            {/* Displaying the apartment images in a carousel using pure-react-carousel library */}
            <div className="mt-16">
                <CarouselProvider
                    visibleSlides={3}
                    naturalSlideWidth={100}
                    naturalSlideHeight={80}
                    totalSlides={apartmentInfo.all_image_urls.length+1}
                >
                    <div className="relative">
                        <Slider className="py-6 pr-24">
                            { apartmentInfo.all_image_urls.map((image, index) => {
                                return (
                                    <Slide classNameVisible="!mx-px" index={index}>
                                        <Image className="" src={image} />
                                    </Slide>
                                )
                            })}
                        </Slider>
                        <ButtonBack className="absolute left-2 text-black text-4xl top-1/2 backdrop-blur-lg bg-white/20 rounded-xl p-1"><FontAwesomeIcon icon={faAngleLeft} className="!opacity-none"/></ButtonBack>
                        <ButtonNext className="absolute right-2 text-black text-4xl top-1/2 backdrop-blur-lg bg-white/20 rounded-xl p-1"><FontAwesomeIcon icon={faAngleRight} /></ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
            {/* Displaying the apartment details */}
            <div className="flex flex-row mt-16">
                <div className="w-6/12 ml-auto flex flex-col gap-8">
                    <div className="flex flex-row">
                        <h2 className="text-2xl">{apartmentInfo.address}</h2>
                        <HeartIcon
                            className={liked ? "fill-red-400 stroke-red-400 stroke-1 ml-auto h-10 w-auto hover:cursor-pointer" : "fill-none stroke-red-400 stroke-1 ml-auto h-10 w-auto hover:cursor-pointer"}
                            onClick={() => addToLiked()}
                        />
                        {/* <img src={apartmentInfo.seller_logo_url} alt="" style={{maxWidth: "150px", maxHeight: "70px", verticalAlign: "middle"}}/> */}
                    </div>
                    <div className="flex flex-row gap-14 text-black-500 text-xl">
                        <h1><FontAwesomeIcon icon={faBed} className="text-blue-500"/>&emsp;{apartmentInfo.beds} Beds</h1>
                        <h1><FontAwesomeIcon icon={faBath} className="text-blue-500"/>&emsp;{apartmentInfo.baths} Baths</h1>
                        <h1><FontAwesomeIcon icon={faArrowsToDot} className="text-blue-500"/>&emsp;{apartmentInfo.sqft}sqft</h1>
                        <h1>{apartmentInfo.rent}/Month</h1>
                    </div>

                    { apartmentInfo.about_text!=="" && 
                        <div className="text-left text-base text-slate-600 leading-7">
                            <p className="">{apartmentInfo.about_text}</p>
                        </div> }
                    {/* Displaying the apartment features in a FeatureListBox component if they exist */}
                    { apartmentInfo.unique_features.length!==0 && <FeatureListBox section_header="Unique Features" features_list={apartmentInfo.unique_features} /> }
                    { apartmentInfo.community_amenities.length!==0 && <FeatureListBox section_header="Amenities" features_list={apartmentInfo.community_amenities} /> }
                    { apartmentInfo.property_services.length!==0 && <FeatureListBox section_header="Property Services" features_list={apartmentInfo.property_services} /> }
                    { apartmentInfo.apartment_highlights.length!==0 && <FeatureListBox section_header="Apartment Highlights" features_list={apartmentInfo.apartment_highlights} /> }
                    { apartmentInfo.kitchen_features.length!==0 && <FeatureListBox section_header="Kitchen Features" features_list={apartmentInfo.kitchen_features} /> }
                    { apartmentInfo.floor_plan_features.length!==0 && <FeatureListBox section_header="Floor Plan Features" features_list={apartmentInfo.floor_plan_features} /> }
                    { apartmentInfo.utilities.length!==0 && <FeatureListBox section_header="Utilities" features_list={apartmentInfo.utilities} /> }
                </div>

                {/* Displaying the contact information for the apartment */}
                <div className="sticky self-start top-32 mx-auto w-96 h-max bg-white shadow-standard rounded-xl p-6 divide-y divide-slate-400">
                    {/* <div className="flex flex-col gap-6 divide-y-2 divide-slate"> */}
                        <div className="flex flex-col gap-3 pb-6">
                            <h1 className="text-2xl font-bold">Contact</h1>
                            { apartmentInfo.phone_number_href!==null && <h1><FontAwesomeIcon icon={faMobileAndroid} className="!text-black-500"/><a href={apartmentInfo.phone_number_href} > {apartmentInfo.phone_number}</a></h1> }
                            { apartmentInfo.website_url!==null && <h1><FontAwesomeIcon icon={faGlobe} className="!text-black-500"/><a href={apartmentInfo.website_url} > Visit Property Website</a></h1> }
                        </div>
                        {/* Displaying the office hours if they exist */}
                        {apartmentInfo.office_hours.length!==0 &&
                            <div className="flex flex-col gap-3">
                                <h1 className="text-xl font-bold pt-6">Hours</h1>
                                {
                                    apartmentInfo.office_hours.map((hour, index) => {
                                        return (
                                            <h1 key={index} className="">{hour.days} &nbsp;{hour.hours}</h1>
                                        )
                                })}
                            </div>
                        }
                    {/* </div> */}
                </div>
            </div> 
        </div> }
        { error && 
            <div> 
                <Navbar />
                <h1 className="text-3xl text-slate-600 mt-64">Listing not found</h1>
            </div> 
        }
        </div>
    );
};

export default DetailedListingPage;

