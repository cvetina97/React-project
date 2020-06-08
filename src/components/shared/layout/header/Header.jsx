import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './Header.scss';
import { Link, Redirect, Switch } from 'react-router-dom';
import AuthContext from '../../../../firebase/context';

export default class Header extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.currentUser = localStorage.getItem('currentUser');
    }

    logout() {
        firebase.auth().signOut().then(
            localStorage.clear()
        );

        return <Redirect to="/login" />
    }

    render() {
        return (
            < nav className="navbar navbar-expand-lg navbar-light bg-light" >
                <a href="#" className="navbar-brand" >
                    <img src="https://i.ya-webdesign.com/images/png-icons-free-for-commercial-use-8.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                    Task Manager
                    </a>
                {this.currentUser && <Redirect to="/" />
                    ? (<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link {...this.props} className="nav-item nav-link" to="/">Home</Link>
                            <Link {...this.props} className="nav-item nav-link" to="/users">Users</Link>
                            <Link {...this.props} className="nav-item nav-link" to="/tasks">Tasks</Link>
                            <Link {...this.props} className="nav-item nav-link" to="/login" onClick={this.logout}>Logout</Link>
                        </div>
                    </div>)
                    : (<div className="navbar-nav">
                        <Link className="nav-item nav-link" to="/register">Register</Link>
                        <Link className="nav-item nav-link" to="/login">Login</Link>
                    </div>)
                }
            </nav >
        );
    }
}