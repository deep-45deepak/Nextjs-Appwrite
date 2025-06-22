"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyUserEmail = async () => {
        try {
            const response = await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
            console.log(response)
        } catch (error: any) {
            setError(true);
            console.error(
                "Verification error:",
                error.response?.data || error.message
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const tokenFromUrl = urlParams.get("token") || "";
        setToken(tokenFromUrl || "");
    }, []);

    useEffect(() => {
        if (!token?.trim() || verified || error) return;

        verifyUserEmail();
    }, [token, verified, error]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md text-center">
                {loading ? (
                    <p className="text-gray-600 text-lg">Verifying your email...</p>
                ) : verified ? (
                    <>
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">
                            Email Verified!
                        </h2>
                        <p className="mb-6">
                            Your email has been successfully verified. You can now log in.
                        </p>
                        <Link
                            href="/login"
                            className="text-blue-500 hover:underline font-medium"
                        >
                            Go to Login
                        </Link>
                    </>
                ) : error ? (
                    <>
                        <h2 className="text-2xl font-semibold text-red-600 mb-4">
                            Verification Failed
                        </h2>
                        <p className="mb-6">
                            The token may be invalid or expired. Please try again or request a
                            new verification email.
                        </p>
                        <Link
                            href="/resend-verification"
                            className="text-blue-500 hover:underline font-medium"
                        >
                            Resend Verification
                        </Link>
                    </>
                ) : null}
            </div>
        </div>
    );
}
