import React, { useState } from "react";
import styles from "../Ticket/Ticket.module.css";
import { Link } from "react-router-dom";

import aircraftLine from "../../assets/pictures/aircraft.png";

import Button from "../../shared/Button/Button";
import Money from "../../shared/Money/Money";

interface ITicket {
  children?: React.ReactNode;
  isBought?: boolean;
}

const Ticket = (props: any) => {
  const [departureDate, departureTime] =
    new Date(props.departureTime).toLocaleString().slice(0, -3).split(",") ||
    "";
  const [arrivalDate, arrivalTime] =
    new Date(props.arrivalTime).toLocaleString().slice(0, -3).split(",") || "";
  const [airportFrom, cityFrom] = props.departureAirport.split(" ") || "";
  const [airportTo, cityTo] = props.arrivalAirport.split(" ") || "";
  const [isBought, setIsBought] = useState(props.isBought || false);
  const price = props.price || "";
  const seatCode = props.seatCode ? "Место в самолете: " + props.seatCode : "";
  const fullName = props.user.Name
    ? "ФИО: " + props.user.Name + " " + props.user.Lastname
    : "";
  const document = props.user.Document
    ? "Документ: " + props.user.Document
    : "";

  const buttonHandler = (e: any) => {
    props.setFlightId(props.flightId);
    props.setPrice(price);
    // props.setSeats([]);
  };

  return (
    <div className={styles.ticket}>
      <div className={styles.header}>
        <div>
          <h2>{departureTime}</h2>
          <p className={styles.date}>{departureDate}</p>
        </div>

        <div className={styles.line}></div>
        <img src={aircraftLine} alt="" />
        <div className={styles.line}></div>
        <div>
          <h2>{arrivalTime}</h2>
          <p className={styles.date}>{arrivalDate}</p>
        </div>
      </div>
      <div className={styles.body}>
        <div className={styles.text}>
          <p>{airportFrom}</p>
          <p>{cityFrom}</p>
        </div>
        <div>
          <p>{airportTo}</p>
          <p>{cityTo}</p>
        </div>
      </div>
      <div className={styles.footer}>
        {isBought ? (
          <div className={styles.info}>
            <h4>{seatCode}</h4>
            <p>{fullName}</p>
            <p>{document}</p>
          </div>
        ) : (
          <div className={styles.btn}>
            <Link to={props.isLoged ? `/cart/${props.flightId}` : "/signin"} onClick={buttonHandler}>
              <Button type="submit">{"Взять билет"}</Button>
            </Link>
          </div>
        )}
        <Money value={price} />
      </div>
    </div>
  );
};

export default Ticket;
