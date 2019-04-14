const hostname = window.location.hostname;
const baseUrl = process.env.NODE_ENV !== 'production' ? "http://192.168.1.100:4000/api" : "http://" + hostname + ":4000/api/";

export const searchForecast = ({city,days}) => {
    return  (dispatch) => {
        dispatch({
            type: "SEARCH_FORM_SUBMIT",
            city,
            days,
            loading: true
        });

        const providersUrl =  baseUrl + "/weather/providers";
        let forecastUrl = baseUrl + "/weather/forecast";
        if (city) {
            forecastUrl += "?city=" + city;
            if (days) {
                forecastUrl += "&days=" + days;
            }
        }
        fetch(forecastUrl)
            .then(
                response => {
                    if (!response.ok) {
                        return response.text()
                            .then(text=>{
                                throw Error(JSON.parse(text).message);
                            });
                    }
                    return response.text()
                })
            .then(data => {
                dispatch({
                    type: "SEARCH_FORECAST",
                    forecast: JSON.parse(data),
                    loading: false,
                })
            })
            .catch(error => {
                dispatch({
                    type: "SEARCH_FORECAST",
                    error: true,
                    loading: false,
                    payload: {
                        error: error.message
                    }
                })
            });
        fetch(providersUrl)
            .then(response => {
                if (!response.ok) {
                    return response.text()
                        .then(text=>{
                            throw Error(JSON.parse(text).message);
                        });
                }
                return response.text()
            })
            .then(data => dispatch({
                type: "SEARCH_PROVIDERS",
                providers: JSON.parse(data)
            }))
            .catch(error => dispatch({
                    type: "SEARCH_PROVIDERS",
                    error: true,
                    payload: {
                        error: error.message
                    }
                }));
    }
};