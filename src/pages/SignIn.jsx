import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from "react-hot-toast"
const BASE_URL = process.env.REACT_APP_BASE_URL

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const loginButtonHandler = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/user/signin`, {
                email,
                password,
            });

            // Assuming your server returns a token on successful login
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user))

            // Redirect to the dashboard or any other page after successful login
            toast.success("Login success")
            navigate('/dashboard');
        } catch (error) {
            // Handle login failure
            toast.error("Login Failed")
        }
    };

    return (
        <div className="bg-richblack-200 h-screen flex justify-center">
            <div className='flex flex-col justify-center'>
                <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                    <h1 className='font-semibold text-4xl pt-6'>
                        Sign In
                    </h1>
                    <h2 className='text-richblack-300 text-md pt-1 px-4 pb-4 text-xl'>
                        Enter your credentials to access your account
                    </h2>
                    <div>
                        <div className="text-sm font-medium text-left py-2">
                            Email
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter email'
                            className='w-full border rounded px-2 py-1'
                        />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-left py-2">
                            Password
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Enter Password'
                            className='w-full border rounded px-2 py-1'
                        />
                    </div>

                    <button 
                        className='w-full text-white bg-richblack-300 hover:bg-richblack-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 mt-2'
                        onClick={loginButtonHandler}
                    >
                        Sign In
                    </button>
                    <div className='flex justify-center mb-2 mt-2'>
                        <p>Don't have an account?</p>
                        <Link to="/signup" className='font-semibold underline'>
                            Sign up
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;
