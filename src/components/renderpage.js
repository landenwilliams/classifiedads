import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RenderPage = (props) => {
    const [addMessageDisplay, setAddMessageDisplay] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    const [currentPost, setCurrentPost] = useState({});
    const token = window.localStorage.getItem('token');

    const sendMessage = async () => {

        setAddMessageDisplay(false);
        fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts/${currentPost._id}/messages`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                message: {
                    content: `${messageContent}`
                }
            })

        }).then(response => response.json())
            .then(result => {
                console.log('i am running');


            })
            .catch(console.error);
    }
    const messageOnClick = (post) => {
        setAddMessageDisplay(true);
        setCurrentPost(post);
    }
    return (
        <>
            <div className="container" style={{display: 'flex', flexDirection: 'row', width: '100%', margin: '0', padding: '0'}}>
                <div className="container" style={{width: '50%', height: '100%', marginTop: '69px', marginLeft: '0', padding: '0', position: 'fixed', display: 'flex'}}>
                    <img src="./images/background.jpeg" alt="background" style={{width: '100%', height: '100%'}}></img>
                </div>
                <div className="container" style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', marginTop: '80px', marginLeft: '50%', width: '50%', position: 'absolute' }}>
                    {props.pageLoaded ?
                        <>
                            {addMessageDisplay ?
                                <div className="card" style={{ width: "50%", marginBottom: '2%' }}>
                                    <div className="card-body" style={{ display: 'flex', justifyContent: 'center' }}>
                                        <div className="form-floating" style={{ width: '80%' }}>
                                            <textarea className="form-control" id="description" style={{ height: '100px' }} placeholder="Message" onChange={(event) => { setMessageContent(event.target.value) }} />
                                            <label htmlFor="description">Message</label>
                                        </div>

                                    </div>
                                    <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <button className="btn btn-primary" onClick={() => setAddMessageDisplay(false)}>Cancel</button>
                                        <button className="btn btn-primary" onClick={sendMessage}>Send</button>
                                    </div>
                                </div> : <>
                                    {
                                        props.postList.filter((val) => {
                                            if (props.searchTerm === "") { return val }
                                            else if (val.title.toLowerCase().includes(props.searchTerm.toLowerCase())) { return val }
                                        }).map((post, index) => {
                                            return (
                                                <div className="card border-dark" style={{ width: "100%", marginBottom: '2%', color: 'white', opacity: '90%'}} key={index}>
                                                    <div className="card-header" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', color: 'white', backgroundColor: '#42B5C2' }}>
                                                        <h6 className="card-title">{post.title}</h6>
                                                        <h6>
                                                            {post.price}
                                                            {props.isLoggedIn ?
                                                                <a className="btn btn-primary" style={{ scale: '0.75' }} onClick={() => { messageOnClick(post) }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
                                                                    </svg>
                                                                </a> : null}
                                                        </h6>
                                                    </div>
                                                    <div className="card-body" style={{backgroundColor: '#42B5C2'}}>
                                                        <ul className="list-group list-group-flush" style={{backgroundColor: '#42B5C2'}}>
                                                            <li className="list-group-item" style={{backgroundColor: '#42B5C2', color: 'white'}}><p>{post.description}</p></li>
                                                            <li className="list-group-item" style={{ color: 'white', display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'space-around', backgroundColor: '#42B5C2' }}>
                                                                <h6>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" style={{ marginBottom: '6px' }} className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                                                    </svg>
                                                                    {post.location}
                                                                </h6>
                                                                <h6 style={{ paddingLeft: '2%' }}>
                                                                    Delivery: {post.willDeliver ?
                                                                        <>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
                                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                                                                <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                                                                            </svg>
                                                                        </> :
                                                                        <>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-octagon" viewBox="0 0 16 16">
                                                                                <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1 1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
                                                                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                                                                            </svg>
                                                                        </>}
                                                                </h6>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                    <div className="card-footer" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#42B5C2' }}>
                                                        <h6>{post.createdAt}</h6>
                                                        <h6>{post.author.username}</h6>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </>}
                        </> :
                        <>

                            <div className="spinner-border card" role="status" >
                                <span className="visually-hidden">Loading...</span>
                            </div></>}
                </div>
            </div>
        </>

    )
}

export default RenderPage;