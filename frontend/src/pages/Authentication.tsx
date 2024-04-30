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

    return (
        <div className="h-auto w-full flex justify-center items-center">
            <div className="container-box flex flex-col justify-center items-center">
                <p className="heading">{isRegistering ? 'Register' : 'Login'}</p>
                {isRegistering && <input type="text" placeholder="Username" className="input text-box mt-4" value={username} onChange={(e) => setUsername(e.target.value)} />}
                <input type="text" placeholder="Email" className="input text-box mt-4" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" className="input text-box mt-4" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className="button btn mt-12" onClick={handleLogin}>{isRegistering ? 'Register' : 'Login'}</button>
                {isRegistering ? <p className="mt-5 text-[18px]">Account Already Exists?<Link className="text-[grey] ml-1 underline" to="/authentication" onClick={toggleMode}>Login</Link></p> : <p className="mt-5 text-[18px]">New to CodeQuest?<Link className="text-[grey] ml-1 underline" to="/authentication" onClick={toggleMode}>Register</Link></p>}
            </div>
        </div>
    )
}

export default Authentication;
