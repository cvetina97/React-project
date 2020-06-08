import React from 'react';
import './Home.scss';
import 'react-bootstrap';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.loggedUser = localStorage.getItem('currentUser');
    }

    render() {
        return (
            <div className="container">
                <h2 className="display-4">Hello, {JSON.parse(this.loggedUser).firstName + " " + JSON.parse(this.loggedUser).lastName}!</h2>
                <p className="lead">This is your task manager !</p>
                <hr className="my-4" />
                <div className="wrapper">
                    <div className="headshot headshot-1"></div>
                    <div className="headshot headshot-2"></div>
                    <div className="headshot headshot-3"></div>
                </div>
            </div>
        );
    }
}