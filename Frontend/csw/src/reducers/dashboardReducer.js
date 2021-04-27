import {
  hospitaldetails,
  hospitalidselected,
  hospitals,
  busyindicator,
  totaldeceasedcases,
  totalactivecases,
  totalrecoveredcases,
  totalbedsvacant,
  totalbedsoccupied,
  survivorsloading
} from "../actions/index";

const initialState = {
  hospitaldetails: false,
  hospitalidselected: 0,
  hospitals: [],
  busyindicator: false,
  totaldeceasedcases: 0,
  totalactivecases: 0,
  totalrecoveredcases: 0,
  totalbedsvacant: 0,
  totalbedsoccupied: 0,
  survivorsloading: false
};

function dashboardReducer(state = initialState, actions) {
  switch (actions.type) {
    case hospitaldetails:
      return { ...state, hospitaldetails: actions.hospitaldetails };
    case hospitalidselected:
      return { ...state, hospitalidselected: actions.hospitalidselected };
    case hospitals:
      return { ...state, hospitals: actions.hospitals };
    case busyindicator:
      return { ...state, busyindicator: actions.busyindicator };
    case totaldeceasedcases:
      return { ...state, totaldeceasedcases: actions.totaldeceasedcases };
    case totalactivecases:
      return { ...state, totalactivecases: actions.totalactivecases };
    case totalrecoveredcases:
      return { ...state, totalrecoveredcases: actions.totalrecoveredcases };
    case totalbedsvacant:
      return { ...state, totalbedsvacant: actions.totalbedsvacant };
    case totalbedsoccupied:
      return { ...state, totalbedsoccupied: actions.totalbedsoccupied };
    case survivorsloading:
      return { ...state, survivorsloading: actions.survivorsloading };
    default:
      return state;
  }
}

export default dashboardReducer;
