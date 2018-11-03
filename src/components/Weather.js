import React from 'react';
export default class Weather extends React.Component {
    render() {
        return (
            <div>
                <div>{this.props.dayTemperature}</div>
                <div>{this.props.nightTemperature}</div>
            </div>
        );
    }
}