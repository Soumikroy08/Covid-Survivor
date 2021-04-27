import React, { Component } from "react";
import Header from "../header/Header";
import styles from "./SecondScreen.module.css";
import Survivors from "../survivors/Survivors";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class SecondScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      splash: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        splash: false,
      });
    }, 5000);
  }

  render() {
    return (
      <div className={styles.survivorssection}>
        <Survivors />
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return { ...state.dashboard }
}

export default withRouter(connect(mapStateToPros)(SecondScreen))
