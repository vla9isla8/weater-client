import React from "react";
import {connect} from "react-redux";
import Weather from "./Weather";
import {Table, TableBody, TableCell, TableHead, TableRow, Paper, withStyles} from '@material-ui/core';
import moment from "moment";
import "moment/locale/ru";

moment.locale('ru');
const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });

class Forecast extends React.PureComponent {
    static defaultProps = {
        forecast: [],
        providers: []
    };
    render() {
        const {classes} = this.props;
        const dates = Object.keys(this.props.forecast);
        if(!dates.length) {
            return "";
        }
        const data = Object.values(this.props.forecast);
        const head = (<TableRow><TableCell/>{dates.map((date,key) => <TableCell key={key}>{moment(date).format("L")}</TableCell>)}</TableRow>);
        const rows = this.props.providers.map((provider,key) => {
            const row = data.map((dateData,key) => (<TableCell key={key}>{<Weather {...dateData[provider]} />}</TableCell>));
            return (<TableRow key={key}><TableCell>{provider}</TableCell>{row}</TableRow>);
        });
        return (
            <Paper className={classes.tableWrapper}>
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
export default withStyles(styles)(Forecast);