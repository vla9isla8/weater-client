const searchForecast = (state = [], action) => {
    switch (action.type) {
        case 'SET_FORECAST':
            return {
                ...state,
                forecast: action.payload
            };
        case "SET_PROVIDERS":
            return {
                ...state,
                providers: action.payload
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            };
        default:
            return state
    }
};

export default searchForecast;
