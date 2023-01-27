import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import FeatureListBox from "../../components/feature-list-box/feature-list-box.component";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAndroid, faBed, faBath, faGlobe, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext } from 'pure-react-carousel';
import { createClient } from '@supabase/supabase-js'
import 'pure-react-carousel/dist/react-carousel.es.css';
import './detailed-listing-page.styles.css'
import { ReactComponent as HeartIcon } from "../../assets/heart-icon.svg";
import useUserContext from "../../context/user.context";


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
    const [isOpen, setIsOpen] = useState(false);
    const [likedItems, setLikedItems] = useState([]);
    const [liked, setLiked] = useState(false);
    const { email } = useUserContext();

    // Add or remove an item from the liked items list in the database and update the likedItems state
    async function addToLiked(beds, name, rent, sqft, baths, image, address, distance, id) {
        if (email !== "") {
            var likedItem = {
                beds: beds,
                name: name,
                rent: rent,
                sqft: sqft,
                baths: baths,
                address: address,
                distance: distance,
                image_url: image,
                supabase_id: id,
            };
            if (liked) {
                await supabase.rpc("remove_from_liked_items", {
                    email: email,
                    new_element: likedItem,
                });
                setLiked(false)
            }
            else {
                await supabase.rpc("append_to_liked_items", {
                    email: email,
                    new_element: likedItem,
                });
                setLiked(true)
            }
        }
    }


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

    useEffect(() => {
        async function fetchLikedItems(event) {
            if (email !== "") {
                const { data, error } = await supabase.from("users").select("liked_items").eq("email", email);
                if (data[0].liked_items) setLikedItems(data[0].liked_items);
            
                var likedItem = 
                {
                    beds: apartmentInfo.beds,
                    name: apartmentInfo.name,
                    rent: apartmentInfo.rent,
                    sqft: apartmentInfo.sqft,
                    baths: apartmentInfo.baths,
                    address: apartmentInfo.address,
                    distance: apartmentInfo.distance,
                    image_url: apartmentInfo.image_url,
                    supabase_id: apartmentInfo.id,
                };

                if (likedItems !== null && likedItems.length !== 0) setLiked(likedItems.some((elem) => JSON.stringify(likedItem) === JSON.stringify(elem)));
            }
        }
    fetchLikedItems()
    }, [email, apartmentInfo])

    function createContactPopUp() {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            {/* If the apartment id is valid, display the apartment details */}
            { apartmentInfo.length!==0 && !error && <div>
            <Navbar />
            {/* Displaying the apartment images in a carousel using pure-react-carousel library */}
            <div className="gallery-container">
                <CarouselProvider
                    visibleSlides={3}
                    naturalSlideWidth={100}
                    naturalSlideHeight={80}
                    totalSlides={apartmentInfo.all_image_urls.length+1}
                    infinite={true}
                >
                    <div className="gallery-slides-container">
                        <Slider className="gallery-slides-container-c">
                            { apartmentInfo.all_image_urls.map((image, index) => {
                                return (
                                    <Slide classNameVisible="gallery-image-container" index={index}>
                                        <Image className="gallery-image" src={image} />
                                    </Slide>
                                )
                            })}
                        </Slider>
                        <ButtonBack className="button-back"><FontAwesomeIcon icon={faAngleLeft} /></ButtonBack>
                        <ButtonNext className="button-next"><FontAwesomeIcon icon={faAngleRight} /></ButtonNext>
                    </div>
                </CarouselProvider>
            </div>
            {/* Displaying the apartment details */}
            <div className="information-container">
                <div className="left-side">
                    <div className="detailed-apartment-description">
                        <div className="detailed-apartment-name-address">
                            <h1 className="detailed-apartment-name">{apartmentInfo.name}</h1>
                            <h2 className="detailed-apartment-address">{apartmentInfo.address}</h2>
                        </div>
                        <div className="detailed-apartment-icons-logo">
                            <HeartIcon
                                className={liked ? "like-button-icon clicked" : "like-button-icon not-clicked"}
                                onClick={() => addToLiked(apartmentInfo.beds, apartmentInfo.name, apartmentInfo.rent, apartmentInfo.sqft, apartmentInfo.baths, apartmentInfo.image_url, apartmentInfo.address, apartmentInfo.distance, apartmentInfo.id)}
                            />
                            <img src={apartmentInfo.seller_logo_url} alt="" style={{maxWidth: "150px", maxHeight: "70px", verticalAlign: "middle"}}/>
                        </div>
                    </div>
                    <div className="detailed-apartment-information">
                        <h1><FontAwesomeIcon icon={faBed} /> &emsp;{apartmentInfo.beds}</h1>
                        <h1><FontAwesomeIcon icon={faBath} /> &emsp;{apartmentInfo.baths}</h1>
                        <h1>{apartmentInfo.sqft} Sqft</h1>
                        <h1>{apartmentInfo.rent} Monthly</h1>
                    </div>

                    { apartmentInfo.about_text!=="" && 
                        <div className="detailed-apartment-about">
                            <h1 className="detailed-apartment-section-header">About</h1>
                            <h1 className="detailed-apartment-about-text">{apartmentInfo.about_text}</h1>
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
                <div className="right-side">
                    <div className="contact-information-container">
                        <div className="contact-information">
                            <h1 className="contact-property">Contact This Property</h1>
                            {/* <div className="contact-send-message" onClick={createContactPopUp}><h1>Send Message</h1></div> */}
                            { apartmentInfo.phone_number_href!==null && <h1 className="contact-phone-number"><FontAwesomeIcon icon={faMobileAndroid} /><a href={apartmentInfo.phone_number_href}> {apartmentInfo.phone_number}</a></h1> }
                            { apartmentInfo.website_url!==null && <h1 className="contact-phone-number"><FontAwesomeIcon icon={faGlobe} /><a href={apartmentInfo.website_url}> Visit Property Website</a></h1> }
                        </div>
                        {/* Displaying the office hours if they exist */}
                        {apartmentInfo.office_hours.length!==0 &&
                            <div className="hours-of-operation">
                                <h1 className="hours-heading">Hours</h1>
                                {
                                    apartmentInfo.office_hours.map((hour, index) => {
                                        return (
                                            <h1 key={index} className="hours-times">{hour.days} &nbsp;{hour.hours}</h1>
                                        )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div> 
        </div> }
        { error && 
            <div> 
                <Navbar />
                <h1 className="error-listing">Sorry, we couldn't find that listing</h1>
            </div> 
        }
        {/* {isOpen && <ContactPopup handleClose={createContactPopUp} /> } */}
        </div>
    );
};

export default DetailedListingPage;

