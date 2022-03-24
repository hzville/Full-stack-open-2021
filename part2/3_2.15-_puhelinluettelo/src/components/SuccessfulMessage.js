import React from "react";

const SuccessfulMessage = ({message}) => {
    if (message === null){
        return null
    }

    return(
        <div className='successful'>
            {message}
        </div>
    )
}

export default SuccessfulMessage