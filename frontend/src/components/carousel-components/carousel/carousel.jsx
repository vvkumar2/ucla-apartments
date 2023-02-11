import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { CarouselProvider, Slider, Slide, Image, ButtonBack, ButtonNext, DotGroup } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import './carousel.styles.css';
import Lightbox from "react-spring-lightbox";
import LightboxHeader from '../Header';
import ArrowButton from '../ArrowButton';


const Carousel = ({apartmentInfo}) => {
    const [lightboxIsOpen, setLightboxIsOpen] = React.useState(false);
    const [lightboxCurrentIndex, setLightboxCurrentIndex] = React.useState(0);

    const onLightboxClose = () => {
        setLightboxIsOpen(false);
    }

    const lightBoxImages = apartmentInfo.all_image_urls.map((image) => {
        return {
            src: image
        }
    })

    const gotoPrevious = () =>
    lightboxCurrentIndex > 0 && setLightboxCurrentIndex(lightboxCurrentIndex - 1);

    const gotoNext = () =>
    lightboxCurrentIndex + 1 < lightBoxImages.length &&
    setLightboxCurrentIndex(lightboxCurrentIndex + 1);
    
    // Function to add the apartment to the liked items list
    return (
        <div className="mt-16">
            <CarouselProvider
                visibleSlides={3}
                naturalSlideWidth={24}
                naturalSlideHeight={18}
                step={3}
                totalSlides={apartmentInfo.all_image_urls.length}
                infinite={true}
            >
            <div className="relative">
                <Slider className="pr-24 pb-0 py-6">
                    { apartmentInfo.all_image_urls.map((image, index) => {
                        return (
                            <Slide index={index} className="">
                                <Image onClick={() => {setLightboxIsOpen(true); setLightboxCurrentIndex(index)}} className="saturate-130 brightness-95 border border-zinc-300" src={image} />
                            </Slide>
                        )
                    })}
                </Slider>
                <ButtonBack className="absolute left-10 text-black text-4xl top-45/100 backdrop-blur-md bg-white/50 shadow-standard rounded-xl p-1"><FontAwesomeIcon icon={faAngleLeft} className="!opacity-none"/></ButtonBack>
                <ButtonNext className="absolute right-10 text-black text-4xl top-45/100 backdrop-blur-md bg-white/50 shadow-standard rounded-xl p-1"><FontAwesomeIcon icon={faAngleRight} /></ButtonNext>
                <DotGroup className="w-fit relative -top-4 mx-auto px-5 pb-2.5 bg-white rounded-full shadow-standard"/>
            </div>
            </CarouselProvider>
            <div>
            <Lightbox
                index={lightboxCurrentIndex}
                onPrev={gotoPrevious}
                onNext={gotoNext}
                images={lightBoxImages}
                currentIndex={lightboxCurrentIndex}
                singleClickToZoom
                className="bg-gray-500 bg-opacity-90"
                padding={500}
                styles={{ container: { backgroundColor: "rgba(0, 0, 0, .8)" } }}
                isOpen={lightboxIsOpen}
                onClose={(onLightboxClose)}
                renderPrevButton={({ canPrev }) => (
                    <ArrowButton
                      position="left"
                      onClick={gotoPrevious}
                      disabled={!canPrev}
                    />
                )}
                renderNextButton={({ canNext }) => (
                    <ArrowButton 
                        position="right" 
                        onClick={gotoNext} 
                        disabled={!canNext} 
                    />
                )}
                renderHeader={() => (
                    <LightboxHeader
                      images={lightBoxImages}
                      currentIndex={lightboxCurrentIndex}
                      onClose={onLightboxClose}
                    />
                  )}
            />
            </div>
        </div>
    );
};

export default Carousel;

