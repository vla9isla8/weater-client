import React from "react";
import {connect} from "react-redux";
import Weather from "./Weather";
import {Table, TableBody, TableCell, TableHead, TableRow, Paper} from '@material-ui/core';

class Forecast extends React.Component {
    static defaultProps = {
        forecast: [],
        providers: []
    };
    render() {
        const dates = Object.keys(this.props.forecast);
        if(!dates.length) {
            return "";
        }
        const data = Object.values(this.props.forecast);
        const head = (<TableRow><TableCell/>{dates.map((date,key) => (<TableCell key={key}>{date}</TableCell>))}</TableRow>);
        const rows = this.props.providers.map((provider,key) => {
            const row = data.map((dateData,key) => (<TableCell key={key}>{<Weather {...dateData[provider]} />}</TableCell>));
            return (<TableRow key={key}><TableCell>{provider}</TableCell>{row}</TableRow>);
        });
        return (
            <Paper>
                <Table>
                    <TableHead>{head}</TableHead>
                    <TableBody>{rows}</TableBody>
                </Table>
            </Paper>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        forecast: state.forecast || [],
        providers: state.providers || []
    }
};
Forecast = connect(mapStateToProps)(Forecast);
export default Forecast;