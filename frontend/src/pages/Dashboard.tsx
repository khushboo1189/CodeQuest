import { useEffect, useState } from "react";
import UserPhoto from "../components/UserPhoto";
import '../styles/Dashboard.css';
import FirebaseInit from "../firebase/FirebaseInit";

function Dashboard() {

	const [userDetails, setUserDetails] = useState(Object);

	const logout = async () => {
		await FirebaseInit.logout();
		window.location.href = '/';
	}

	useEffect(() => {
		const fetchDetails = FirebaseInit.auth.currentUser;
		setUserDetails(fetchDetails);
	}, []);

	useEffect(() => {
		document.title = 'CoddeQuest | Dashboard';
	}, []);

	return (
		<div className="h-auto w-full">
			<div className="profile-section flex flex-col justify-center items-center mt-5">
				<div className="profile-image">
					<UserPhoto />
				</div>
				<div className="profile-info">
					<p className="username text-center">{userDetails["displayName"]}</p>
					<p className="email text-center">{userDetails["email"]}</p>
				</div>
				<button className="logout-btn" onClick={logout}>
					Logout
				</button>
			</div>
		</div>
	)
}

export default Dashboard;