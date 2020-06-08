import React from 'react';
import UserService from '../../../shared/services/user.service';
import { Link } from 'react-router-dom';
import UserCard from '../user-card/UserCard';

export default class User extends React.Component {
    constructor(props) {
        super(props);


        this.loggedUser = localStorage.getItem('currentUser');
        this.state = {
            users: []
        };

        this.userService = new UserService();
        this.onDelete = this.onDelete.bind(this);
    }

    //when component is attached
    componentDidMount() {
        debugger;
        this.userService.getAllUsers().then(
            result => {
                this.setState({
                    users: result
                });
            }
        );
    }

    async onDelete(id) {
        debugger;
        let result = await this.userService.deleteUserById(id);
        if (result) {
            this.setState({
                users: this.state.users.filter(user => user.id !== id)
            });
        }
    }

    render() {
        return (
            <div className="card">
                <button type="button" className="btn btn-light">
                    {(JSON.parse(this.loggedUser).isAdmin) && <Link to="/users/create">Add user</Link>}
                </button>
                <div className="notes-list-wrapper d-flex">
                    {this.state.users.map(user => <UserCard user={user} key={user.id} onDeleteClick={this.onDelete} />)}
                </div>
            </div>
        );
    }
}
