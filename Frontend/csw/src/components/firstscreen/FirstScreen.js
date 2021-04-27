import React, { Component } from 'react'
import CardSection from '../cardsection/CardSection'
import Header from '../header/Header'
import HospitalSection from '../hospitalsection/HospitalSection'
import SplashScreen from '../splashscreen/SplashScreen'
import styles from '../splashscreen/SplashScreen.module.css'

export default class FirstScreen extends Component {
    constructor(props) {
        super (props)
        this.state = {
            splash: true
        }
    }

    componentDidMount () {
        setTimeout(()=>{
            this.setState({
                splash: false
            })
            
        },5000)
    }

    render() {
        return (
            <div>
                {!this.state.splash && <Header/>}
                {!this.state.splash && <CardSection/>}
                {!this.state.splash && <HospitalSection/>}
                {this.state.splash && <SplashScreen/>}
            </div>
        )
    }
}
