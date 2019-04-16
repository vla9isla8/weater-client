import React from "react";
import {connect} from "react-redux";
import Weather from "./Weather";
import {Table, TableBody, TableCell, TableHead, TableRow, Paper, withStyles} from '@material-ui/core';
import moment from "moment";
import "moment/locale/ru";

moment.locale('ru');
const styles = theme => ({
    tableWrapper: {
        padding: theme.spacing.unit,
        overflowX: 'auto',
    }
});

class Forecast extends React.PureComponent {
    static defaultProps = {
        forecast: [],
        providers: []
    };
    render() {
        const {classes,forecast} = this.props;
        if (!forecast && !forecast.lenght) {
            return <span>Not Found</span>;
        }
        return (
            <Paper className={classes.tableWrapper}>
                <Table>
                    <TableHead>{this.getHead()}</TableHead>
                    <TableBody>{this.getRows()}</TableBody>
                </Table>
            </Paper>
        );
    }

    getHead = () => <TableRow>{[
        "Дата",
        ...this.props.providers
    ].map((value) => <TableCell key={value}>{value}</TableCell>)}</TableRow>;

    getRows = () => {
        const {forecast} = this.props;
        return Object.keys(forecast).map(date => <TableRow key={date}>{this.getDateRow(date)}</TableRow>);
    }

    getDateRow = (date) => {
        return [
            moment(date).format("dddd L"),
            ...this.props.providers.map(provider => <Weather {...this.props.forecast[date][provider]} />)
        ].map((value,idx)=> <TableCell key={idx}>{value}</TableCell>);
    }

}
const mapStateToProps = ({forecast,providers}) => {
    return {
        forecast,
        providers
    }
};
Forecast = connect(mapStateToProps)(Forecast);
export default withStyles(styles)(Forecast);