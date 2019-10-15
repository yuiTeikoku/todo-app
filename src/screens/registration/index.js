import React, {useState} from 'react';

const RegistrationPage = () => {
    let [login, setLogin] = useState("");
    let [password, setPassword] = useState("");
    let [comfPass, setComfPass] = useState("");

    const sendData = (login, password, comfPass) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ login, password, rest: {} })
        };

        if (password !== comfPass)
            return alert("Password not equal");

        fetch('/auth/registration', requestOptions)
        .then((res) => res.text())
        .then((serverMessage) => {
            console.log(serverMessage);
        })
        .catch((err) => {
            console.error("Server error: ", err);
        })
    }

    return (
        <div className="card">
            <form className="card-body">
                <h5 className="card-title">Registration</h5>
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
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword2" 
                        placeholder="Repeat password"
                        onChange={(e) => setComfPass(e.target.value)} />
                </div>
                <button 
                    type="submit" 
                    className="btn btn-primary"
                    onClick = {(e) => {e.preventDefault(); sendData(login, password, comfPass);}}
                >
                    Submit
                </button>
            </form>
        </div>
        
    );
}

export default RegistrationPage;