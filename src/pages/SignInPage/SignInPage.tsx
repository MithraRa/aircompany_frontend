import React, { SyntheticEvent, useState, useEffect } from "react";
import Button from "../../shared/Button/Button";
import Input from "../../shared/Input/Input";
import Loader from "../../components/Loader/Loader";

import { redirect, NavLink } from "react-router-dom";

import { Navigate } from "react-router-dom";

import styles from "../SignInPage/SignInPage.module.css";

function SignInPage(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleText: string = "Нет аккаунта? Зарегистрироваться";
  const btnText: string = "Войти";

  const submit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    setLoading(true);

    let createdBody = {
      email,
      password
    };
    const url = "http://localhost:8080/signin";

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(createdBody)
    });
    
    setLoading(false);

    const content = await response.json()

    if (response.status === 200) {
      localStorage.removeItem("user");
      localStorage.removeItem("userId");
      setRedirect(true);
      props.setIsLoged(true);
      props.setUserId(content.id)
      localStorage.setItem("userId", content.id);
      console.log("signinpage",content)
    }
  };

  // useEffect(() => {
  //   document.title = `Войти в систему`;
  // }, []);

  if (redirect) {
    return <Navigate to="/main" replace={true}></Navigate>;
  }

  return (
    <div className={styles.loginPage}>
      {loading ? <Loader /> : 
      <form onSubmit={submit} className={styles.form}>
        <div className={styles.header}>
            <NavLink to="/signup">
              <p className={styles.toggle} onClick={() => setToggle(!toggle)}>
                {toggleText}
              </p>
            </NavLink>
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
            onChange={(e: {
              target: { value: React.SetStateAction<string> };
            }) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.button}>
          <Button type="submit">{btnText}</Button>
        </div>
      </form>
      }
    </div>
  );
}

export default SignInPage;
