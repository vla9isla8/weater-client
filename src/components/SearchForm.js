import React, {Component} from 'react';
import {Button, TextField, withStyles,FormControl} from '@material-ui/core';
import PropTypes from 'prop-types';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

class SearchForm extends Component {
    state = {
        city: localStorage.getItem("city") || "",
        days: localStorage.getItem("days") || 7
    };
    componentDidMount = () => {
        this.props.onSubmit({city:this.state.city, days: this.state.days});
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
        this.props.onSubmit({city:this.state.city, days: this.state.days});
    };
    render() {
        return (
            <form className={this.props.classes.container} onSubmit={this.handleSubmit}>
                <FormControl>
                    <TextField
                        label="City"
                        className={this.props.classes.textField}
                        value={this.state.city}
                        margin="normal"
                        onChange={this.handleCityChange}
                        name="city"
                        type="text"
                    />
                    <TextField
                        className={this.props.classes.textField}
                        label="Days"
                        margin="normal"
                        value={this.state.days}
                        onChange={this.handleDaysChange}
                        type="number"
                        name="days"
                    />
                    <Button type="submit">Search</Button>
                </FormControl>
            </form>

        )
    }
}
SearchForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchForm);