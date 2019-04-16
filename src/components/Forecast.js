import React from "react";
import {connect} from "react-redux";
import {Table, TableBody, TableCell, TableHead, TableRow, Paper, withStyles} from '@material-ui/core';
import moment from "moment";
import "moment/locale/ru";

moment.locale('ru');

const weatherParams = [
    {
        title: "День",
        param: "dayTemperature"
    },
    {
        title: "Ночь",
        param: "nightTemperature"
    }
];

const styles = theme => ({
    tableWrapper: {
        overflowX: 'auto'
    }
});

class Forecast extends React.PureComponent {
    static defaultProps = {
        providers: []
    };
    render() {
        const {classes,forecast} = this.props;
        if (!forecast || !Object.keys(forecast).length) {
            return <span>Нет данных</span>;
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
        "Время суток",
        ...this.props.providers
    ].map((value) => <TableCell key={value}>{value}</TableCell>)}</TableRow>;

    getRows = () => {
        const {forecast} = this.props;
        return Object.keys(forecast).map(this.getDateRow);
    }

    getDateRow = (date) => {
        const {forecast} = this.props;
        return this.getParamsRows(forecast[date], date);
    }

    getParamsRows = (data,date) => {
        const {providers} = this.props;
        return weatherParams.map(({title,param}) => [
                title,
                ...providers.map(provider => data[provider]).map(obj => obj && obj[param])
            ]).map((values,idx) => this.getParamRow(date,values,idx));
    }

    getParamRow = (date, values,idx) => 
        <TableRow key={idx}>
            {idx === 0 && <TableCell rowSpan={weatherParams.length}>{moment(date).format("dddd L")}</TableCell>}
            {values.map((value, key) => <TableCell key={key}>{value}</TableCell>)}
        </TableRow>;

}
const mapStateToProps = ({forecast,providers}) => {
    return {
        forecast,
        providers
    }
};
Forecast = connect(mapStateToProps)(Forecast);
export default withStyles(styles)(Forecast);