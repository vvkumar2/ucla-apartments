import React, { useEffect, useState } from "react";
import './detailed-listing-page.styles.css'
import Navbar from "../navbar/navbar";
import { useLocation } from "react-router-dom";
import SectionHeader from "../../components/section-header/section-header.component";
import { ReactPhotoCollage } from "react-photo-collage";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAndroid, faBed, faBath, faGlobe, faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper";
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


const DetailedListingPage = ({route}) => {
    const { state } = useLocation();

    return(
        <div>
            <Navbar />
            <div className="gallery-container">
                <CarouselProvider
                    visibleSlides={3}
                    naturalSlideWidth={100}
                    naturalSlideHeight={80}
                    totalSlides={state.image_list.length+1}
                    infinite={true}
                >
                    <div className="gallery-slides-container">
                        <Slider className="gallery-slides-container-c">
                            { state.image_list.map((image, index) => {
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
                            <h1 className="detailed-apartment-name">{state.name}</h1>
                            <h2 className="detailed-apartment-address">{state.address}</h2>
                        </div>
                        <div className="detailed-apartment-seller-logo">
                            <img src={state.seller_logo} alt="" style={{maxWidth: "150px", maxHeight: "70px", verticalAlign: "middle"}}/>
                        </div>
                    </div>
                    <div className="detailed-apartment-information">
                        <h1><FontAwesomeIcon icon={faBed} /> &emsp;{state.beds}</h1>
                        <h1><FontAwesomeIcon icon={faBath} /> &emsp;{state.baths}</h1>
                        <h1>{state.sqft} Sqft</h1>
                        <h1>{state.rent} Monthly</h1>
                    </div>
                    { state.about_text!=="" && 
                        <div className="detailed-apartment-about">
                            <h1 className="detailed-apartment-section-header">About</h1>
                            <h1 className="detailed-apartment-about-text">{state.about_text}</h1>
                        </div>
                    }
                    { state.unique_features.length!==0 && 
                        <div className="detailed-apartment-features">
                            <h1 className="detailed-apartment-section-header">Unique Features</h1>
                            <ul className="detailed-apartment-features-text">
                                { state.unique_features.map((feature, index) => {
                                    return (
                                        <li key={index}>{feature}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    { state.community_amenities.length!==0 && 
                        <div className="detailed-apartment-features">
                            <h1 className="detailed-apartment-section-header">Amenities</h1>
                            <ul className="detailed-apartment-features-text">
                                { state.unique_features.map((amenity, index) => {
                                    return (
                                        <li key={index}>{amenity}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    { state.property_services.length!==0 &&
                        <div className="detailed-apartment-features">
                            <h1 className="detailed-apartment-section-header">Property Services</h1>
                            <ul className="detailed-apartment-features-text">
                                { state.property_services.map((service, index) => {
                                    return (
                                        <li key={index}>{service}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    { state.apartment_highlights.length!==0 &&
                        <div className="detailed-apartment-features">
                            <h1 className="detailed-apartment-section-header">Apartment Highlights</h1>
                            <ul className="detailed-apartment-features-text">
                                { state.apartment_highlights.map((service, index) => {
                                    return (
                                        <li key={index}>{service}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    { state.kitchen_features.length!==0 &&
                        <div className="detailed-apartment-features">
                            <h1 className="detailed-apartment-section-header">Kitchen Features</h1>
                            <ul className="detailed-apartment-features-text">
                                { state.kitchen_features.map((service, index) => {
                                    return (
                                        <li key={index}>{service}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    { state.floor_plan_features.length!==0 &&
                        <div className="detailed-apartment-features">
                            <h1 className="detailed-apartment-section-header">Floor Plan Features</h1>
                            <ul className="detailed-apartment-features-text">
                                { state.floor_plan_features.map((service, index) => {
                                    return (
                                        <li key={index}>{service}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    {
                        state.utilities.length!==0 && 
                            <div className="detailed-apartment-features">
                            <h1 className="detailed-apartment-section-header">Included Utilities</h1>
                            <ul className="detailed-apartment-features-text">
                                { state.utilities.map((utility, index) => {
                                    return (
                                        <li key={index}>{utility}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    }
                    {console.log(state.website_url)}
                </div>
                <div className="right-side">
                    <div className="contact-information-container">
                        <div className="contact-information">
                            <h1 className="contact-property">Contact This Property</h1>
                            <div className="contact-send-message"><h1>Send Message</h1></div>
                            { state.phone_number_href!==null && <h1 className="contact-phone-number"><FontAwesomeIcon icon={faMobileAndroid} /><a href={state.phone_number_href}> {state.phone_number}</a></h1> }
                            { state.website_url!==null && <h1 className="contact-phone-number"><FontAwesomeIcon icon={faGlobe} /><a href={state.website_url}> Visit Property Website</a></h1> }
                        </div>
                        {state.office_hours.length!==0 &&
                            <div className="hours-of-operation">
                                <h1 className="hours-heading">Hours</h1>
                                {
                                    state.office_hours.map((hour, index) => {
                                        return (
                                            <h1 key={index} className="hours-times">{hour.days} &nbsp;{hour.hours}</h1>
                                        )
                                })}
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    );
};

export default DetailedListingPage;

