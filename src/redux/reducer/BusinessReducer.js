import { BUSINESS_NEWS } from '../action/Action'

const initialstate = { businesslist: [] }

function BusinessReducer(state = initialstate, action) {
    switch (action.type) {
        case BUSINESS_NEWS:
            return Object.assign({}, state, { businesslist: action.payload })
        default:
            return state
    }

}
export default BusinessReducer