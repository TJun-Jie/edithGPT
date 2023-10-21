import { OAuthProvider, GoogleAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'next/router';
import { auth } from '../firebase.js';
import React, { useState } from 'react';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    // No need to redefine auth as it's already imported from firebase.js
    const googleProvider = new GoogleAuthProvider();
    const appleProvider = new OAuthProvider('apple.com');
    const githubProvider = new GithubAuthProvider();

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage('User created successfully!');
            router.push('/dashboard');  // Redirect to the dashboard page
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Logged in successfully!');
            router.push('/dashboard');  // Redirect to the dashboard page
        } catch (error) {
            setMessage(error.message);
        }
    };

    // Implementing Google Sign-in:
    const signInWithGoogle = async () => {
        const googleProvider = new GoogleAuthProvider();
        try {
          const result = await signInWithPopup(auth, googleProvider);
          const user = result.user;
          console.log("Signed in as:", user.displayName);
          setMessage('Logged in successfully!'); // Optional: Display success message
          router.push('/dashboard');
        } catch (error) {
          console.error("Error signing in with Google:", error);
          setMessage(error.message);
        }
      };

    // Implementing Apple Sign-in:
    const signInWithApple = async () => {
        try {
            const result = await signInWithPopup(auth, appleProvider);
            const user = result.user;
            console.log("Signed in as:", user.displayName);
            router.push('/dashboard');
        } catch (error) {
            console.error("Error signing in with Apple:", error);
        }
    };

    const signInWithGithub = async () => {
      try {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;
        console.log("Signed in as:", user.displayName);
        router.push('/dashboard');  // Redirect to the dashboard page
      } catch (error) {
        console.error("Error signing in with GitHub:", error);
      }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center bg-white">
            <div className="mx-auto p-10 max-w-md rounded-lg shadow-xl transition-transform transform hover:scale-105">
                <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center">Welcome to Edith, the fire of planning!</h1>

                <div className="space-y-6">

                    <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 p-4 rounded hover:bg-gray-200 transition-transform transform hover:scale-105" onClick={signInWithGoogle}>
                        <img src="/google-icon.svg" alt="Google Logo" className="w-6 h-6 mr-3" />
                        Sign in with Google
                    </button>

                    <button
                        className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-800 p-4 rounded hover:bg-gray-200 transition-transform transform hover:scale-105"
                        onClick={signInWithGithub}>
                        <img src="/github-mark.svg" alt="Github Logo" className="w-6 h-6 mr-3" />
                        Sign in with Github
                    </button>

                    {message && <p className="mt-6 text-red-600 font-medium">{message}</p>}
                </div>
            </div>
        </div>
    )
}
