import React from 'react'
import { VscSignOut } from "react-icons/vsc"
import { toast } from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : {};
    const image = user.image || '';
    const firstname = user.firstName || '';
    const lastname = user.lastName || '';
    console.log("image is", image)

    const logout = async () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/signin")
    }

    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="flex flex-col justify-center h-full ml-4 font-semibold text-2xl">
                PayTM Wallet
            </div>
            <div className="flex items-center mr-8 gap-x-4">

                <div className='flex  items-center cursor-pointer' onClick={logout}>
                    {/* Logout */}
                    <VscSignOut className="text-lg" />
                </div>

                <div className="flex flex-col justify-center h-full">
                    Hello, {firstname} {lastname}
                </div>

                <div className="rounded-full h-10 w-10 flex justify-center">
                    <img
                        src={image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[60px] rounded-full object-cover"
                    />
                </div>
            </div>
        </div>
    )
}

export default Navbar