import React, { useState, useEffect } from 'react';
import Login from '../access/Login';
import '../../App.css';
import '../styles/UserInfo.css'

function UserInfo() {
    const [userData, setUserData] = useState(() => {
        const savedUser = localStorage.getItem('userData');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (userData) {
            console.log('Loaded user data:', userData);
            localStorage.setItem('userData', JSON.stringify(userData));

        }
    }, [userData]);

    return (
        <div>
            <div id='mainHeader'>
                <div id='userInfo'>
                    <div id='container'>
                        {userData ? (
                            <>
                                <img src={userData.picture} alt='userIcon' id='userIcon' />
                                <img src="/../messanger/online.png" alt='online' id='onlineUser' />
                                <span id='userName'>{userData.name}</span>
                            </>
                        ) : (<>
                            <img src='/../userIcons/male0.png' alt='userIcon' id='userIcon' />
                            <img src="/../messanger/online.png" alt='online' id='online' />
                        </>
                        )}
                    </div>
                    <div id='container'>
                        <Login setUserData={setUserData} />
                    </div>
                </div><br />
            </div>
        </div>
    );
}

export default UserInfo;