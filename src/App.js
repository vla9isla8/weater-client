import React, {Component} from 'react';
import SearchForm from './components/SearchForm'
import './App.css';
import Forecast from "./components/Forecast";
import {searchForecast} from './actions';
import {connect} from "react-redux";

class App extends Component {
  render() {
    return (
        <div className="App">
            <SearchForm onSubmit={this.props.searchForecast}/>
            <Forecast/>
            <div className="error">{this.props.forecastError}</div>
            <div className="error">{this.props.providersError}</div>
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

export default App;
