import { Link, useNavigate } from "react-router-dom"
import '../styles/Authentication.css';
import { useEffect, useState } from "react";
import FirebaseInit from "../firebase/FirebaseInit";

function ForgotPassword() {
	useEffect(() => {
		document.title = 'CoddeQuest | Authentication';
	}, []);

	const [email, setEmail] = useState('');
	const navigate = useNavigate();

	const handleResetPassword = () => {
		if (email !== '') {
			FirebaseInit.resetPassword(email);
			alert('Password reset email sent!');
			navigate('/authentication');
		} else {
			alert('Email is required');
		}
	}

	return (
		<div className="h-auto w-full flex justify-center items-center">
			<div className="container-box flex flex-col justify-center items-center">
				<p className="heading">Forgot Password</p>
				<input type="text" placeholder="Email" className="email-input input text-box mt-4" value={email} onChange={(e) => setEmail(e.target.value)} />
				<button className="btn mt-4" onClick={handleResetPassword}>Reset Password</button>
				<Link to="/authentication" className="btn mt-4">Back to Login</Link>
			</div>
		</div>
	)
}

export default ForgotPassword;