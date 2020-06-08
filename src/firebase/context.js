import React, { Component } from 'react';

const AuthContext = React.createContext(true);

class AuthProvider extends Component {
  constructor(props) {
    super(props);
    // Context state
    this.state = {
      currentUser: null
    }
    // Method to update state
    this.updateCurrentUser = this.updateCurrentUser.bind(this);
  }

  updateCurrentUser(newUser) {
    this.setState({ 
      currentUser: newUser 
    });
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  }

  render() {
    return (
      <AuthContext.Provider value={{currentUser: this.state.currentUser, updateCurrentUser: this.updateCurrentUser}}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

export default AuthContext;

export {AuthProvider}