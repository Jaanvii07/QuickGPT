import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import toast from 'react-hot-toast';

const Login = () => {
    const [state, setState] = useState("login");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const { axios, setToken } = useAppContext();

    // List of trusted domains
    const allowedDomains = [
        "gmail.com",
        "yahoo.com",
        "outlook.com",
        "hotmail.com",
        "icloud.com",
        "inbox.com"
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        // --- VALIDATION STEP (Only for Register) ---
        if (state === "register") {
            const [localPart, domainPart] = email.split("@");

            // 1. Check if domain is trusted
            if (!domainPart || !allowedDomains.includes(domainPart.toLowerCase())) {
                toast.error("Please use a proper email provider (e.g., Gmail, Outlook)");
                return;
            }

            // 2. Check if username is junk (numbers only or too short)
            const isJustNumbers = /^\d+$/.test(localPart);
            const isTooShort = localPart.length < 3;

            if (isJustNumbers) {
                toast.error("Email username cannot be just numbers.");
                return;
            }

            if (isTooShort) {
                toast.error("Email username is too short.");
                return;
            }
        }
        // -------------------------------------------

        const url = state === "login" ? '/api/user/login' : '/api/user/register';

        try {
            const { data } = await axios.post(url, { name, email, password });

            if (data.success) {
                setToken(data.token);
                localStorage.setItem('token', data.token);
                toast.success(state === "login" ? "Logged in!" : "Account created!");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] text-gray-500 rounded-lg shadow-xl border border-gray-200 bg-white">
            <p className="text-2xl font-medium m-auto">
                <span className="text-purple-700">User</span> {state === "login" ? "Login" : "Sign Up"}
            </p>

            {state === "register" && (
                <div className="w-full">
                    <p>Name</p>
                    <input 
                        onChange={(e) => setName(e.target.value)} 
                        value={name} 
                        placeholder="Your Name" 
                        className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" 
                        type="text" 
                        required 
                    />
                </div>
            )}

            <div className="w-full">
                <p>Email</p>
                <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    placeholder="user@gmail.com" 
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" 
                    type="email" 
                    required 
                />
            </div>

            <div className="w-full">
                <p>Password</p>
                <input 
                    onChange={(e) => setPassword(e.target.value)} 
                    value={password} 
                    placeholder="********" 
                    className="border border-gray-200 rounded w-full p-2 mt-1 outline-purple-700" 
                    type="password" 
                    required 
                />
            </div>

            {state === "register" ? (
                <p>
                    Already have account? <span onClick={() => setState("login")} className="text-purple-700 cursor-pointer">click here</span>
                </p>
            ) : (
                <p>
                    Create an account? <span onClick={() => setState("register")} className="text-purple-700 cursor-pointer">click here</span>
                </p>
            )}

            <button type='submit' className="bg-purple-700 hover:bg-purple-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
                {state === "register" ? "Create Account" : "Login"}
            </button>
        </form>
    );
};

export default Login;