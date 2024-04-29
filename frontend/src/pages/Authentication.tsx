import { useEffect, useState } from "react";
import '../styles/Authentication.css';
import FirebaseInit from "../firebase/FirebaseInit";

function Authentication() {
	useEffect(() => {
		document.title = 'CoddeQuest | Authentication';
	}, []);

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [LoggedIn, setLoggedIn] = useState(FirebaseInit.isLoggedIn() ? 'true' : 'false');

	const handleLogin = () => {
		// Handle login and make sure to add it to global FirebaseInit object after user login
		if (email !== '' && password !== '') {
			if (LoggedIn !== 'true') {
				FirebaseInit.loginUser(email, password);
				setLoggedIn(FirebaseInit.isLoggedIn() ? 'true' : 'false');
			} else {
				alert('User is already logged in');
			}
		} else {
			if (email === '' && password === '') {
				alert('Email and password are required');
			}
			else if (email === '') {
				alert('Email is required');
			}
			else if (password === '') {
				alert('Password is required');
			}
		}
	}

	return (
		<div className="h-screen w-full flex justify-center items-center">
			<div className="container-box flex flex-col justify-center items-center">
				<p className="heading">Login</p>
				<input type="text" placeholder="Email" className="input text-box mt-4" value={email} onChange={(e) => setEmail(e.target.value)} />
				<input type="password" placeholder="Password" className="input text-box mt-4" value={password} onChange={(e) => setPassword(e.target.value)} />
				<button className="button btn mt-12" onClick={handleLogin}>Login</button>
				<p className="text-2xl mt-6">LoggedIn: {LoggedIn}</p>
			</div>
		</div>
	)
}

export default Authentication;