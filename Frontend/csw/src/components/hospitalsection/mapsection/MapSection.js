import React, { Component } from "react";
import styles from "./MapSection.module.css";
import OLMap from "./map/OLMap";
import { connect } from "react-redux";
import { fromLonLat } from "ol/proj";
import Popover from "../../popover/Popover";

class MapSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      districts: [],
      cities: [],
      // selectedLonLat: [92.9376, 26.2006],
      selectedLonLat: [80.1863809,15.9240905],
      vaccineregistration: false,
    };
  }

  componentDidMount() {
    this.onLoadStates();

    this.props.dispatch({
      type: "busyindicator",
      busyindicator: true,
    });
    fetch(process.env.REACT_APP_SERVICE_URL + "/getHospitals")
      .then((response) => response.text())
      .then((data) => {
        this.props.dispatch({
          type: "busyindicator",
          busyindicator: false,
        });
        this.setState({
          hospitals: JSON.parse(data).data,
        });
        this.props.dispatch({
          type: "hospitals",
          hospitals: JSON.parse(data).data,
        });
        this.props.dispatch({
          type: "busyindicator",
          busyindicator: false,
        });
      });
  }

  onLoadStates = () => {
    fetch(process.env.REACT_APP_SERVICE_URL + "/getStates")
      .then((response) => response.text())
      .then((data) => {
        this.setState({
          states: JSON.parse(data).data,
          selectedLonLat: [
            JSON.parse(data).data[0].statelon,
            JSON.parse(data).data[0].statelat,
          ],
        });
      });
  };

  onSelectState = () => {
    let selectedState = document.getElementById("statefilter").value;

    fetch(
      process.env.REACT_APP_SERVICE_URL +
        "/getLatitudeLongitude?place=" +
        selectedState
    )
      .then((response) => response.text())
      .then((data) => {
        let stateLon = JSON.parse(data).placelon;
        let stateLat = JSON.parse(data).placelat;

        this.props.map.getView().setCenter(fromLonLat([stateLon, stateLat]));
        this.props.map.getView().setZoom(8);

        let stateid = this.state.states.filter(
          (obj) => obj.statename == selectedState
        )[0].stateid;

        this.onLoadCities(selectedState)
        this.onLoadHospitals("ByState", selectedState);
        this.onLoadStateWiseCovidData(selectedState);
        this.onLoadBedsDetails("state", selectedState);
      });
  };

  onLoadStateWiseCovidData = (state) => {
    fetch(
      process.env.REACT_APP_SERVICE_URL +
        "/getStateWiseCovidData?state=" +
        state
    )
      .then((response) => response.text())
      .then((data) => {
        this.props.dispatch({
          type: "totalactivecases",
          totalactivecases: JSON.parse(data).TotalActive,
        });
        this.props.dispatch({
          type: "totalrecoveredcases",
          totalrecoveredcases: JSON.parse(data).TotalRecovered,
        });
        this.props.dispatch({
          type: "totaldeceasedcases",
          totaldeceasedcases: JSON.parse(data).TotalDeaths,
        });
      });
  };

  onLoadCities = (selectedState) => {
    fetch(
      process.env.REACT_APP_SERVICE_URL + "/getCities?hospitalstate=" + selectedState
    )
      .then((response) => response.text())
      .then((data) => {
        this.setState({
          cities: JSON.parse(data).data,
        });
      });
  };

  onLoadBedsDetails = (filterby, value) => {
    fetch(
      process.env.REACT_APP_SERVICE_URL +
        "/getBedsDetails?filterby=" +
        filterby +
        "&value=" +
        value
    )
      .then((response) => response.text())
      .then((data) => {
        this.props.dispatch({
          type: "totalbedsvacant",
          totalbedsvacant: JSON.parse(data).BedsVacant,
        });
      });
  };

  onSelectCity = () => {
    let selectedCity = document.getElementById("cityfilter").value;

    fetch(
      process.env.REACT_APP_SERVICE_URL +
        "/getLatitudeLongitude?place=" +
        selectedCity
    )
      .then((response) => response.text())
      .then((data) => {
        let stateLon = JSON.parse(data).placelon;
        let stateLat = JSON.parse(data).placelat;

        this.props.map.getView().setCenter(fromLonLat([stateLon, stateLat]));
        this.props.map.getView().setZoom(12);

        this.onLoadHospitals("ByCity", selectedCity);
        this.onLoadBedsDetails("city", selectedCity);
      });

  };

  onLoadHospitals = (endPoint, filterValue) => {
    this.props.dispatch({
      type: "busyindicator",
      busyindicator: true,
    });

    let endPointFilterParam = "hospital" + endPoint.substr(2).toLowerCase();
    fetch(
      process.env.REACT_APP_SERVICE_URL +
        "/getHospital" +
        endPoint +
        "?" +
        endPointFilterParam +
        "=" +
        filterValue
    )
      .then((response) => response.text())
      .then((data) => {
        this.props.dispatch({
          type: "busyindicator",
          busyindicator: false,
        });
        this.setState({
          hospitals: JSON.parse(data).data,
        });
        this.props.dispatch({
          type: "hospitals",
          hospitals: JSON.parse(data).data,
        });
      });
  };

  onRegisterForVaccine = () => {
    this.setState({
      vaccineregistration: !this.state.vaccineregistration,
    });
  };

  render() {
    return (
      <div className={styles.mapsection}>
        <div className={styles.filtersection}>
          <select
            id="statefilter"
            className={styles.filter}
            onChange={this.onSelectState}
          >
            {this.state.states.map((obj) => {
              return <option>{obj.statename}</option>;
            })}
          </select>

          <select
            id="cityfilter"
            className={styles.filter}
            onChange={this.onSelectCity}
          >
            {this.state.cities.map((obj) => {
              return <option>{obj.cityname}</option>;
            })}
          </select>
        </div>
        <OLMap selectedLonLat={this.state.selectedLonLat} />
        <div
          className={styles.registerbutton}
          onClick={this.onRegisterForVaccine}
        >
          Register For Vaccine
        </div>
        {this.state.vaccineregistration && <Popover />}
      </div>
    );
  }
}

const mapStateToPros = (state) => {
  return { ...state.map };
};

export default connect(mapStateToPros)(MapSection);
