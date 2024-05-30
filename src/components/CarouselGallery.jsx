// import libraries
import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
// import components

// import assets

// import css
import "../assets/styles/carouselGallery.scss";

/*
carousel component
@params :
    - firstParams: {type} - description

Component description
*/

function CarouselGallery({
  officialSprites,
  defaultSprites,
  homeSprites,
  dreamworldSprite,
  name,
}) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className='carouselgallery'
    >
      <Carousel.Item className='carouselgallery__item'>
        <div className='carouselgallery__item__container'>
          <img
            className='carouselgallery__item__container__medium'
            src={officialSprites.front_default}
            alt={`Official artwork of ${name}`}
          />
          <img
            className='carouselgallery__item__container__medium'
            src={officialSprites.front_shiny}
            alt={`Official artwork of ${name} shiny`}
          />
        </div>
        <Carousel.Caption>
          <span>
            Official artwork of {name.charAt(0).toUpperCase()}
            {name.slice(1)}
          </span>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carouselgallery__item'>
        <div className='carouselgallery__item__container'>
          <img
            className='carouselgallery__item__container__small'
            src={defaultSprites.front_default}
            alt={`Sprite from front of ${name}`}
          />
          {defaultSprites.back_default && (
            <img
              className='carouselgallery__item__container__small'
              src={defaultSprites.back_default}
              alt={`Sprite from back of ${name}`}
            />
          )}
        </div>
        <div className='carouselgallery__item__container'>
          <img
            className='carouselgallery__item__container__small'
            src={defaultSprites.front_shiny}
            alt={`Sprite from front of ${name} shiny`}
          />
          {defaultSprites.back_shiny && (
            <img
              className='carouselgallery__item__container__small'
              src={defaultSprites.back_shiny}
              alt={`Sprite from back of ${name} shiny`}
            />
          )}
        </div>
        <Carousel.Caption>
          <span>
            Sprite of {name.charAt(0).toUpperCase()}
            {name.slice(1)}
          </span>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='carouselgallery__item'>
        <div className='carouselgallery__item__container'>
          <img
            className='carouselgallery__item__container__medium'
            src={homeSprites.front_default}
            alt={`Home artwork from front of ${name}`}
          />
          <img
            className='carouselgallery__item__container__medium'
            src={homeSprites.front_shiny}
            alt={`Home artwork from front of ${name} shiny`}
          />
        </div>
        <Carousel.Caption>
          <span>
            Sprite from Home of {name.charAt(0).toUpperCase()}
            {name.slice(1)}
          </span>
        </Carousel.Caption>
      </Carousel.Item>
      {dreamworldSprite.front_default !== null ? (
        <Carousel.Item className='carouselgallery__item'>
          <div className='carouselgallery__item__container'>
            <img
              className='carouselgallery__item__container__medium'
              src={dreamworldSprite.front_default}
              alt={`Dreamworld artwork from front of ${name}`}
            />
          </div>
          <Carousel.Caption>
            <span>
              Sprite from Dreamworld of {name.charAt(0).toUpperCase()}
              {name.slice(1)}
            </span>
          </Carousel.Caption>
        </Carousel.Item>
      ) : null}
    </Carousel>
  );
}
// Export to call it up
export default CarouselGallery;
