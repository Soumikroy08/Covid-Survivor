import React, { Component } from 'react'
import { connect } from 'react-redux'
import BusyScreen from './busyscreen/BusyScreen'
import styles from './HospitalSection.module.css'
import ListSection from './listsection/ListSection'

import MapSection from './mapsection/MapSection'

class HospitalSection extends Component {
    render() {
        return (
            <div className={styles.hospitalsection}>
                {this.props.busyindicator && <BusyScreen/>}
                {!this.props.busyindicator && <ListSection/>}
                <MapSection />
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return { ...state.map, ...state.dashboard };
  };
  
  export default connect(mapStateToPros)(HospitalSection)