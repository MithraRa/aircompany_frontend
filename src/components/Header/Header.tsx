import React, { useEffect, useState } from "react";
import Button from "../../shared/Button/Button";
import logo from "../../assets/pictures/logo.png";
import { Link } from "react-router-dom";

import styles from "../Header/Header.module.css";

function Header(props: any) {
  const textBtn = props.isLoged ? "Выйти" : "Войти";

  const logout = async () => {
    await fetch("http://localhost:8080/api/signout", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    props.setIsLoged(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <img className={styles.logo} src={logo} alt="logo" />
        <div className={styles.login}>
          <Link to="/signin">
            <Button type="submit" onClick={logout}>
              {textBtn}
            </Button>
          </Link>
        </div>
      </div>
      {props.user !== null ? (
        <nav className={styles.navigation} onClick={() => props.setSeats([])}>
          {props.user.Id > 0 && (
            <Link to={`/user/${props.userId}/info`} className={styles.line}>
              <p className={styles.text}>{"Войти личный кабинет"}</p>
            </Link>
          )}
          <Link to={"/main"} className={styles.line}>
            <p className={styles.text}>{"Вернуться на главную"}</p>
          </Link>
        </nav>
      ) : (
        ""
      )}
    </header>
  );
}

export default Header;
