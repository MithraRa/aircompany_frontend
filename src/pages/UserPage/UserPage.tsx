import React, { SyntheticEvent, useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import Ticket from "../../components/Ticket/Ticket";
import styles from "../UserPage/UserPage.module.css";

import { redirect, Navigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

function UserPage(props: any) {
  const [userId, setUserId] = useState(props.userId);
  const [name, setName] = useState(props.user.Name || localStorage.getItem("Name"));
  const [lastname, setLastname] = useState(props.user.Lastname || localStorage.getItem("Lastname"));
  const [patronymic, setPatronymic] = useState(props.user.Patronymic || localStorage.getItem("Patronymic"));
  const [document, setDocument] = useState(props.user.Document || localStorage.getItem("Document"));
  const [phone, setPhone] = useState(props.user.Phone || localStorage.getItem("Phone"));
  const [email, setEmail] = useState(props.user.Email || localStorage.getItem("Email"));
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const listItems = [...tickets || []].map((ticket: any, index) => (
    <Ticket
      key={index}
      ticketId={ticket.TicketId}
      seatCode={ticket.SeatCode}
      departureTime={ticket.DepartureTime}
      arrivalTime={ticket.ArrivalTime}
      departureAirport={ticket.DepartureAirport}
      arrivalAirport={ticket.ArrivalAirport}
      price={ticket.Total}
      isBought={true}
      user={props.user}
    ></Ticket>
  ));

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    let createdBody = {
      email: email,
      name: name,
      lastname: lastname,
      patronymic: patronymic,
      phone: phone,
      document: document,
    };

    const response = await fetch(`http://localhost:8080/api/user/${userId}/info`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(createdBody),
    });

    if (response.status === 200) {
      localStorage.removeItem("user")
      setRedirect(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/api/tickets/${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );

      const content = await response.json();
      if (response.status === 200) {
        setTickets(content.tickets);
      } else {
        setTickets([]);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) {
    return <Loader />;
  }

  if (redirect) {
    return <Navigate to="/main" replace={true}></Navigate>;
  }

  return (
    <div className={styles.userPage}>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.fullname}>
          <div className={styles.name}>
            <p className={styles.label}>Имя</p>
            <Input
              type={"text"}
              value={name}
              onChange={(e: any) => setName(e.target.value)}
            ></Input>
          </div>
          <div className={styles.name}>
            <p className={styles.label}>Фамилия</p>
            <Input
              type={"text"}
              value={lastname}
              onChange={(e: any) => setLastname(e.target.value)}
            ></Input>
          </div>
          <div className={styles.name}>
            <p className={styles.label}>Отчество</p>
            <Input
              type={"text"}
              value={patronymic}
              onChange={(e: any) => setPatronymic(e.target.value)}
            ></Input>
          </div>
        </div>

        <div className={styles.data}>
          <div className={styles.name}>
            <p className={styles.label}>Email</p>
            <Input type={"email"} value={email} disabled={"disabled"}></Input>
          </div>
          <div className={styles.name}>
            <p className={styles.label}>Телефон</p>
            <Input
              type={"text"}
              value={phone}
              onChange={(e: any) => setPhone(e.target.value)}
            ></Input>
          </div>
          <div className={styles.name}>
            <p className={styles.label}>Серия и номер</p>
            <Input
              type={"text"}
              value={document}
              onChange={(e: any) => setDocument(e.target.value)}
            ></Input>
          </div>
          {/* <div className={styles.name}>
            <p className={styles.label}>Пароль</p>
            <Input
              type={"password"}
              value={password}
              disabled={"disabled"}
            ></Input>
          </div> */}
        </div>
        <div>
          <Button type="submit">Обновить данные</Button>
        </div>
      </form>
      <div className={styles.tickets}>
        <h2>Купленные билеты</h2>
        {listItems || "Нет купленных билетов..."}
      </div>
    </div>
  );
}

export default UserPage;
