import React, {PureComponent} from 'react';
import {Button, TextField, withStyles,FormControl,Paper} from '@material-ui/core';
import PropTypes from 'prop-types';
import {searchForecast, getProviders} from "../actions";
import {connect} from "react-redux";

const styles = theme => ({
    container: {
        padding: theme.spacing.unit
    },
    root: {
        display: 'flex',
        justifyContent: "center"
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    }
});

class SearchForm extends PureComponent {
    state = {
        city: localStorage.getItem("city") || "",
        days: localStorage.getItem("days") || 7
    };
    componentDidMount = () => {
        this.props.getProviders();
        this.props.searchForecast({city:this.state.city, days: this.state.days});
    };
    handleCityChange = (e) => {
        const value = e.target.value;
        this.setState({
            city: value
        });
        localStorage.setItem("city",value);
    };
    handleDaysChange = (e) => {
        const value = e.target.value;
        this.setState({
            days: value
        });
        localStorage.setItem("days",value);
    };
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchForecast({city:this.state.city, days: this.state.days});
    };
    render() {
        const {classes} = this.props;
        const {city,days} = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <Paper className={classes.container}>
                    <FormControl classes={{
                        root: classes.root
                    }}>
                        <TextField
                            required
                            label="Город"
                            className={classes.textField}
                            value={city}
                            margin="normal"
                            onChange={this.handleCityChange}
                            name="city"
                            type="text"
                        />
                        <TextField
                            className={classes.textField}
                            label="Дней"
                            margin="normal"
                            value={days}
                            onChange={this.handleDaysChange}
                            type="number"
                            name="days"
                        />
                        <Button type="submit">Search</Button>
                    </FormControl>
                </Paper>
            </form>

        )
    }
}
SearchForm.propTypes = {
    classes: PropTypes.object.isRequired,
};
const mapDispatchTiProps = {
    searchForecast,
    getProviders
}
export default connect(null, mapDispatchTiProps)(withStyles(styles)(SearchForm));