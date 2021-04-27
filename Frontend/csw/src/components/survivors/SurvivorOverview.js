import React, { Component } from "react";
import styles from "./SurvivorsList.module.css";
import userpic from "../../images/userpic.png";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class SurvivorOverview extends Component {
  
  onViewStory = (event) => {
    let survivorid = event.currentTarget.id
    this.props.history.push('/survivordetails/' + survivorid)
  }
  
  render() {
    return (
      <div className={styles.survivoroverview}>
        <img src={this.props.survivorpic} className={styles.survivorpic}/>
        <div className={styles.survivorname}>
          <div className={styles.survivortitle}>
            {this.props.survivorname} | {this.props.survivorage} | {this.props.survivorgender}
          </div>
          <div id={this.props.survivorid} className={styles.viewmystorylink} onClick={this.onViewStory}>View My Story</div>
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return { ...state.dashboard }
}

export default withRouter(connect(mapStateToPros)(SurvivorOverview))