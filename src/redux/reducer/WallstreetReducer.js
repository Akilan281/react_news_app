import { WALSTREET_NEWS } from '../action/Action'

const initialstate = { wallstreetlist: [] }

function WallstreetReducer(state = initialstate, action) {
    switch (action.type) {
        case WALSTREET_NEWS:
            return Object.assign({}, state, { wallstreetlist: action.payload })
        default:
            return state
    }

}
export default WallstreetReducer