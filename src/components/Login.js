import React,{ useState,useEffect } from "react";

const Login = (props) => {

    const [email,SetEmail] = useState('');
    const [password,SetPassword] = useState('');

    const handleSubmit = (evt) => {
        console.log(email,password)
        if(password == '123456' && email!=''){
            props.history.push("/home");
        }
    }

    return (
        <div>
            <h2>Login</h2>
            <form  className="my-4 ">
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    type="email"
                    className="form-control"
                    placeholder="enter Email Address"
                    onChange={evt => SetEmail(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-4 col-md-4 col-lg-2">
                    <input 
                    type="password"
                    className="form-control"
                    placeholder="enter Password"
                    onChange={evt => SetPassword(evt.target.value)}
                    ></input>
                    </div>
                </div>
                <div className="col-lg-2 col-sm-2 col-md-2 create-btn">
                    <button type="button" className="btn btn-primary my-4 px-4" onClick={handleSubmit}>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login;