import React from 'react';

export default class MainSpinner extends React.Component {
    render() {
        return (
            <div className="spinner-container flex row center">
                <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            </div>
        )
    }
}