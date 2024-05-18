import { useEffect, useState } from "react";
import '../styles/Authentication.css';
import FirebaseInit from "../firebase/FirebaseInit";
import { Link, useNavigate } from "react-router-dom";

function Authentication() {
    useEffect(() => {
        document.title = 'CoddeQuest | Authentication';
    }, []);

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(true);
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (email !== '' && password !== '') {
            try {
                if (isRegistering) {
                    await FirebaseInit.registerUser(email, password, username);
                } else {
                    await FirebaseInit.loginUser(email, password);
                }
                navigate('/');
            } catch (error) {
                console.error('An error occurred during sign in:', error);
            }
        } else {
            if (email === '' && password === '') {
                alert('Email and password are required');
            } else if (email === '') {
                alert('Email is required');
            } else if (password === '') {
                alert('Password is required');
            }
        }
    }

    const toggleMode = () => {
        setIsRegistering(prevState => !prevState);
    }

    const PasswordHandle = () => {
        // show and hide password accordingly
        const passwordInput = document.querySelector('.password-input');
        const eyeIcon = document.querySelector('.eye-icon svg');
        if (passwordInput && eyeIcon) {
            if (passwordInput.getAttribute('type') === 'password') {
                passwordInput.setAttribute('type', 'text');
            } else {
                passwordInput.setAttribute('type', 'password');
            }
        }
    }

    return (
        <div className="h-auto w-full flex justify-center items-center">
            <div className="container-box flex flex-col justify-center items-center">
                <p className="heading">{isRegistering ? 'Register' : 'Login'}</p>
                {isRegistering && <input type="text" placeholder="Username" className="input text-box mt-4 self-start" value={username} onChange={(e) => setUsername(e.target.value)} />}
                <input type="text" placeholder="Email" className="email-input input text-box mt-4 self-start" value={email} onChange={(e) => setEmail(e.target.value)} />
                <div className="flex w-full">
                    <input type="password" placeholder="Password" className="password-input input text-box mt-4 flex-auto" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <div className="eye-icon flex-none flex justify-center items-center mt-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={PasswordHandle}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15a7.5 7.5 0 01-7.5-7.5" />
                        </svg>
                    </div>
                </div>
                <Link className="text-[grey] mt-2 underline" to="/forgot-password">Forgot Password?</Link>
                <button className="button btn mt-12" onClick={handleLogin}>{isRegistering ? 'Register' : 'Login'}</button>

                {isRegistering ? <p className="mt-5 text-[18px]">Account Already Exists?<Link className="text-[grey] ml-1 underline" to="/authentication" onClick={toggleMode}>Login</Link></p> : <p className="mt-5 text-[18px]">New to CodeQuest?<Link className="text-[grey] ml-1 underline" to="/authentication" onClick={toggleMode}>Register</Link></p>}
            </div>
        </div>
    );
}

export default Authentication;
