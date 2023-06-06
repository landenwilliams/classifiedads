import React from 'react';
import { Link } from 'react-router-dom';

const RenderHeader = (props) => {

    const logOut = () => {
        window.localStorage.removeItem('token');
        props.setIsLoggedIn(false);
    }

    return (
        <React.Fragment>
            <nav className="navbar fixed-top navbar-expand-lg bg-primary-subtle" data-bs-theme="dark" style={{ opacity: "90%", boxShadow: "0 5px 6px -2px black" }}>
                <div className="container-fluid">
                    <a className="navbar-brand" href="#" aria-current="page" style={{ marginLeft: "20px" }}>

                        Classified<svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-badge-ad-fill" style={{ marginBottom: '5px' }} viewBox="0 0 16 16">
                            <path d="m3.7 11 .47-1.542h2.004L6.644 11h1.261L5.901 5.001H4.513L2.5 11h1.2zm1.503-4.852.734 2.426H4.416l.734-2.426h.053zm4.759.128c-1.059 0-1.753.765-1.753 2.043v.695c0 1.279.685 2.043 1.74 2.043.677 0 1.222-.33 1.367-.804h.057V11h1.138V4.685h-1.16v2.36h-.053c-.18-.475-.68-.77-1.336-.77zm.387.923c.58 0 1.002.44 1.002 1.138v.602c0 .76-.396 1.2-.984 1.2-.598 0-.972-.449-.972-1.248v-.453c0-.795.37-1.24.954-1.24z" />
                            <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z" />
                        </svg>s
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                        <ul className="navbar-nav justify-content-end">
                            {props.isLoggedIn ?
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" href='#/profile'>Profile</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href='#/createad'>Create Ad</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href='#' id='logout' onClick={logOut}>Logout</a>
                                    </li>
                                </> :
                                <li className="nav-item">
                                    <a id='login' href='#/login' className="nav-link">Login/Sign Up</a>
                                </li>
                            }
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" style={{backgroundColor: 'white'}} placeholder="Search" aria-label="Search" onChange={() => { props.setSearchTerm(event.target.value) }} />
                            <a className="btn btn-info" style={{borderColor: 'white'}} type="submit" href="#">
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </a>
                        </form>
                    </div>
                </div>
            </nav>
        </React.Fragment>)
}

export default RenderHeader;