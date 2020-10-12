import { createStore, combineReducers } from 'redux'
import HomeNewsReducer from '../reducer/HomeReducer'
import CommonReducer from '../reducer/CommonReducer'
import BusinessReducer from '../reducer/BusinessReducer'
import TechReducer from '../reducer/TechReducer'
import WallstreetReducer from '../reducer/WallstreetReducer'


const appreducer = combineReducers({
    HomeNewsReducer,
    BusinessReducer,
    CommonReducer,
    TechReducer,
    WallstreetReducer
})

const store = createStore(appreducer, {})

export default store;