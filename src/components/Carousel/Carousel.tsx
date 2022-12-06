import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import styles from "../Carousel/Carousel.module.css";

import city1 from "../../assets/pictures/sochi.jpg";
import city2 from "../../assets/pictures/moscow.jpg";
import city3 from "../../assets/pictures/rome.jpg";

function CustomCarousel () {
  const textCity1: string = "Sochi";
  const textCity2: string = "Moscow";
  const textCity3: string = "Rome";

    return (
      <Carousel 
        infiniteLoop={true} 
        showArrows={false} 
        interval={2600} 
        autoPlay={true}
        showThumbs={false} 
        showStatus={false}
      >
        <div>
          <img src={city1} alt="" />
          <p className={styles.text}>{textCity1}</p>
        </div>
        <div>
          <img src={city2} alt="" />
          <p className={styles.text}>{textCity2}</p>
        </div>
        <div>
          <img src={city3} alt="" />
          <p className={styles.text}>{textCity3}</p>
        </div>
      </Carousel>
    );

};

export default CustomCarousel;