import {combineReducers} from 'redux'
import mapReducer from './mapReducer'
import dashboardReducer from './dashboardReducer'

const reducers = combineReducers({map: mapReducer, dashboard: dashboardReducer})

export default reducers;