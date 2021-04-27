import React, { Component } from 'react'
import styles from './Popover.module.css'

export default class Popover extends Component {
    render() {
        return (
            <div className={styles.popover}>
                <input id="fullname" placeholder="Full Name" className={styles.inputbox}></input>
                <input id="gender" placeholder="Gender" className={styles.inputbox}></input>
                <input id="age" placeholder="Age" className={styles.inputbox}></input>
                <input id="allergicinformation" placeholder="Allergic Information" className={styles.inputbox}></input>
                <input id="contactno" placeholder="Contact No" className={styles.inputbox}></input>
                <input id="emailid" placeholder="Email Id" className={styles.inputbox}></input>
            </div>
        )
    }
}
