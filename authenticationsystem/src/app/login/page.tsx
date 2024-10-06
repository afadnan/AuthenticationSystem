"use client";

import Link from "next/link";
import React, { useState,useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";


export default function LoginPage() {
    const router = useRouter(); //csz pushing to different page
    const [user,setUser] = useState({
        email:"",
        password:"",
    })

    const [buttonDisabled,setButtonDisabled] = React.useState(false);

    const [loading,setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login",user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
            
        } catch (error :any) {
            console.log("Login failed",error.message);
            toast.error(error.message);
            
        }finally{
            setLoading(false);
        }

    }

    useEffect(()=> {
        if(user.email.length > 0 && user.password.length > 0 ){
            setButtonDisabled(false);
        }else {
            setButtonDisabled(true);
        }
    },[user])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 font-black "> 
        <h1 className="m-5"> {loading ? "Processing..." : "LOGIN"} </h1>
        <hr />
        <label htmlFor="email" >Email</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="email"
            type ="text"
            value={user.email}
            onChange={(e) => setUser({...user,email:e.target.value})}
            placeholder="email"
        />
        <label htmlFor="password" >Password</label>
        <input className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            id="password"
            type ="password"
            value={user.password}
            onChange={(e) => setUser({...user,password:e.target.value})}
            placeholder="password"
        />
        <button onClick={onLogin} 
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outine-none focus:border-gray-600
        " > {buttonDisabled ? "No Login" : "Login Here"} </button>
        <Link href="/signup">Visit Signup Page</Link>
        </div>
        
    
    )
}