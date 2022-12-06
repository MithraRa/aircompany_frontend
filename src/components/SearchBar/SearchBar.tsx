import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import styles from "../SearchBar/SearchBar.module.css";

const buttonText: string = "Найти билеты";

function SearchBar(props: any) {
  const [departureCity, setDepartureCity] = useState("");
  const [arrivalCity, setArrivalCity] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");

  const flights = props.flights ? [...props.flights] : [];

  const filterFlights = () => {
    const validFlights = flights.filter(flight => {
      const departurePortFlag = flight.DepartureAirport.toLowerCase().includes(
        departureCity.toLocaleLowerCase()
      );
      const arrivalPortFlag = flight.ArrivalAirport.toLowerCase().includes(
        arrivalCity.toLocaleLowerCase()
      );
      if (departurePortFlag && arrivalPortFlag) {
        return flight;
      }
    });

    props.setFilteredFlights(validFlights);
    setArrivalCity("");
    setDepartureCity("");
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      filterFlights();
    }
  };

  return (
    <div className={styles.searchbar}>
      <div className={styles.element} onKeyDown={(e: any) => handleKeyDown(e)}>
        <Input
          placeholder={"Откуда"}
          type={"search"}
          value={departureCity}
          onChange={(e: any) => setDepartureCity(e.target.value)}
        />
      </div>
      <div className={styles.element}>
        <Input
          placeholder={"Куда"}
          type={"search"}
          value={arrivalCity}
          onChange={(e: any) => setArrivalCity(e.target.value)}
        />
      </div>
      <div className={styles.element}>
        <Input
          placeholder={"Туда"}
          type={"date"}
          onChange={(e: any) => setDepartureTime(e.target.value)}
        />
      </div>
      <div className={styles.element}>
        <Input
          placeholder={"Обратно"}
          type={"date"}
          onChange={(e: any) => setArrivalTime(e.target.value)}
        />
      </div>
      <div className={styles.element}>
        <Button type={"submit"} onClick={filterFlights}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
