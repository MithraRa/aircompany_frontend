import React, { SyntheticEvent, useState, useEffect } from "react";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import Loader from "../../components/Loader/Loader";

import { NavLink, redirect } from "react-router-dom";
import { Navigate } from "react-router-dom";

import fetchWithTimeout from "../../utils/timeoutFetch";

import styles from "../SignUpPage/SignUpPage.module.css";

function SignUpPage(props: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  let toggleText: string = "Есть аккаунт. Войти";
  let btnText: string = "Зарегистрироваться";

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();

    setLoading(true);

    const url = "http://localhost:8080/signup";
    const createdBody = {
      name,
      email,
      password,
    };

    const response = await fetchWithTimeout(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(createdBody),
      timeout: 15000
    });

    setLoading(false);

    if (response.status === 200) {
      setRedirect(true);
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
    }
  };


  if (redirect) {
    return (
      <Navigate to="/signin" replace={true}></Navigate>
    );
  }

  return (
    <div className={styles.loginPage}>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={submit} className={styles.form}>
          <div className={styles.header}>
            <NavLink to="/signin">
            <p className={styles.toggle} onClick={() => setToggle(!toggle)}>
              {toggleText}
            </p>
            </NavLink>
          </div>
          <div className={styles.input}>
            <Input
              type={"text"}
              placeholder={"Name"}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setName(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <Input
              type={"email"}
              placeholder={"Email address"}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.input}>
            <Input
              type={"password"}
              placeholder={"Password"}
              pattern={"[0-9a-fA-F]{6,8}"}
              onChange={(e: {
                target: { value: React.SetStateAction<string> };
              }) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.button}>
            <Button type="submit">{btnText}</Button>
          </div>
        </form>
      )}
    </div>
  );
}

export default SignUpPage;
