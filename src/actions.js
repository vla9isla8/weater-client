import axios from "./utils/axios";

export const searchForecast = ({city,days}) => {
    return async (dispatch) => {
        dispatch(setError(null));
        dispatch(setLoading(true));
        let forecastUrl = "weather/forecast";
        if (city) {
            forecastUrl += "?city=" + city;
            if (days) {
                forecastUrl += "&days=" + days;
            }
        }
        try {
            const {data} = await axios.get(forecastUrl);
            return dispatch(setForcast(data));
        } catch ({message,response}) {
            return dispatch(setError(response ? response.data.message : message));
        } finally {
            dispatch(setLoading(false));
        }
    }
};

export const getProviders = () => {
    return async (dispatch) => {
        const providersUrl = "weather/providers";
        try {
            const {data} = await axios.get(providersUrl);
            return dispatch(setProviders(data));
        } catch ({message,response}) {
            return dispatch(setError(response ? response.data.message : message));
        }
    }
};
 
export const setProviders = (providers) => ({
    type: "SET_PROVIDERS",
    payload: providers
});

export const setError = (error) => ({
    type: "SET_ERROR",
    payload: error
});

export const setLoading = (loading) => ({
    type: "SET_LOADING",
    payload: loading
});

export const setForcast = (forecast) => ({
    type: "SET_FORECAST",
    payload: forecast
});