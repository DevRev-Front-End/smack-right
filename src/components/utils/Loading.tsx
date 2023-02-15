import React from 'react';

import loading from "../../assets/images/loading.gif";

const Loading = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <img src={loading} alt="Smack Loading"  className="h-1/2"/>
        </div>
    )
}

export default Loading