import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import './Header.scss';
import { Link, Redirect } from 'react-router-dom';
import AuthContext from '../../../../firebase/context';

export default class Header extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.currentUser = localStorage.getItem('currentUser');
        this.loadHeaderAccordingToUser = this.loadHeaderAccordingToUser.bind(this);
    }

    async logout() {
        await firebase.auth().signOut();
        this.context.updateCurrentUser(null);
        localStorage.clear();
        return <Redirect to="/login" />;
    }

    loadHeaderAccordingToUser() {
        if (this.context.currentUser == null && this.currentUser == null) {
            return (
                (<div className="navbar-nav">
                    <Link className="nav-item nav-link" to="/register">Register</Link>
                    <Link className="nav-item nav-link" to="/login">Login</Link>
                </div>)
            );
        }
        else if ((this.context.currentUser !== null && this.context.currentUser.isAdmin) || (this.currentUser != null && JSON.parse(this.currentUser).isAdmin)) {
            return (
                <div className="navbar-nav">
                    <Link {...this.props} className="nav-item nav-link" to="/">Home</Link>
                    <Link {...this.props} className="nav-item nav-link" to="/users">Users</Link>
                    <Link {...this.props} className="nav-item nav-link" to="/tasks">Tasks</Link>
                    <Link {...this.props} className="nav-item nav-link" to="/tasks/userTasks">MyTasks</Link>
                    <Link {...this.props} className="nav-item nav-link" to="/login" onClick={this.logout}>Logout</Link>
                </div>
            );
        }
        else {
            return (
                <div className="navbar-nav">
                    <Link {...this.props} className="nav-item nav-link" to="/">Home</Link>
                    <Link {...this.props} className="nav-item nav-link" to="/tasks">Tasks</Link>
                    <Link {...this.props} className="nav-item nav-link" to="/tasks/userTasks">MyTasks</Link>
                    <Link {...this.props} className="nav-item nav-link" to="/login" onClick={this.logout}>Logout</Link>
                </div>
            );
        }
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a href="#" className="navbar-brand" >
                    <img src="https://i.ya-webdesign.com/images/png-icons-free-for-commercial-use-8.png" width="30" height="30" className="d-inline-block align-top" alt="" />
                    Task Manager
                    </a>
                {this.loadHeaderAccordingToUser()}
            </nav >
        );
    }
}