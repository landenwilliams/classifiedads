import React, { useEffect, useState } from 'react';
import RenderHeader from './renderheader.js';
import RenderPage from './renderpage.js';
import LogIn from './login.js'
import Profile from './profile.js'
import CreateAd from './createAd.js';
import { Routes, Route } from 'react-router-dom';



const App = () => {
    const [postList, setPostList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(window.localStorage.getItem('token'));
    const [searchTerm, setSearchTerm] = useState('');
    const [pageLoaded, setPageLoaded] = useState(false);


    useEffect(() => {

        const getPost = async () => {

            try {
                const response = await fetch('https://strangers-things.herokuapp.com/api/2211-ftb-et-web-am/posts');
                const data = await response.json();
                const posts = data.data.posts;
                setPostList(posts);
                setPageLoaded(true);


            } catch (error) {
                console.log("api not loading");
            }

        }

        getPost();

    }, [])



    return (
        <>
            <RenderHeader setSearchTerm={setSearchTerm} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path='/' element={<RenderPage pageLoaded={pageLoaded} setSearchTerm={setSearchTerm} searchTerm={searchTerm} postList={postList} isLoggedIn={isLoggedIn} />} ></Route>
                <Route path='/login' element={<LogIn setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />}></Route>
                <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} />}></Route>
                <Route path='/createad' element={<CreateAd />}></Route>
            </Routes>
        </>
    )
}

export default App;