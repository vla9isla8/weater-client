import React from 'react';
export default class Weather extends React.Component {
    render() {
        return (
            <div>
                <div>Днем: {this.props.dayTemperature}</div>
                <div>Ночью: {this.props.nightTemperature}</div>
            </div>
        );
    }
}