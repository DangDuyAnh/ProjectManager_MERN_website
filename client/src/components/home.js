import React, { useEffect } from 'react';

import history from '../Utilities/history';
import Login from './login';
import { authenticationService } from '../Services/authenticationService';

const Home = () => {

    useEffect(() => {
        if (authenticationService.currentUserValue) {
            history.push('/homepage');
            window.location.reload();
        }
    }, []);

    return (
            <Login/>
    );
};

export default Home;