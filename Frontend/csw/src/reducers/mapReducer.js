import {map} from "../actions/index"

const initialState = {
    map: ""
}

function mapReducer(state = initialState, actions) {
    switch(actions.type) {
        case map:
            return {...state, map: actions.map}
        default:
            return state;
    }
}

export default mapReducer;