import React, {Component} from 'react';
import SearchForm from './components/SearchForm'
import Forecast from "./components/Forecast";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import {withStyles} from "@material-ui/core/styles";
import { LinearProgress } from '@material-ui/core';
const styles = theme => ({
    root: {
        padding: theme.spacing.unit * 2
    },
    loader: {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 9990
    }
});
class App extends Component {
  render() {
      const {error,loading, classes} = this.props;
      return <React.Fragment>
        {loading && <LinearProgress className={classes.loader}/>}
        <Grid container spacing={16} className={classes.root} >
            <Grid item xs={12} md={4}>
                <SearchForm onSubmit={this.searchForecast}/>
            </Grid>
            <Grid item xs={12} md={8} zeroMinWidth>
                <Forecast/>
            </Grid>
            <Grid item xs={12}>
                <div className="error">{error}</div>
            </Grid>
        </Grid>
      </React.Fragment>;
  }

 }
const mapStateToProps = ({error, loading}) => {
    return {error,loading};
};

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(App));