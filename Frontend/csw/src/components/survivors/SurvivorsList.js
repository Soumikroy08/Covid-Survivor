import React, { Component } from "react";
import styles from "./SurvivorsList.module.css";
import SurvivorOverview from "./SurvivorOverview";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class SurvivorsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      survivors: [],
    };
  }

  componentDidMount() {
    // this.props.dispatch({
    //     type: 'survivorsloading',
    //     survivorsloading: true
    // })
    fetch(process.env.REACT_APP_SERVICE_URL + "/getAllSurvivors")
      .then((response) => response.text())
      .then((data) => {
        this.setState({
          survivors: JSON.parse(data).data,
        });
        this.props.dispatch({
            type: 'survivorsloading',
            survivorsloading: false
        })
      });
  }

  render() {
    return (
      <div className={styles.survivorslist}>
        {this.state.survivors.map((obj) => {
          return (
            <SurvivorOverview
              survivorid={obj.survivorid}
              survivorname={obj.survivorname}
              survivorage={obj.survivorage}
              survivorgender={obj.survivorgender}
              survivorpic={obj.survivorpic}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToPros = (state) => {
    return { ...state.dashboard }
  }

export default withRouter(connect(mapStateToPros)(SurvivorsList))
