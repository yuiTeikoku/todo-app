import React from 'react';
import { connect } from 'react-redux';
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

const mapStateToProps = state => ({cartLength: state.cart.length})
export default connect(mapStateToProps)(Header);