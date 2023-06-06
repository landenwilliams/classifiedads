import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';

const Profile = (props) => {

    const [profile, setProfile] = useState([]);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const [editPostDisplay, setEditPostDisplay] = useState(false);
    const [postTitle, setPostTitle] = useState('');
    const [postDescript, setPostDescript] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postLocation, setPostLocation] = useState('');
    const [currentPost, setCurrentPost] = useState({});
    const token = window.localStorage.getItem('token');
    const [addMessageDisplay, setAddMessageDisplay] = useState(false);
    const [messageContent, setMessageContent] = useState('');

    useEffect(() => {

        const fetchProfile = async () => {

            fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/users/me', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            }).then(response => response.json())
                .then(result => {
                    setProfile(result.data);
                    setProfileLoaded(true);
                })
                .catch(console.error);

        }
        fetchProfile();
    }, [])

    const deletePost = (post, index) => {
        fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts/${post._id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }).then(response => response.json())
            .then(result => {
                window.location.reload();
            })
            .catch(console.error);

    }


    const editPost = (post, index) => {
        fetch(`https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts/${post._id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: `${postTitle}`,
                    description: `${postDescript}`,
                    price: `${postPrice}`,
                    location: `${postLocation}`,
                    willDeliver: true
                }
            })
        }).then(response => response.json())
            .then(result => {
                window.location.reload();
            })
            .catch(console.error);

    }
    const editOnClick = (post) => {
        setCurrentPost(post);
        setEditPostDisplay(true);
    }

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
                console.log('i am running')
                // console.log(result);

            })
            .catch(console.error);
    }

    const messageOnClick = (post) => {
        setAddMessageDisplay(true);
        setCurrentPost(post);
    }

    return (
        <div className="container" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'row', marginTop: '80px' }}>
            {props.isLoggedIn ? <>
                {profileLoaded ?
                    <>
                        <div className="card" style={{ height: '250px', width: '15%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="90%" height="90%" fill="currentColor" className="bi bi-person-bounding-box" viewBox="0 0 16 16">
                                <path d="M1.5 1a.5.5 0 0 0-.5.5v3a.5.5 0 0 1-1 0v-3A1.5 1.5 0 0 1 1.5 0h3a.5.5 0 0 1 0 1h-3zM11 .5a.5.5 0 0 1 .5-.5h3A1.5 1.5 0 0 1 16 1.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 1-.5-.5zM.5 11a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 14.5v-3a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v3a1.5 1.5 0 0 1-1.5 1.5h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 1 .5-.5z" />
                                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                            </svg>
                            <h6>Username: {profile.username}</h6><br />
                        </div>
                        <div className="card" style={{ width: '40%' }}>
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Posts</button>
                                    <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Messages</button>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent" style={{ marginBottom: '5%' }}>
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabIndex="0">
                                    {profile.posts.map((post, index) => {
                                        // () => {setPostTitle(post.title)}
                                        return (
                                            <React.Fragment key={index} >
                                                {post.active ? <>
                                                    {editPostDisplay ?
                                                        <div className="popupbox">
                                                            <div className="card" style={{ margin: '5%', marginBottom: '0%' }}>
                                                                <div className="card-body">
                                                                    <div className="form-floating">
                                                                        <input className="form-control" id="title" placeholder="Title" defaultValue={currentPost.title} onChange={(event) => { setPostTitle(event.target.value) }} /><br />
                                                                        <label htmlFor="title">Headline</label>
                                                                    </div>
                                                                    <div className="form-floating">
                                                                        <textarea className="form-control" defaultValue={currentPost.description} id="description" style={{ height: '100px' }} placeholder="Description" onChange={(event) => { setPostDescript(event.target.value) }} /><br />
                                                                        <label htmlFor="description">Description</label>
                                                                    </div>
                                                                    <div className="form-floating">
                                                                        <input className="form-control" id="price" defaultValue={currentPost.price} placeholder="Price" type="number" onChange={(event) => { setPostPrice(event.target.value) }} /><br />
                                                                        <label htmlFor="price">Price</label>
                                                                    </div>
                                                                    <div className="form-floating">
                                                                        <input className="form-control" id="location" defaultValue={currentPost.location} placeholder="Location" onChange={(event) => { setPostLocation(event.target.value) }} /><br /><br />
                                                                        <label htmlFor="location">Location</label>
                                                                    </div>
                                                                </div>
                                                                <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <button className="btn btn-primary" onClick={() => setEditPostDisplay(false)}>Cancel</button>
                                                                    <button className="btn btn-primary" onClick={() => editPost(currentPost)}>Submit Edit</button>
                                                                </div>
                                                            </div>
                                                        </div> : <>
                                                            <div className="card" style={{ margin: '5%', marginBottom: '0%' }}>
                                                                <div className="card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                    <h6>{post.title}</h6>
                                                                    <h6>{post.price}</h6>
                                                                </div>
                                                                <div className='card-body'>
                                                                    <ul className="list-group list-group-flush">
                                                                        <li className="list-group-item"><p>{post.description}</p></li>
                                                                        <li className="list-group-item" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignContent: 'space-around' }}>
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
                                                                <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                                                    <h6>Posted: {post.createdAt}</h6>
                                                                    <button className="btn btn-primary" onClick={() => editOnClick(post)}>Edit</button>
                                                                    <button className="btn btn-primary" onClick={() => deletePost(post, index)}>Delete</button>
                                                                </div>
                                                            </div> </>} </>
                                                    : null}
                                            </React.Fragment>
                                        )
                                    })}
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabIndex="0">


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



                                            {profile.messages.map((post, index) => {
                                                return (
                                                    <React.Fragment key={index} >
                                                        <div className="card" style={{ margin: '5%', marginBottom: '0%' }}>
                                                            <div className="card-header">

                                                                <h6>{post.post.title}</h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <h6>{post.content}</h6>
                                                            </div>
                                                            <div className="card-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <h6>{post.fromUser.username}</h6>
                                                                <button className="btn btn-primary" onClick={() => { messageOnClick(post) }}>Reply</button>
                                                            </div>
                                                        </div><br />
                                                    </React.Fragment>
                                                )
                                            })}
                                        </>}
                                </div>
                            </div>
                        </div>
                    </> :
                    <><div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div></>}
            </> : <Navigate to="/" />}
        </div>)
}

export default Profile;