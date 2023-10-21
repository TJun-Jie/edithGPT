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
import React, { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  // No need to redefine auth as it's already imported from firebase.js
  const googleProvider = new GoogleAuthProvider();
  const appleProvider = new OAuthProvider("apple.com");
  const githubProvider = new GithubAuthProvider();

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("User created successfully!");
      router.push("/dashboard"); // Redirect to the dashboard page
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
    <div className="tw-min-h-screen tw-flex tw-flex-col tw-justify-center tw-bg-white">
      <div className="tw-mx-auto tw-p-10 tw-max-w-md tw-rounded-lg tw-shadow-xl tw-transition-transform tw-transform tw-hover:scale-105">
        <h1 className="tw-text-3xl tw-font-semibold tw-mb-6 tw-text-gray-800 tw-text-center">
          Welcome to Edith, the fire of planning!
        </h1>

        <div className="tw-space-y-6">
          <button
            className="tw-w-full tw-flex tw-items-center tw-justify-center tw-bg-white tw-border tw-border-gray-300 tw-text-gray-800 tw-p-4 tw-rounded tw-hover:bg-gray-200 tw-transition-transform tw-transform tw-hover:scale-105"
            onClick={signInWithGoogle}
          >
            <img
              src="/google-icon.svg"
              alt="Google Logo"
              className="tw-w-6 tw-h-6 tw-mr-3"
            />
            Sign in with Google
          </button>

          <button
            className="tw-w-full tw-flex tw-items-center tw-justify-center tw-bg-white tw-border tw-border-gray-300 tw-text-gray-800 tw-p-4 tw-rounded tw-hover:bg-gray-200 tw-transition-transform tw-transform tw-hover:scale-105"
            onClick={signInWithGithub}
          >
            <img
              src="/github-mark.svg"
              alt="Github Logo"
              className="tw-w-6 tw-h-6 tw-mr-3"
            />
            Sign in with Github
          </button>

          {message && (
            <p className="tw-mt-6 tw-text-red-600 tw-font-medium">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
}
