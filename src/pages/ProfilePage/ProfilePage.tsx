import React from 'react';

const ProfilePage = () => {
    return (
        <div style={{height:'100%'}}>
            <h1>Привет, {localStorage.getItem("currentUser")}</h1>
        </div>
    );
};

export default ProfilePage;