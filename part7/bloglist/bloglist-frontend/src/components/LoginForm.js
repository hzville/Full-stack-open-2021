import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange,
}) => {
    return (
        <div className='loginform'>
            <h2>Login to application</h2>

            <form onSubmit={handleSubmit} >
                <div className='loginform-input'>
                    username{' '}
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={handleUsernameChange}
                    ></input>
                </div>

                <div className='loginform-input'> 
                    password{' '}
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={handlePasswordChange}
                    ></input>
                </div>
                <button type="submit" id="login-button">
                    login
                </button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleUsernameChange: PropTypes.func.isRequired,
    handlePasswordChange: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
}

export default LoginForm
