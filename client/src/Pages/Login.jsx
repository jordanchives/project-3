// Login.jsx
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useState } from 'react';
import auth from '../utils/auth';

function Login() {
    const [login, { error }] = useMutation(LOGIN_USER);
    
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await login({
                variables: {
                    email: e.target.email.value,
                    password: e.target.password.value,
                },
            });
            
            auth.login(data.login.token);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <>
            <div>
                <h1 className="">Login Page</h1>
            </div>
            <div className="flex">
                <form className="flex text-[white]" onSubmit={handleFormSubmit}>
                    <label className="" htmlFor="email">Email</label>
                    <input className="text-[black]" type="text" name="email" id="email" placeholder="Enter Email" />
                    <label htmlFor="password">Password:</label>
                    <input className="text-[black]" type="password" name="password" id="password" placeholder="Enter Password" />
                    <div className="bg-red-500 flex items-center">
                        <div className="">    
                            <button type="submit">Login</button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}

export default Login;
