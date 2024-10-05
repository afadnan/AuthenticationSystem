"use client";

import Link from "next/link";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function SignupPage() {
    const [user,setUser] = useState({
        username: "",
        email:"",
        password:"",
    })

    const onSignup = async () => {

    }
    return (
        <div className="flex  flex-col items-center justify-center min-h-screen py-2 font-black"> 
        <h1 className="m-5">SIGNUP</h1>
        <hr />
        <label htmlFor="username" >User Name</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="text"
            type ="text"
            value={user.username}
            onChange={(e) => setUser({...user,username:e.target.value})}
            placeholder="username"
        />
        <label htmlFor="email" >Email</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="email"
            type ="text"
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})}
            placeholder="email"
        />
        <label htmlFor="password" >Password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            id="password"
            type ="password"
            value={user.password}
            onChange={(e) => setUser({...user,password:e.target.value})}
            placeholder="password"
        />
        <button onClick={onSignup} 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outine-none focus:border-gray-600
        " >Signup Here</button>
        <Link href="/login">Visit Login Page</Link>
        </div>
        
    )
}
