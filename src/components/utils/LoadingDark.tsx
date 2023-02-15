import React from 'react';
import loading from "../../assets/images/loadingDark.gif"

const LoadingDark = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center bg-[#181818]">
            <img src={loading} alt="Smack Loading" className="h-1/2" />
        </div>
    )
}

export default LoadingDark