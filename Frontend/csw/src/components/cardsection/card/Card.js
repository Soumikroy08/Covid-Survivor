import React, { Component } from 'react';
import styles from './Card.module.css';


export default class Card extends Component {
    render() {
        let kpititle2 = ""
        if (this.props.title2type) {
            if (this.props.title2type == 'hyperlink') {
                kpititle2 = <a className={styles.kpititle} href="#/survivors">{this.props.kpititle2}</a>
            }
        }
        else {
            kpititle2 = <div className={styles.kpititle}>{this.props.kpititle2}</div>
        }
        
        return (
            <div className={styles.card}>
                <div className={styles.titlesection}>
                    <img src={this.props.icon} className={styles.icon}/>
                    <div className={styles.title}>{this.props.title}</div> 
                </div>
                <div className={styles.kpisection}>
                        <div className={styles.kpi}>
                            <div className={styles.digit}>{this.props.kpi1}</div>
                            <div className={styles.kpititle}>{this.props.kpititle1}</div>
                        </div>
                        <div className={styles.divider}></div>
                        <div className={styles.kpi}>
                            <div className={styles.digit}>{this.props.kpi2}</div>
                            {kpititle2}
                        </div>
                    </div>
            </div>
        )
    }
}
