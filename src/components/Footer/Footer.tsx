import React from "react";
import styles from "../Footer/Footer.module.css";

function Footer() {
  const footerText: string = "© All rights reseverd";

  return (
    <footer className={styles.footer}>
      <p>{footerText}</p>
    </footer>
  );
}

export default Footer;
