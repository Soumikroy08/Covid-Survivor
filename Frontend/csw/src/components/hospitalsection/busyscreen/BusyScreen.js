import React, { Component } from 'react'
import styles from './BusyScreen.module.css'

export default class BusyScreen extends Component {
    render() {
        return (
            <div className={styles.listsection}>
                <div className={styles.titlebar}>
                    <div className={styles.blueline}></div>
                    <div className={styles.title}>Hospital Information</div>
                </div>
                <div className={styles.loading}>Loading...</div>
            </div>
        )
    }
}
