import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import LoadingScreen from './LoadingScreen'
import SurvivorHeader from './SurvivorHeader'
import styles from './Survivors.module.css'
import SurvivorsList from './SurvivorsList'

class Survivors extends Component {
    onGoBack = () => {
        this.props.history.push('/')
    }
    render() {
        return (
            <div className={styles.survivorscard}>
                <SurvivorHeader/>
                <div className={styles.gobacklink} onClick={this.onGoBack} >Go Back</div>
                {!this.props.survivorsloading &&  <SurvivorsList/>}
                {this.props.survivorsloading &&  <LoadingScreen/>}
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return { ...state.dashboard }
  }

export default withRouter(connect(mapStateToPros)(Survivors))