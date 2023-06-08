import React, { useState } from "react";


const Login = ({ onSetSubmitted,onSetUserName }) => {
    
    const handleSubmit = () => {
        onSetSubmitted(true)
    }

    return (
        <div>

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>What's your name?</label>
                        <input type="text" onChange={(e) => { onSetUserName(e.target.value) }}></input>
                    </div>
                    <div>
                        <button type="submit">GO!</button>
                    </div>
                </form>
            </div>
        </div>
    )


}


export default Login;