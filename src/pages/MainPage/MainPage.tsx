import React, { useState, useEffect } from "react";

import Ticket from "../../components/Ticket/Ticket";
import Carousel from "../../components/Carousel/Carousel";
import SearchBar from "../../components/SearchBar/SearchBar";

import styles from "./MainPage.module.css";

function MainPage(props: any) {
  const currFlights = props.flights ? props.flights : [];
  const listItems = [...currFlights].map((flight: any, index: any) => (
    <Ticket
      key={index}
      flightId={flight.FlightId}
      departureTime={flight.DepartureTime}
      arrivalTime={flight.ArrivalTime}
      departureAirport={flight.DepartureAirport}
      arrivalAirport={flight.ArrivalAirport}
      price={flight.FlightPrice}
      setFlightId={props.setFlightId}
      setPrice={props.setPrice}
      setSeats={props.setSeats}
      seats={props.seats}
      user={props.user}
      isLoged={props.isLoged}
    ></Ticket>
  ));

  return (
    <div className={styles.mainpage}>
      <Carousel />
      <SearchBar
        flights={props.flights}
        filteredFlights={props.filteredFlights}
        setFilteredFlights={props.setFilteredFlights}
      />
      <div className={styles.content}>
        {listItems.length < 1 ? "Нет билетов..." : listItems}
      </div>
    </div>
  );
}

export default MainPage;
