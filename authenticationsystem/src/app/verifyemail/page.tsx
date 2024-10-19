"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from 'react';

export default function verifyEmail() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");

    const verifyUserEmail = async () => {
        try {
            // sending request from axios
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error :any) {
            setError(error.response?.data?.message || "An error occurred during verification.");
            console.log(error.response?.data);
        }
    };

    useEffect(() => {
        // Grab token from URL
        const urlToken = new URLSearchParams(window.location.search).get("token");
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl">Verify Your Email</h1>
            <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "No token provided"}</h2>

            {verified && (
                <div>
                    <h2 className="text-2xl">Email Verified</h2>
                    <Link href="/login">Login</Link>
                </div>
            )}

            {error && (
                <div>
                    <h2 className="text-2xl bg-red-500 text-black">Error: {error}</h2>
                </div>
            )}
        </div>
    );
}
