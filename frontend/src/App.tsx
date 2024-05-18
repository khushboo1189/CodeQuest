import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Problems from './pages/Problems';
import Navbar from './components/Navbar';
import About from './pages/About';
import Authentication from './pages/Authentication';
import NotFound from './pages/NotFound';
import { useEffect, useState } from 'react';
import FirebaseInit from './firebase/FirebaseInit';
import Dashboard from './pages/Dashboard';
import CodePlatform from './pages/CodePlatform';
import SignUpError from './pages/SignUpError';
import ForgotPassword from './pages/ForgotPassword';

export default function App() {
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = FirebaseInit.auth.onAuthStateChanged((user: any) => {
			setLoggedIn(!!user);
		});
		return () => unsubscribe();
	}, []);

	return (
		<Router>
			<Navbar />
			<div>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/problem" element={<Problems />} />
					<Route path="/about" element={<About />} />
					{!loggedIn && <Route path="/authentication" element={<Authentication />} />}
					{!loggedIn && <Route path="/forgot-password" element={<ForgotPassword />} />}
					{loggedIn && <Route path="/dashboard" element={<Dashboard />} />}
					{loggedIn ? <Route path="/problem/*" element={<CodePlatform />} /> : <Route path="/problem/*" element={<SignUpError />} />}
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
};

