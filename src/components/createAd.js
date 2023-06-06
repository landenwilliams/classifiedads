import React, { useState, useEffect } from 'react';

const CreateAd = () => {

    const [postTitle, setPostTitle] = useState('');
    const [postDescript, setPostDescript] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postLocation, setPostLocation] = useState('');

    const addPost = () => {


        fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts', {
            method: "POST",
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

                // console.log(result);
            })
            .catch(console.error);


    }
    return (
        <>
            <div className="container" style={{ marginTop: "80px", display: 'flex', justifyContent: 'center' }}>


                <div className="card" style={{ width: "50%", marginBottom: '2%', display: 'flex', justifyContent: 'center' }}>
                    <div className="card-body" style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                        <div className="form-floating">
                            <input className="form-control" id="title" placeholder="Title" onChange={(event) => { setPostTitle(event.target.value) }} /><br />
                            <label htmlFor="title">Headline</label>
                        </div>
                        <div className="form-floating">
                            <textarea className="form-control" id="description" style={{height: '100px'}} placeholder="Description" onChange={(event) => { setPostDescript(event.target.value) }} /><br />
                            <label htmlFor="description">Description</label>
                        </div>
                        <div className="form-floating">
                            <input className="form-control" id="price" placeholder="Price" type="number" onChange={(event) => { setPostPrice(event.target.value) }} /><br />
                            <label htmlFor="price">Price</label>
                        </div>
                        <div className="form-floating">
                            <input className="form-control" id="location" placeholder="Location" onChange={(event) => { setPostLocation(event.target.value) }} /><br /><br />
                            <label htmlFor="location">Location</label>
                        </div>

                    </div >
                    <div className="card-footer" style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <a className="btn btn-primary" onClick={addPost}>Create Ad</a>
                    </div>
                </div >

            </div >
        </>
    )
}

export default CreateAd;