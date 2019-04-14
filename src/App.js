import React, {Component} from 'react';
import SearchForm from './components/SearchForm'
import Forecast from "./components/Forecast";
import {searchForecast} from './actions';
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});
class App extends Component {
  render() {
      return (
        <div className={this.props.classes.root} >
            <Grid container spacing={24} >
                <Grid item md={3} zeroMinWidth>
                    <SearchForm onSubmit={this.props.searchForecast}/>
                </Grid>
                <Grid item md={9} zeroMinWidth>
                    <Forecast/>
                </Grid>
                <Grid item md={12}>
                    <div className="error">{this.props.forecastError}</div>
                    <div className="error">{this.props.providersError}</div>
                </Grid>
            </Grid>
        </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        forecastError: state.forecastError,
        providersError: state.providersError,
    }
};
const mapDispatchToProps = dispatch => {
    return {
        searchForecast: (values) => {
            dispatch(searchForecast(values))
        }
    }
};
App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);