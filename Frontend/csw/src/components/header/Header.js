import React, { Component } from "react";
import styles from "./Header.module.css";
import coronalogo from "../../images/CoronaLogo.png";

export default class Header extends Component {
  render() {
    return (
      <div className={styles.header}>
        <div className={styles.title}>SURVIVOR WARRIOR</div>
        <div className={styles.logos}>
          <img src={coronalogo} className={styles.logo1} />
          <img src={coronalogo} className={styles.logo2} />
        </div>
      </div>
    );
  }
}
