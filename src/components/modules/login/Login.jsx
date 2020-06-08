import React from 'react';
import './Login.scss';
import firebase from '../../../firebase/firebase';
import 'firebase/auth';
import AuthContext from '../../../firebase/context';
import UserService from '../../shared/services/user.service';

export default class Login extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);

        this.props = props;
        this.handleLogin = this.handleLogin.bind(this);
        this.userService = new UserService();
    }

    async handleLogin(event) {
        debugger;
        //prevent default is called so that if user clicks submit not to reload the page
        event.preventDefault();
        //here we make object to be fullfilled with the list of elements that are in the form
        let { email, password } = event.target.elements;

        try {
            let result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
            if (result) {
                let userModel = await this.userService.getUserByEmail(email.value);
                debugger;
                this.context.updateCurrentUser(userModel);
                this.props.history.push("/");
            }
        } catch (error) {
            alert(error);
        }
    };

    render() {
        return (
            <div className="row">
                <div className="col-md-4 mx-auto">
                    <div id="first">
                        <div className="myform form ">
                            <div className="logo mb-3">
                                <div className="col-md-12 text-center">
                                    <h1>Login</h1>
                                </div>
                            </div>
                            <form onSubmit={this.handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Password</label>
                                    <input type="password" name="password" id="password" className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" />
                                </div>
                                <div className="form-group">
                                    <p className="text-center">By signing up you accept our <a href="#">Terms Of Use</a></p>
                                </div>
                                <div className="col-md-12 text-center ">
                                    <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                                </div>
                                <div className="col-md-12 ">
                                    <div className="login-or">
                                        <hr className="hr-or" />
                                        <span className="span-or">or</span>
                                    </div>
                                </div>
                                <div className="col-md-12 mb-3">
                                    <p className="text-center">
                                        <a href="#" className="google btn mybtn"><i className="fa fa-google-plus">
                                        </i> Signup using Google
                                            </a>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <p className="text-center">Don't have account? <a href="#" id="signup">Sign up here</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}