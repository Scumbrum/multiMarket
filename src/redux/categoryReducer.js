const initialState = {
    categories: [],
    selected: -1,
    error: null
}

export default function categoryReducer(state = initialState, action) {
    switch(action.type) {
        case "FetchCategories":
            return {...state, categories: action.payload}
        case "SelectCategory":
            return {...state, selected: action.payload}
        case "SetCategoryError":
            return {...state, error: action.payload}
        default:
            return state
    }
}