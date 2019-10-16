import React from 'react';
import {Link} from 'react-router-dom';
const ErrorPage = () => (
    <div className="container">
        <h1> 404 Page Not Found.</h1>
        <Link to='/'>go back</Link>
    </div>
);

export default ErrorPage;