import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-hot-toast"
const BASE_URL = process.env.REACT_APP_BASE_URL

const Signup = () => {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const onClickHandler = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/user/signup`, {
                email,
                firstName,
                lastName,
                password,
            });
            localStorage.setItem('token', response.data.token);
            navigate('/signin');
            toast.success('Account created Successfully');
        } catch (error) {
            toast.error('Failed to create account');
        }
    };

    return (

        <div className="bg-richblack-200 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <h1 className='font-semibold text-4xl pt-6'>
                        Sign up
                    </h1>
                    <h2 className='text-richblack-300 text-md pt-1 px-4 pb-4 text-xl'>
                        Enter your infromation to create an account
                    </h2>
                    <div>
                        <div className="text-sm font-medium text-left py-2">
                            First Name
                        </div>
                        <input
                            onChange={(e) => {
                                setFirstName(e.target.value);
                            }}
                            placeholder="Enter first name"
                            className="w-full px-2 py-1 border rounded border-slate-200"
                        />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-left py-2">
                            Last Name
                        </div>
                        <input
                            onChange={(e) => {
                                setLastName(e.target.value);
                            }}
                            placeholder="Enter last name"
                            className="w-full px-2 py-1 border rounded border-slate-200"
                        />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-left py-2">
                            Email
                        </div>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                            placeholder="Enter email"
                            className="w-full px-2 py-1 border rounded border-slate-200"
                        />
                    </div>
                    <div>
                        <div className="text-sm font-medium text-left py-2">
                            Password
                        </div>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            placeholder="Enter password"
                            className="w-full px-2 py-1 border rounded border-slate-200"
                        />
                    </div>
                    <button className='w-full text-white bg-richblack-300 hover:bg-richblack-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2 mt-2'
                        onClick={onClickHandler}>
                        Sign Up
                    </button>

                    <div className='flex justify-center mb-2 mt-2'>
                        <p>Already have an account?</p>
                        <Link to="/signin" className='font-semibold underline'>
                            Sign in
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup