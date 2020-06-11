import React, { useContext } from 'react';
import './Register.scss';
import firebase from '../../../firebase/firebase';
import 'firebase/auth';
import  AuthContext  from '../../../firebase/context';
import 'firebase/firestore';
import UserResponseModel from '../../modules/users/models/user-response-model.model';

export default class Register extends React.Component {
    static contextType = AuthContext
    constructor(props) {
        super(props);

        this.props = props;
        this.handleRegister = this.handleRegister.bind(this);
    }


    async handleRegister(event) {
        //prevent default is called so that if user clicks submit not to reload the page
        event.preventDefault();
        //here we make object to be fullfilled with the list of elements that are in the form
        const { firstname, lastname, email, password } = event.target.elements;

        try {
            debugger;
            let result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
            let mapUser = new UserResponseModel(result.user.uid,result.user.email, password.value, firstname.value, lastname.value);
            firebase.firestore().collection('Users').doc(result.user.uid).set(Object.assign({}, mapUser));
            this.props.history.push("/login");

        } catch (error) {
            alert(error);
        }
    }


    render() {
        return (
                    <div className="row" >
                        <div className="col-md-4 mx-auto">
                            <div id="second">
                                <div className="myform form ">
                                    <div className="logo mb-3">
                                        <div className="col-md-12 text-center">
                                            <h1>Signup</h1>
                                        </div>
                                    </div>
                                    <form onSubmit={this.handleRegister}>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" style={{ textAlign: 'left', display: 'block' }}>Firstname</label>
                                            <input type="text" name="firstname" className="form-control" id="firstname" aria-describedby="emailHelp" placeholder="Enter firstname" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" style={{ textAlign: 'left', display: 'block' }}>Lastname</label>
                                            <input type="text" name="lastname" id="lastname" className="form-control" aria-describedby="emailHelp" placeholder="Enter lastname" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" style={{ textAlign: 'left', display: 'block' }}>Email address</label>
                                            <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1" style={{ textAlign: 'left', display: 'block' }}>Password</label>
                                            <input type="password" name="password" id="password" className="form-control" aria-describedby="emailHelp" placeholder="Enter Password" />
                                        </div>
                                        <div className="col-md-12 text-center mb-3">
                                            <button type="submit" className=" btn btn-block mybtn btn-primary tx-tfm">Register</button>
                                        </div>
                                        <div className="col-md-12 ">
                                            <div className="form-group">
                                                <p className="text-center"><a href="/login" id="signin">Already have an account?</a></p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
        );
    }

}