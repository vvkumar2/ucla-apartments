import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './carousel.styles.css';


const Carousel = ({apartmentInfo}) => {
    // Function to add the apartment to the liked items list
    return (
        <div className="mt-16">
            <CarouselProvider
                visibleSlides={3}
                naturalSlideWidth={20}
                naturalSlideHeight={13}
                step={3}
                totalSlides={apartmentInfo.all_image_urls.length}
                infinite={true}
            >
            <div className="relative">
                <Slider className="pr-24 pb-0 py-6">
                    { apartmentInfo.all_image_urls.map((image, index) => {
                        return (
                            <Slide index={index} className="">
                                <Image className="saturate-130 brightness-95 border border-zinc-300" src={image} />
                            </Slide>
                        )
                    })}
                </Slider>
                <ButtonBack className="absolute left-6 text-black text-5xl top-45/100 backdrop-blur-md bg-white/50 shadow-standard rounded-xl p-1"><FontAwesomeIcon icon={faAngleLeft} className="!opacity-none"/></ButtonBack>
                <ButtonNext className="absolute right-6 text-black text-5xl top-45/100 backdrop-blur-md bg-white/50 shadow-standard rounded-xl p-1"><FontAwesomeIcon icon={faAngleRight} /></ButtonNext>
                <DotGroup className="dot-group"/>
            </div>
            </CarouselProvider>
        </div>
    );
};

export default Carousel;

