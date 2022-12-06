import React, { MouseEventHandler } from 'react';
import styles from './Button.module.css';

interface IButton {
  children?: React.ReactNode;
  type?: 'button' | 'reset' | 'submit';
  onClick?: MouseEventHandler;
}

const Button: React.FC<IButton> = (props: IButton) => {
  return (
    <button
      className={styles.button} 
      onClick={props.onClick} 
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
