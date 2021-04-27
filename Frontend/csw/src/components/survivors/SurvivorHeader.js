import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import styles from "./SurvivorHeader.module.css";

class SurvivorHeader extends Component {
  render() {
    return (
      <div className={styles.survivorheadersection}>
        <div className={styles.blueline}></div>
        <div className={styles.survivorheader}>Our Survivors</div>
        <div className={styles.spacer}></div>
        <div className={styles.survivorbutton}>Are you a survivor ?</div>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return { ...state.dashboard }
}

export default withRouter(connect(mapStateToPros)(SurvivorHeader))