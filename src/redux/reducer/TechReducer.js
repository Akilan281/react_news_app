import { TECH_NEWS } from '../action/Action'

const initialstate = { techlist: [] }

function TechReducer(state = initialstate, action) {
    switch (action.type) {
        case TECH_NEWS:
            return Object.assign({}, state, { techlist: action.payload })
        default:
            return state
    }

}
export default TechReducer