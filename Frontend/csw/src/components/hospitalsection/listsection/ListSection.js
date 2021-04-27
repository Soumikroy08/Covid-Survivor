import React, { Component } from 'react'
import { connect } from 'react-redux'
import Details from './details/Details'
import List from './list/List'
import styles from './ListSection.module.css'

class ListSection extends Component {
    
    constructor(props) {
        super (props)
        this.state = {
            hospitals: []
        }
    }

    componentDidMount = () =>{
        
    }
    
    render() {
        return (
            <div className={styles.listsection}>
                <div className={styles.titlebar}>
                    <div className={styles.blueline}></div>
                    <div className={styles.title}>Hospital Information</div>
                </div>
                {!this.props.hospitaldetails &&
                <div>
                {this.props.hospitals.map((obj) => {
                    return (
                        <List id={obj.hospitalid}
                            hospitalid={obj.hospitalid} 
                            hospitalname={obj.hospitalname} 
                            hospitalarea={obj.hospitaladd}
                            hospitallon={obj.hospitallon} 
                            hospitallat={obj.hospitallat} />
                    )
                })}
                </div>}
                {this.props.hospitaldetails && <Details/>}
            </div>
        )
    }
}

const mapStateToPros = (state) => {
    return { ...state.map, ...state.dashboard };
  };
  
  export default connect(mapStateToPros)(ListSection)
