import React from "react";
import styles from "./Input.module.css";

interface IInput {
  children?: React.ReactNode;
  type?: "search" | "date" | "email" | "password" | "text";
  placeholder?: string;
  datalist?: string;
  dataset?: any;
  onChange?: any;
  value?: any;
  disabled?: any; 
  pattern?: string;
}

function Input(props: IInput) {
  // const buttonText: string = "Войти";

  return (
    <>
      <input
        className={styles.input}
        type={props.type}
        autoComplete="off"
        required
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        disabled={props.disabled}
        pattern={props.pattern}
      />
      <datalist id={props.datalist}>
        {/* <option value="Moscow" />
        <option value="Rome" /> */}
      </datalist>
    </>
  );
}

export default Input;
