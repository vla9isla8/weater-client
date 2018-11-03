import React from "react";
import {connect} from "react-redux";
import Weather from "./Weather";

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
        const head = (<tr><th/>{dates.map((date,key) => (<th key={key}>{date}</th>))}</tr>);
        const rows = this.props.providers.map((provider,key) => {
            const row = data.map((dateData,key) => (<td key={key}>{<Weather {...dateData[provider]} />}</td>));
            return (<tr key={key}><td>{provider}</td>{row}</tr>);
        });
        return (
            <div>
                <table>
                    <thead>{head}</thead>
                    <tbody>{rows}</tbody>
                </table>
            </div>
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