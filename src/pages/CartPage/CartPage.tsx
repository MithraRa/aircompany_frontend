import React, { useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import { Navigate } from "react-router-dom";
import fetchWithTimeout from "../../utils/timeoutFetch";
import Loader from "../../components/Loader/Loader";
import SuccessPage from "../SuccessPage/SuccessPage";

import styles from "../CartPage/CartPage.module.css";

const labelText: string = "Места в самолете";
const personalText: string = "Данные пассажира";
let buttonText: string = "Взять";

function CartPage(props: any) {
  const [seats, setSeats] = useState([{Price: 0}]);
  const [seat, setSeat] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [success, setSuccess] = useState(false);

  const koef = seats.filter((item: any) => item.SeatCode === seat);
  const finalPrice = koef[0]?.Price
    ? (props.price * koef[0]?.Price).toFixed(2)
    : props.price.toFixed(2);

  const loadTicket = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    const userId: string = props.userId || "";
    const price: string = finalPrice || "";
    const flightId: string = props.flightId || "";
    const seatCode: string = seat || "";

    const url = "http://localhost:8080/api/cart";
    const createdBody = {
      userId: userId.toString(),
      flightId: flightId.toString(),
      price: price,
      seatCode: seatCode,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(createdBody),
    });

    setRedirect(true);
    setLoading(false);
    props.setPrice(0);
    props.setSeats([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/cart/${props.flightId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const content = await response.json();
      if (response.status === 200) {
        setSeats(content.seats);
        props.setSeats(content.seats);
        console.log("Cartpage async ", props.flightId, seats);
      }
    };

    fetchData();
  }, [props, seats]);

  const renderSeats = seats.map((seat: any, index: any) => {
    return (
      <div
        key={index}
        className={styles.seat}
        onClick={(e: any) => setSeat(e.target.textContent)}
      >
        {seat.SeatCode}
      </div>
    );
  });

  if (redirect) {
    return (
      <Navigate to="/api/main" replace={true}></Navigate>
    );
  }

  if (props.flightId < 1) {
    return <Navigate to="/api/main"></Navigate>;
  }

  return (
    <div className={styles.cart}>
      <div className={styles.body}>
        <div>
          <p className={styles.label}>{labelText}</p>
          <div className={styles.legend}>
            <div className={styles.seat} /> <p> — свободное место</p>
          </div>
          <div className={styles.seats}>{renderSeats || ""}</div>
        </div>
        <div className={styles.card}>
          <h3>{personalText}</h3>
          <div className={styles.row}>
            <strong>{"Имя: "} </strong> <p>{props.user.Name}</p>
          </div>
          <div className={styles.row}>
            <strong>{"Фамилия: "} </strong> <p>{props.user.Lastname}</p>
          </div>
          <div className={styles.row}>
            <strong>{"Отчество: "}</strong> <p>{props.user.Patronymic}</p>
          </div>
          <div className={styles.row}>
            <strong>{"Документ: "}</strong> <p>{props.user.Document}</p>
          </div>
          <div className={styles.row}>
            <strong>{"Телефон: "}</strong> <p>{props.user.Phone}</p>
          </div>
          <div className={styles.row}>
            <strong>{"Почта: "}</strong> <p>{props.user.Email}</p>
          </div>
          <div className={styles.row}>
            <strong>{"Место в самолете: "}</strong> <p>{seat}</p>
          </div>
          <div className={styles.button}>
            <Button type={"button"} onClick={loadTicket}>
              {buttonText + " за " + finalPrice + "₽"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
