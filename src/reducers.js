const searchForecast = (state = [], action) => {
    let payload = action.payload;
    switch (action.type) {
        case 'SEARCH_FORECAST':
            return {
                ...state,
                loading: action.loading,
                forecastError: action.error && payload ? payload.error : null,
                forecast: action.forecast
            };
        case "SEARCH_PROVIDERS":
            return {
                ...state,
                providerError: action.error && payload ? payload.error : null,
                providers: action.providers
            };
        default:
            return state
    }
};

export default searchForecast;
