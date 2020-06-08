import React from 'react';
import Main from './main/Main';
import Header from './header/Header'
import Footer from './footer/Footer';
import { AuthProvider } from '../../../firebase/context';

export default class Layout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layout">
                <AuthProvider>
                    <Header {...this.props}></Header>
                    <Main {...this.props} ></Main>
                    <Footer {...this.props}></Footer>
                </AuthProvider>
            </div>
        );
    }
}