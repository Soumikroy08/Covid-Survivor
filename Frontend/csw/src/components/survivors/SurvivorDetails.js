import React, { Component } from "react";
import SurvivorHeader from "./SurvivorHeader";
import styles from "./Survivors.module.css";
import userpic from "../../images/userpic.png";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class SurvivorDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survivorname: "",
      survivorage: "",
      survivorgender: "",
      survivoremail: "",
      survivorphone: "",
      survivorstory: "",
      survivorsuggestions: "",
      survivorpic: ""
    };
  }

  componentDidMount() {
    let survivorid = window.location.href.split('/')[window.location.href.split('/').length-1]

    this.props.dispatch({
        type: 'survivorsloading',
        survivorsloading: true
    })

    fetch(process.env.REACT_APP_SERVICE_URL + "/getSurvivorById?survivorid=" + survivorid)
      .then((response) => response.text())
      .then((data) => {
        this.setState({
          survivorname: JSON.parse(data).data[0].survivorname,
          survivorage: JSON.parse(data).data[0].survivorage,
          survivorgender: JSON.parse(data).data[0].survivorgender,
          survivoremail: JSON.parse(data).data[0].survivoremail,
          survivorphone: JSON.parse(data).data[0].survivorphone,
          survivorstory: JSON.parse(data).data[0].survivorstory,
          survivorsuggestions: JSON.parse(data).data[0].survivorsuggestions,
          survivorpic: JSON.parse(data).data[0].survivorpic,
        });

        this.props.dispatch({
            type: 'survivorsloading',
            survivorsloading: false
        })

      });
  }

  onGoBack = () => {
    this.props.history.push('/survivors')
  }

  render() {
    return (
      <div className={styles.survivorssection}>
        <div className={styles.survivorscard}>
          <SurvivorHeader />
          <div className={styles.gobacklink} onClick={this.onGoBack} >Go Back</div>
          {!this.props.survivorsloading && <div className={styles.survivordetailssection}>
            <div className={styles.detailssection1}>
              {/* <img src={userpic} className={styles.survivorpicdetails} /> */}
              <img src={this.state.survivorpic} className={styles.survivorpicdetails} />
              <div className={styles.emailsection}>
                <div className={styles.label}>Email: </div>
                <div>{this.state.survivoremail}</div>
              </div>
              <div className={styles.phonesection}>
                <div className={styles.label}>Phone: </div>
                <div>{this.state.survivorphone}</div>
              </div>
            </div>
            <div className={styles.spacer}></div>
            <div className={styles.detailssection2}>
              <div className={styles.survivortitle}>
                {this.state.survivorname} | {this.state.survivorage} | {this.state.survivorgender}
              </div>
              <div className={styles.survivorstory}>
                {this.state.survivorstory}
              </div>
              <div className={styles.survivortitle}>My Suggestions</div>
              <div className={styles.survivorstory}>
                {this.state.survivorsuggestions}
              </div>
            </div>
          </div>}
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
    return { ...state.dashboard }
  }

export default withRouter(connect(mapStateToPros)(SurvivorDetails))