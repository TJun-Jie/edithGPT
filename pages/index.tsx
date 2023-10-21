import { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@firebase/auth';

export default function Home() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            setMessage('User created successfully!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Logged in successfully!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    // Implementing Google Sign-in:
    import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Signed in as:", user.displayName);
        } catch (error) {
            console.error("Error signing in with Google:", error);
        }
    };

    // Implementing Apple Sign-in:
    import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";

    const auth = getAuth();
    const provider = new OAuthProvider('apple.com');

    const signInWithApple = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            console.log("Signed in as:", user.displayName);
        } catch (error) {
            console.error("Error signing in with Apple:", error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center bg-gray-100">
            <div className="mx-auto p-8 max-w-md bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-semibold mb-4 text-gray-700">Welcome to Edith, the fire of planning!</h1>

                <div className="space-y-4">
                    <input
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:border-indigo-500"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div className="flex space-x-4">
                        <button
                            className="flex-1 bg-black text-white p-3 rounded hover:bg-gray-800 transition"
                            onClick={handleSignup}
                        >
                            Create Account
                        </button>

                        <button
                            className="flex-1 bg-white border border-black text-black p-3 rounded hover:bg-gray-200 transition"
                            onClick={handleLogin}
                        >
                            Log in
                        </button>
                    </div>

                    {/* Google and Apple sign-in buttons */}
                    <div className="flex space-x-4 mt-4">
                        <button
                            className="flex-1 bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
                            onClick={signInWithGoogle}
                        >
                            Sign in with Google
                        </button>

                        <button
                            className="flex-1 bg-black text-white p-3 rounded hover:bg-gray-800 transition"
                            onClick={signInWithApple}
                        >
                            Sign in with Apple
                        </button>
                    </div>

                    {message && <p className="mt-4 text-red-500">{message}</p>}
                </div>
            </div>
        </div>
    )
}
