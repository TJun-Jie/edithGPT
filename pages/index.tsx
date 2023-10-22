import {
  OAuthProvider,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { auth } from "../firebase.js";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // No need to redefine auth as it's already imported from firebase.js
  const googleProvider = new GoogleAuthProvider();
  const appleProvider = new OAuthProvider("apple.com");
  const githubProvider = new GithubAuthProvider();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
      if (message) {
        setShowPopup(true);
      }
    }, [message]);

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("User created successfully!");
      router.push("/dashboard");
    } catch (error: any) {
      setMessage(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setMessage("Logged in successfully!");
      router.push("/dashboard"); // Redirect to the dashboard page
    } catch (error: any) {
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
      setMessage("Logged in successfully!"); // Optional: Display success message
      router.push("/dashboard");
    } catch (error: any) {
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
      router.push("/dashboard");
    } catch (error) {
      console.error("Error signing in with Apple:", error);
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      const user = result.user;
      console.log("Signed in as:", user.displayName);
      router.push("/dashboard"); // Redirect to the dashboard page
    } catch (error) {
      console.error("Error signing in with GitHub:", error);
    }
  };

  return (
      <div className="tw-min-h-screen tw-flex tw-flex-col tw-justify-center tw-bg-gradient-to-br tw-from-gray-100 tw-to-gray-300">
          <div className="tw-mx-auto tw-p-10 tw-max-w-md tw-rounded-lg tw-shadow-2xl tw-bg-white tw-transition-transform tw-transform tw-hover:scale-105">
            <h1 className="tw-text-4xl tw-font-bold tw-mb-8 tw-text-gray-700 tw-text-center">
              Welcome to Edith, the fire of planning!
            </h1>

          <div className="tw-space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className="tw-w-full tw-py-2 tw-px-4 tw-rounded tw-border tw-border-gray-300 tw-mb-2"
              />

              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                className="tw-w-full tw-py-2 tw-px-4 tw-rounded tw-border tw-border-gray-300 tw-mb-4"
              />

              <div className="tw-flex tw-justify-between tw-space-x-4">
                <button
                  onClick={handleSignup}
                  className="auth-button tw-bg-blue-500 tw-text-white tw-border tw-border-blue-600 tw-py-2 tw-px-4 tw-rounded tw-flex-1"
                >
                  Sign Up
                </button>

                <button
                  onClick={handleLogin}
                  className="auth-button tw-bg-blue-500 tw-text-white tw-border tw-border-blue-600 tw-py-2 tw-px-4 tw-rounded tw-flex-1"
                >
                  Sign In
                </button>
              </div>
            </div>

            <button
              className="auth-button tw-bg-black tw-text-white tw-border tw-border-black"
              onClick={signInWithGoogle}
            >
              <img
                src="/google-icon.svg"
                alt="Google Logo"
                className="tw-w-8 tw-h-8 tw-mr-4"
              />
              Sign in with Google
            </button>

            <button
              className="auth-button tw-bg-black tw-text-white tw-border tw-border-black"
              onClick={signInWithGithub}
            >
              <img
                src="/github-mark.svg"
                alt="Github Logo"
                className="tw-w-8 tw-h-8 tw-mr-4"
              />
              Sign in with Github
            </button>
          </div>
        </div>

        {showPopup && (
          <div className="tw-fixed tw-top-0 tw-left-0 tw-w-full tw-h-full tw-bg-black tw-bg-opacity-50 tw-flex tw-justify-center tw-items-center">
            <div className="tw-bg-white tw-p-6 tw-rounded tw-shadow-lg tw-text-center">
              <p className="tw-mb-4 tw-font-bold tw-text-black">{message}</p>
              <button onClick={() => {
                setShowPopup(false);
                setMessage(""); // Clear the message after closing the popup
              }} className="tw-bg-blue-500 tw-text-white tw-px-4 tw-py-2 tw-rounded">Close</button>
            </div>
          </div>
        )}
      </div>
    );
}
