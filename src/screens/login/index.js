import React, {useState} from 'react';
import {Link} from 'react-router-dom';
const LoginPage = () => {
    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");

    const sendData = (login, password) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password })
        };

        fetch('/auth/authenticate', requestOptions)
        .then((res) => res.text())
        .then((serverMessage) => {
            const sessionId = JSON.parse(serverMessage);
            localStorage.setItem('session', sessionId);
            window.location = '/';
        })
        .catch((err) => {
            console.error("Server error: ", err);
        })
    }

    return (
        <div className="card m-4">
            <form className="card-body">
                <h5 className="card-title">Authentication</h5>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Login</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter login"
                        onChange={(e) => setLogin(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Enter password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-success m-2"
                    onClick = {(e) => {e.preventDefault(); sendData(login, password);}}
                >
                    Log In
                </button>

                <button type="submit" className="btn btn-primary m-2" > 
                   <Link to='/registration'>Sign Up</Link>
                </button>
            </form>
        </div>
    );
}

export default LoginPage;