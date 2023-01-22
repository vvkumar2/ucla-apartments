import React, { useEffect, useState } from "react";
import './detailed-listing-page.styles.css'
import Navbar from "../navbar/navbar";
import { useLocation, useParams } from "react-router-dom";
import SectionHeader from "../../components/section-header/section-header.component";
import { ReactPhotoCollage } from "react-photo-collage";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAndroid, faBed, faBath, faGlobe, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import { createClient } from '@supabase/supabase-js'
import FeatureListBox from "../../components/feature-list-box/feature-list-box.component";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseAnonKey)


const DetailedListingPage = () => {
    const queryParameters = new URLSearchParams(window.location.search)
    const id = queryParameters.get("id")
    const [apartmentInfo, setApartmentInfo] = useState([])
    const [error, setError] = useState(false)


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

    return (
        <div>
            { apartmentInfo.length!==0 && !error && <div>
            <Navbar />
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
            <div className="information-container">
                <div className="left-side">
                    <div className="detailed-apartment-description">
                        <div className="detailed-apartment-name-address">
                            <h1 className="detailed-apartment-name">{apartmentInfo.name}</h1>
                            <h2 className="detailed-apartment-address">{apartmentInfo.address}</h2>
                        </div>
                        <div className="detailed-apartment-seller-logo">
                            <img src={apartmentInfo.seller_logo} alt="" style={{maxWidth: "150px", maxHeight: "70px", verticalAlign: "middle"}}/>
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
                        </div>
                    }
                    { apartmentInfo.unique_features.length!==0 && <FeatureListBox section_header="Unique Features" features_list={apartmentInfo.unique_features} /> }
                    { apartmentInfo.community_amenities.length!==0 && <FeatureListBox section_header="Amenities" features_list={apartmentInfo.community_amenities} /> }
                    { apartmentInfo.property_services.length!==0 && <FeatureListBox section_header="Property Services" features_list={apartmentInfo.property_services} /> }
                    { apartmentInfo.apartment_highlights.length!==0 && <FeatureListBox section_header="Apartment Highlights" features_list={apartmentInfo.apartment_highlights} /> }
                    { apartmentInfo.kitchen_features.length!==0 && <FeatureListBox section_header="Kitchen Features" features_list={apartmentInfo.kitchen_features} /> }
                    { apartmentInfo.floor_plan_features.length!==0 && <FeatureListBox section_header="Floor Plan Features" features_list={apartmentInfo.floor_plan_features} /> }
                    { apartmentInfo.utilities.length!==0 && <FeatureListBox section_header="Utilities" features_list={apartmentInfo.utilities} /> }
                </div>
                <div className="right-side">
                    <div className="contact-information-container">
                        <div className="contact-information">
                            <h1 className="contact-property">Contact This Property</h1>
                            <div className="contact-send-message"><h1>Send Message</h1></div>
                            { apartmentInfo.phone_number_href!==null && <h1 className="contact-phone-number"><FontAwesomeIcon icon={faMobileAndroid} /><a href={apartmentInfo.phone_number_href}> {apartmentInfo.phone_number}</a></h1> }
                            { apartmentInfo.website_url!==null && <h1 className="contact-phone-number"><FontAwesomeIcon icon={faGlobe} /><a href={apartmentInfo.website_url}> Visit Property Website</a></h1> }
                        </div>
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
        </div>
    );
};

export default DetailedListingPage;

