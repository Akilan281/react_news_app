import { LOADER } from '../action/Action'

const initialstate = { loader: false }

function CommonReducer(state = initialstate, action) {
    switch (action.type) {
        case LOADER:
            return Object.assign({}, state, { loader: action.payload })
        default:
            return state
    }

}
export default CommonReducer;