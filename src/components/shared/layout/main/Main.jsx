import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../../../modules/login/Login';
import Register from '../../../modules/register/Register';
import Users from '../../../modules/users/users-list/Users';
import Home from '../../../modules/home/Home';
import './Main.scss';
import AuthContext from '../../../../firebase/context';
import Tasks from '../../../modules/tasks/tasks-list/Tasks';
import { EditTask } from '../../../modules/tasks/edit-task/EditTask';
import { EditUser } from '../../../modules/users/user-edit/UserEdit';

class Main extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);

        this.loadProtectedPage = this.loadPageForAuthUser.bind(this);
    }

    loadPageForAuthUser(Component,props) {
        debugger;
        return (
            localStorage.getItem('currentUser')
                ? <Component {...props} />
                : <Redirect to='/login' />
        );
    }

    loadPageForUserAdmin(Component,props){
        debugger;
        return (
            JSON.parse(localStorage.getItem('currentUser')).isAdmin
                ? <Component {...props} />
                : <Redirect to='/' />
        );
    }

    render() {
        return (
            <div className="main-container">
                    <Route render={(props) => <Login {...props}></Login>} exact path="/login" />
                    <Route render={(props) => <Register {...props}></Register>} exact path="/register" />
                    <Route render={(props) => this.loadPageForUserAdmin(Users, props)} exact path="/users" />
                    <Route render={(props) => this.loadPageForUserAdmin(EditUser, props)} exact path="/users/create/" />
                    <Route render={(props) => this.loadPageForUserAdmin(EditUser, props)} exact path="/users/edit/:id" />
                    <Route render={(props) => this.loadPageForAuthUser(Tasks, props)} exact path="/tasks" />
                    <Route render={(props) => this.loadPageForAuthUser(EditTask, props)} exact path="/tasks/edit/:id" />
                    <Route render={(props) => this.loadPageForAuthUser(EditTask, props)} exact path="/tasks/create/" />
                    <Route render={(props) => this.loadPageForAuthUser(Tasks, props)} exact path="/tasks/userTasks/" />
                    <Route render={(props) => this.loadPageForAuthUser(Home, props)} exact path="/" />
            </div>
        );
    }
};

export default Main;