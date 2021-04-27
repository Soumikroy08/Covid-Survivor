import { Overlay } from "ol";
import { fromLonLat } from "ol/proj";
import React, { Component } from "react";
import { connect } from "react-redux";
import styles from "./List.module.css";

class List extends Component {
  constructor(props) {
    super(props);
  }

  onSelectHospital = (event) => {
    // debugger;
    this.props.dispatch({
        type: "hospitalidselected",
        hospitalidselected: event.currentTarget.id,
      });
    fetch(
      process.env.REACT_APP_SERVICE_URL + "/getHospitalById?hospitalid=" +
      event.currentTarget.id
    )
      .then((response) => response.text())
      .then((data) => {
        let hospital = JSON.parse(data).data;

        this.props.map
          .getView()
          .setCenter(
            fromLonLat([
              JSON.parse(data).data[0].hospitallon,
              JSON.parse(data).data[0].hospitallat,
            ])
          );
        this.props.map.getView().setZoom(18);

        var pos = fromLonLat([
            parseFloat(JSON.parse(data).data[0].hospitallon),
            parseFloat(JSON.parse(data).data[0].hospitallat),
          ]);
        var marker = new Overlay({
            position: pos,
            positioning: "center-center",
            element: document.getElementById(
              // "marker_" + this.state.hospitals[i].hospitalid
              "marker_1"
            ),
            stopEvent: false,
          });
          this.props.map.addOverlay(marker);


        this.props.dispatch({
          type: "hospitaldetails",
          hospitaldetails: true,
        });

        this.props.dispatch({
            type: 'selectedLonLat',
            selectedLonLat: [JSON.parse(data).data[0].hospitallon, JSON.parse(data).data[0].hospitallats]
        })
        
      });
  };

  render() {
    return (
      <div
        id={this.props.hospitalid}
        className={styles.list}
        onClick={this.onSelectHospital}
      >
        <div className={styles.listno}>{this.props.hospitalid}</div>
        <div className={styles.hostpital}>
          <div className={styles.name}>{this.props.hospitalname}</div>
        </div>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return { ...state.map, ...state.hospitaldetails };
};

export default connect(mapStateToPros)(List);
