import React, { Component } from 'react'
import styles from './SplashScreen.module.css'

export default class SplashScreen extends Component {
    componentWillUnmount () {

    }

    render() {
        return (
            <div id="splashscreen" className={styles.splashscreen}>
                <div className={styles.splashcomponent}>
                    <div className={styles.maintitle}>
                        Healthcare Warriors
                    </div>
                    <div className={styles.subtitle}>
                        A Silver Lining Amidst the Darkness of the Pandemic
                    </div>
                </div>
            </div>
        )
    }
}
