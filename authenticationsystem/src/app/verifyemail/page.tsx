"use client"

import axios from "axios";
import Link from "next/link";
import React,{useState,useEffect} from 'react';

export default function verifyemail() {
    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);
    const [error,setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            // sending request from axios
            await axios.post('/api/users/verifyemail', {token});
            setVerified(true);
        } catch (error : any) {
            setError(true);
            console.log(error.response.data);
                        
        }
    }

    useEffect(()=>{
        //grab url token
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken);
    },[])

    useEffect(()=> {
        if(token.length > 0){
            verifyUserEmail();
        }
    },[token])
}