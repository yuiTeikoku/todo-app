import React, {useState} from 'react';

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
            localStorage.setItem('session', sessionId._id);
            window.location = '/';
        })
        .catch((err) => {
            console.error("Server error: ", err);
        })
    }

    return (
        <form>
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
                className="btn btn-primary"
                onClick = {(e) => {e.preventDefault(); sendData(login, password);}}
            >
                Submit
            </button>
        </form>
    );
}

export default LoginPage;