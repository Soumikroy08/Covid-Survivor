import React, { Component } from "react";
import "ol/ol.css";
import { Map, Overlay, View } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import "./OLMap.css";
import { connect } from "react-redux";

class OLMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hospitals: [],
      hospitalmarkersenablestate: false,
    };
  }

  componentDidMount() {
    let currentLongLat = this.props.selectedLonLat;
    let currentCoordinates = fromLonLat(currentLongLat);

    this.map = new Map({
      target: "map",
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: currentCoordinates,
        zoom: 8,
      }),
    });

    // fetch("http://localhost:5000/getHospitals")
    //   .then((response) => response.text())
    //   .then((data) => {
    //     let hospitals = JSON.parse(data).data;
    //     this.setState({
    //       hospitals: hospitals,
    //     });

    //     this.addHospitalMarkers();
    //   });

    this.addHospitalMarkers();
  }

  addHospitalMarkers = () => {
    // for (var i = 0; i < this.state.hospitals.length; i++) {
    var pos = fromLonLat([
      // parseFloat(this.state.hospitals[i]["hospitallong"]),
      // parseFloat(this.state.hospitals[i]["hospitallat"]),
      parseFloat(this.props.selectedLonLat[0]),
      parseFloat(this.props.selectedLonLat[1]),
    ]);

    this.setState({
      hospitalmarkersenablestate: true,
    });

    var marker = new Overlay({
      position: pos,
      positioning: "center-center",
      element: document.getElementById(
        // "marker_" + this.state.hospitals[i].hospitalid
        "marker_1"
      ),
      stopEvent: false,
    });
    this.map.addOverlay(marker);
    // }

    this.props.dispatch({
      type: "map",
      map: this.map,
    });
  };

  render() {
    return (
      <div id="map">
        {/* {this.state.hospitalmarkersenablestate && <div>
          {this.state.hospitals.map((obj) => {
            return (
              <div
                id={"marker_" + obj.hospitalid}
                className="marker"
                title={obj.hospitalname}
              // >{obj.hospitalid}</div>
              ></div>
            );
          })}
        </div>} */}
        <div
          id={"marker_1"}
          className="marker"
          // >{obj.hospitalid}</div>
        ></div>
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return { ...state.map };
};

export default connect(mapStateToPros)(OLMap);
