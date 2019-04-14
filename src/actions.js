export const searchForecast = ({city,days}) => {
    return  (dispatch) => {
        const hostname = window.location.hostname;
        dispatch({
            type: "SEARCH_FORM_SUBMIT",
            city,
            days,
            loading: true
        });
        let forecastUrl = "http://" + hostname + ":4000/api/weather/forecast";
        if(city) {
            forecastUrl += "?city=" + city;
            if (days) {
                forecastUrl += "&days=" + days;
            }
        }
        const providersUrl = "http://"+hostname+":4000/api/weather/providers";
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