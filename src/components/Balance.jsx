import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';
const BASE_URL = process.env.REACT_APP_BASE_URL


const Balance = () => {

    const [balance, setBalance] = useState(0);
    console.log(BASE_URL)

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                console.log("balance started")
                const token = localStorage.getItem('token');
                console.log("toekn is",token)

                if (!token) {
                    console.error('Token not found. User not authenticated.');
                    return;
                }

                const response = await axios.get(`${BASE_URL}/account/balance`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("rrspondesend")

                // Assuming your backend returns the balance in the response
                setBalance(response.data.balance);
                console.log("balance fetched")
            } catch (error) {
                console.error('Failed to fetch balance:', error);
            }
        };

        fetchBalance();
    }, []);

    return (
        <div className='flex text-xl font-semibold ml-4 mt-4 p-4'>
            <div className=''>
                Your Balance :
            </div>
            <div className='ml-4'>
             ₹ {balance}
            </div>
        </div>
    )
}

export default Balance