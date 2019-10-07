import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({cartLength}) => (
    <ul className="nav justify-content-end">
        <li className="nav-item">
            <Link className="nav-link active" to="/"> Home </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/products"> Products </Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/cart"> Cart <span className="badge badge-danger">{cartLength}</span></Link>
        </li>
    </ul>
);

export default Header;