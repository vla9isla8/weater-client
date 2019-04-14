import React from 'react';
export default class Weather extends React.Component {
    render() {
        return (
            <div>
                <div>Day: {this.props.dayTemperature}</div>
                <div>Night: {this.props.nightTemperature}</div>
            </div>
        );
    }
}