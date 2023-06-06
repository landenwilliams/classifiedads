import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';
import { Link, Navigate } from 'react-router-dom';

const LogIn = (props) => {
    // console.log(props.isLoggedIn);

    const [showLoginButton, setShowLoginButton] = useState(true);
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [invalidLogin, setInvalidLogin] = useState(false);
    const [loginToken, setLoginToken] = useState('');
    const [invalidPasswordConfirmation, setInvalidPasswordConformation] = useState(false);

    const logIn = async (e) => {
        e.preventDefault();
        //call an api with fetch
        fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/users/login', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user: {
                    username: `${loginName}`,
                    password: `${loginPassword}`
                }
            })
        }).then(response => response.json())
            .then(result => {
                if (result.success === true) {
                    setLoginToken(result.data.token);
                    // console.log(result.data.token);
                    window.localStorage.setItem('token', `${result.data.token}`);
                    return props.setIsLoggedIn(true);

                } else {
                    return (setInvalidLogin(true));

                }
            })
            .catch(console.error);

    }

    const register = (e) => {
        e.preventDefault();

        if (loginPassword === confirmPassword) {
            fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/users/register', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: `${loginName}`,
                        password: `${loginPassword}`
                    }
                })
            }).then(response => response.json())
                .then(result => {
                    // console.log(result);
                })
                .catch(console.error);
        }
        else {
            // e.preventDefault();
            return (setInvalidPasswordConformation(true));
            // console.log('password does not match')
        }
    }



    return (
        <>
            <div id="container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '15%' }}>
                {props.isLoggedIn ? <Navigate to="/" /> : null}
                <div className="card" style={{ display: 'flex', justifyContent: 'center', width: "50%", marginBottom: '2%' }}>

                    <div className="card-body" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <div className="form-floating">
                            <input className="form-control" id="username" type="text" name="username" placeholder="username" onChange={() => { setLoginName(event.target.value) }} />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating">
                            <input className="form-control" id="password" type="password" name="password" placeholder="password" onChange={() => { setLoginPassword(event.target.value) }}></input>
                            <label htmlFor="password">Password</label>
                        </div>
                        { showLoginButton ? null : <>
                            <div className="form-floating">
                            <input className="form-control" id="confirmpassword" type="password" name="confirm" placeholder="confirm password" onChange={() => { setConfirmPassword(event.target.value) }}></input>
                            <label htmlFor="confirmpassword">Confrim Password</label>
                            </div>
                        </>}
                    </div>
                    <div className="card-footer" style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                        {
                            showLoginButton ?
                                <>
                                    <Link className="registerlink" onClick={() => setShowLoginButton(false)}><h6>Create Account</h6></Link>
                                    {invalidLogin ? <h8>Login was invalid. Please try again.</h8> : null}
                                    <a className="btn btn-primary" onClick={logIn} >Login</a>
                                </> : 
                                <>
                                    
                                    <Link className="registerlink" onClick={() => setShowLoginButton(true)}><h6>Login</h6></Link>
                                    {invalidPasswordConfirmation ? <h8>Passwords do not match. Please try again.</h8> : null}
                                    <a className="btn btn-primary" onClick={register}>Register</a>
                                </>
                        }
                        
                        



                    </div>


                </div>
            </div>
        </>


    )
}

export default LogIn;