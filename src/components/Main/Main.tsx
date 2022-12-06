import React from "react";
import Carousel from "../Carousel/Carousel";
import styles from "../Main/Main.module.css";
import SearchBar from "../SearchBar/SearchBar";

import Ticket from "../Ticket/Ticket";

interface IMain {
  children?: React.ReactNode;
}

function Main(props: IMain) {
  return (
    <div className={styles.main}>
      {/* <Carousel />
      <SearchBar />
      <div className={styles.content}>
        <Ticket />
        <Ticket />
      </div> */}
      {props?.children}
    </div>
  );
}

export default Main;
