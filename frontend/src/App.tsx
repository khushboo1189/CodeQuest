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
					<Route path="/problems" element={<Problems />} />
					<Route path="/about" element={<About />} />
					{!loggedIn && <Route path="/authentication" element={<Authentication />} />}
					{loggedIn && <Route path="/dashboard" element={<Dashboard />} />}
					<Route path="/*" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
};

