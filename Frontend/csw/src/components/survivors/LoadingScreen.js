import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import styles from "./SurvivorsList.module.css";

class LoadingScreen extends Component {
    render() {
        return (
            <div className={styles.survivorslist}>
                Loading...
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return { ...state.dashboard }
  }

export default withRouter(connect(mapStateToPros)(LoadingScreen))