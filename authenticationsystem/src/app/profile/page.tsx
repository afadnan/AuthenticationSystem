"use client"

import React,{useState} from "react"
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";;
import { useRouter } from "next/navigation";

export default function Userprofile(){
    const router = useRouter();
    const [data,setData] = useState("nothing");
    const logout = async () => {

        
        try {
            await axios.get('/api/users/logout');
            toast.success('Logout successful');
            router.push('/login');
        } catch (error : any) {
            console.log(error.messaage);
            toast.error(error.message);
            
        }

    }
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id);
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>
                Profile
            </h1>
            <hr />
            <p className="text-4xl">Profile Page</p>
            <h2 className="p-1 rounded bg-green-500">{data === 'nothing' ? "Nothing Data to Show" : <Link href={`/profile/${data}`}>
            {data}
            </Link>  }</h2>
            <hr />
            <button onClick={logout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Logout</button>

            <button onClick={getUserDetails} className="bg-green-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">Get User Details</button>
        </div>
    )
}