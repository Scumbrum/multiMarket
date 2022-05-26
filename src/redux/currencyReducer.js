const initialState = {
    currencies : [],
    selected: 0
}

export default function currencyReducer(state = initialState, action) {
    switch(action.type) {
        case "FetchCurrency":
            return {...state, currencies: action.payload}
        case "SelectCurrency":
            return {...state, selected: action.payload}
        default:
            return state
    }
}