import { Action} from "./acitionTypes"

const initialState = {
    categories: [],
    selected: -1,
    error: null
}

export default function categoryReducer(state = initialState, action) {
    switch(action.type) {
        case Action.FETCH_CATEGORIES:
            return {...state, categories: action.payload}
        case Action.SELECT_CATEGORY:
            return {...state, selected: action.payload}
        case Action.SET_CATEGORY_ERROR:
            return {...state, error: action.payload}
        default:
            return state
    }
}