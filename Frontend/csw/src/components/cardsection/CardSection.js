import React, { Component } from 'react'
import Card from './card/Card'
import styles from './CardSection.module.css'
import beds from '../../images/bed.png'
import cases from '../../images/cases.png'
import survivors from '../../images/survivors.png'
import vaccination from '../../images/vaccination.png'
import { connect } from 'react-redux'

class CardSection extends Component {
    
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount () {
        this.onLoadStateWiseCovidData()
        this.onLoadBedsDetails()
    }
    
    onLoadStateWiseCovidData = () => {
        fetch(process.env.REACT_APP_SERVICE_URL + '/getStateWiseCovidData?state=Assam')
        .then(response => response.text())
        .then(data => {
          
            this.props.dispatch({
                type: 'totalactivecases',
                totalactivecases: JSON.parse(data).TotalActive,
            })
            this.props.dispatch({
                type: 'totalrecoveredcases',
                totalrecoveredcases: JSON.parse(data).TotalRecovered,
            })
            this.props.dispatch({
                type: 'totaldeceasedcases',
                totaldeceasedcases: JSON.parse(data).TotalDeaths,
            })
        });
    }

    onLoadBedsDetails = () => {
        fetch(process.env.REACT_APP_SERVICE_URL + '/getBedsDetails?filterby=all&value=Assam')
        .then(response => response.text())
        .then(data => {
          
            this.props.dispatch({
                type: 'totalbedsoccupied',
                totalbedsoccupied: JSON.parse(data).BedsOccupied,
            })
            this.props.dispatch({
                type: 'totalbedsvacant',
                totalbedsvacant: JSON.parse(data).BedsVacant,
            })
            
        });
    }

    render() {
        return (
            <div className={styles.cardsection}>
                <Card title="Total Beds" icon={beds} kpi1="Beds Vacant" kpi2={this.props.totalbedsvacant} kpititle1="" kpititle2="" />
                <Card title="Total Cases" icon={cases} kpi1={this.props.totalactivecases} kpi2={this.props.totaldeceasedcases} kpititle1="Active" kpititle2="Deaths" />
                <Card title="Survivors" icon={survivors} kpi1={this.props.totalrecoveredcases} kpi2="" kpititle1="" kpititle2="View Recent Survivors" title2type="hyperlink" />
                <Card title="Vaccination" icon={vaccination} kpi1="124" kpi2="67" kpititle1="Registered" kpititle2="Vaccinated"/>
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return { ...state.dashboard };
  };
  
  export default connect(mapStateToPros)(CardSection)
