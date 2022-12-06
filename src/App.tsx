import React, { useState, useEffect } from "react";
import Ticket from "./components/Ticket/Ticket";

import styles from "./App.module.css";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import Footer from "./components/Footer/Footer";

import { Routes, Route, Navigate, NavLink } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import UserPage from "./pages/UserPage/UserPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [flights, setFlights] = useState([]);
  const [isLoged, setIsLoged] = useState(false);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [loadingUser, setloadingUser] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId"));
  const [flightId, setFlightId] = useState(0);
  const [seats, setSeats] = useState([]);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:8080/flights", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      setFlights(content);
      setFilteredFlights(content);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/api/user/${userId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const content = await response.json();
      if (response.status === 200) {
        setIsLoged(true);
        setUser(content);
        localStorage.setItem("user", JSON.stringify(content));
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("userId");
        setIsLoged(false);
        setUserId("-1");
        setUser("{}");
      }
    };

    fetchData();
  }, [userId, user]);

  useEffect(() => {
    document.title = `Главная`;
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header
          user={user}
          setUser={setUser}
          isLoged={isLoged}
          setIsLoged={setIsLoged}
          userId={userId}
        />

        <Main>
          <Routes>
            <Route path="*" element={<NotFoundPage />}></Route>
            <Route path="/" element={<Navigate to="/main" />}></Route>
            <Route
              path="/main"
              element={
                <MainPage
                  flights={filteredFlights.length < 1 ? flights : filteredFlights}
                  filteredFlights={filteredFlights}
                  setFilteredFlights={setFilteredFlights}
                  setFlightId={setFlightId}
                  price={price}
                  setSeats={setSeats}
                  seats={seats}
                  setPrice={setPrice}
                  user={user}
                  isLoged={isLoged}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <SignInPage
                  user={user}
                  setUser={setUser}
                  isLoged={isLoged}
                  setIsLoged={setIsLoged}
                  setUserId={setUserId}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <SignUpPage
                  user={user}
                  setUser={setUser}
                  isLoged={isLoged}
                  setIsLoged={setIsLoged}
                />
              }
            />
            <Route
              path="/user/:id/info"
              element={
                <UserPage
                  user={user}
                  setUser={setUser}
                  userId={userId}
                  flights={flights}
                />
              }
            />
            <Route
              path="/cart/:flightId"
              element={
                <CartPage
                  flightId={flightId}
                  seats={seats}
                  user={user}
                  userId={userId}
                  setSeats={setSeats}
                  price={price}
                  setPrice={setPrice}
                />
              }
            />
          </Routes>
        </Main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
