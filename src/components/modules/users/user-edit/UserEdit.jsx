import { Redirect } from 'react-router-dom';
import React from 'react';
import UserService from '../../../shared/services/user.service';
import UserResponseModel from '../models/user-response-model.model';

export class EditUser extends React.Component {
    constructor(props) {
        super(props);

        this.loggedUser = localStorage.getItem('currentUser');
        this.state = {
            user: { id: '', email: '', firstName: '', lastName: '', password: '', isAdmin: false },
            shouldRedirect: false
        };

        this.userService = new UserService();
        this.onInputChange = this.onInputChange.bind(this);
        this.onUserSave = this.onUserSave.bind(this);
        this.onCheckBoxChange = this.onCheckBoxChange.bind(this);
        console.log(this.state.user);
    }

    componentDidMount() {
        debugger;
        if (this.props.match.params.id) {
            this.userService.getUserById(this.props.match.params.id).then(
                result => {
                    console.log(result);
                    this.setState({
                        user: { id: this.props.match.params.id, email: result.email, firstName: result.firstName, lastName: result.lastName, password: result.password, isAdmin: result.isAdmin }
                    });
                }
            );
        }
    }

    onInputChange = (event) => {
        debugger;
        event.persist();
        this.setState((prevState) => ({
            user: { ...prevState.user, [event.target.name]: event.target.value }
        }));
    }

    onCheckBoxChange = (event) => {
        debugger;
        event.persist();
        this.setState((prevState) => ({
            user: { ...prevState.user, [event.target.name]: event.target.checked }
        }));
    };

    async onUserSave(event) {
        debugger;
        if (this.props.match.params.id) {
            event.preventDefault();
            let result = await this.userService.updateUser(this.state.user);
            if (result) {
                this.setState({
                    user: { id: this.props.match.params.id, email: result.email, firstName: result.firstName, lastName: result.lastName, password: result.password, isAdmin: result.isAdmin },
                    shouldRedirect: true
                });
            }
        }
        else {
            debugger;
            event.preventDefault();
            let newUser = new UserResponseModel(null, this.state.user.email, this.state.user.password, this.state.user.firstName, this.state.user.lastName, this.state.user.isAdmin);
            debugger;
            let user = await this.userService.addUser(newUser);
            if (user) {
                newUser.id = user.id;
                this.setState({
                    user: newUser,
                    shouldRedirect: true
                });
            }
        }

    }

    render() {
        return (
            <>
                {this.state.shouldRedirect && <Redirect to='/users' />}
                <div className="user-edit-wrapper">
                    <form className="user-edit-form" onSubmit={this.onUserSave}>
                        <div className="form-group">
                            <label labelfor="name">FirstName: </label>
                            <input type="text" name="firstName" id="firstName" className="form-control" onChange={this.onInputChange} value={this.state.user.firstName} />
                        </div>
                        <div className="form-group">
                            <label labelfor="age">LastName: </label>
                            <input type="text" name="lastName" id="lastName" className="form-control" onChange={this.onInputChange} value={this.state.user.lastName} />
                        </div>
                        <div className="form-group">
                            <label labelfor="email">Email: </label>
                            <input type="email" name="email" id="email" className="form-control" onChange={this.onInputChange} value={this.state.user.email} />
                        </div>
                        <div className="form-group">
                            <label labelfor="password">Password: </label>
                            <input type="password" name="password" id="password" className="form-control" onChange={this.onInputChange} value={this.state.user.password} />
                        </div>
                        <div className="form-group">
                            <label labelfor="isAdmin">Is Admin: </label>
                            <input type="checkbox" name="isAdmin" id="isAdmin" className="form-control" onChange={this.onCheckBoxChange} checked={this.state.user.isAdmin} />
                        </div>
                        <button className="btn btn-success">Save user</button>
                    </form>
                </div>
            </>
        )
    }
}