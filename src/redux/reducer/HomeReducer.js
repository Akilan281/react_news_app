import { HOME_NEWS } from '../action/Action'

const initialstate = { homelist: [] }

function HomeNewsReducer(state = initialstate, action) {
    switch (action.type) {
        case HOME_NEWS:
            return Object.assign({}, state, { homelist: action.payload })
        default:
            return state
    }

}
export default HomeNewsReducer