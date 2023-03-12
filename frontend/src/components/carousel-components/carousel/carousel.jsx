import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Image,
  Slide,
  Slider,
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import React from 'react';
import Lightbox from 'react-spring-lightbox';
import ArrowButton from '../ArrowButton';
import LightboxHeader from '../Header';
import './carousel.styles.css';

const Carousel = ({ apartmentInfo }) => {
  const [lightboxIsOpen, setLightboxIsOpen] = React.useState(false);
  const [lightboxCurrentIndex, setLightboxCurrentIndex] = React.useState(0);

  const onLightboxClose = () => {
    setLightboxIsOpen(false);
  };

  const lightBoxImages = apartmentInfo.all_image_urls.map((image) => {
    return {
      src: image,
    };
  });

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
          <Slider className="py-6 pr-24 pb-0">
            {apartmentInfo.all_image_urls.map((image, index) => {
              return (
                <Slide index={index} className="">
                  <Image
                    onClick={() => {
                      setLightboxIsOpen(true);
                      setLightboxCurrentIndex(index);
                    }}
                    className="saturate-130 border border-zinc-300 brightness-95"
                    src={image}
                  />
                </Slide>
              );
            })}
          </Slider>
          <ButtonBack className="top-[45%] absolute left-10 rounded-xl bg-white/50 p-1 text-4xl text-black shadow-standard backdrop-blur-md">
            <FontAwesomeIcon icon={faAngleLeft} className="!opacity-none" />
          </ButtonBack>
          <ButtonNext className="top-[45%] absolute right-10 rounded-xl bg-white/50 p-1 text-4xl text-black shadow-standard backdrop-blur-md">
            <FontAwesomeIcon icon={faAngleRight} />
          </ButtonNext>
          <DotGroup className="relative -top-4 mx-auto w-fit rounded-full bg-white px-5 pb-2.5 shadow-standard" />
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
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, .8)' },
          }}
          isOpen={lightboxIsOpen}
          onClose={onLightboxClose}
          renderPrevButton={({ canPrev }) => (
            <ArrowButton position="left" onClick={gotoPrevious} disabled={!canPrev} />
          )}
          renderNextButton={({ canNext }) => (
            <ArrowButton position="right" onClick={gotoNext} disabled={!canNext} />
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
