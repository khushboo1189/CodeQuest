import { useEffect } from "react";
import Placeholder from '/Logo.jpg';
import GithubLogo from '/github_logo.png';
import LinkedinLogo from '/LinkedIn_logo.png';
import '../styles/About.css';

function About() {
	useEffect(() => {
		document.title = 'CoddeQuest | About Us';
	}, []);

	return (
		<div className="h-auto w-full flex justify-center items-center">
			<div className="h-full w-[80vw] flex justify-center items-center flex-col">
				<div className="container-box w-full flex flex-col justify-center items-center">
					<p className="heading">About Us</p>
					<p className="mt-4 content-1 text-center">We are a group of developers who are passionate about creating software that is both functional and beautiful. Our goal is to provide the best possible experience for our users, and we are always looking for ways to improve our products.</p>
					<p className="mt-8 content-2 text-center">If you have any questions or feedback, please feel free to contact us at <a href="mailto:khushbookamra8@gmail.com"> khushbookamra8@gmail.com </a></p>
				</div>
				<div className="card-holders flex p-5 sm:flex-col h-full mt-16">
					<div className="card flex flex-col justify-center items-center sm:w-full sm:mt-10">
						<img src={Placeholder} alt="Khushboo Kamra" />
						<p className="text-center name">Khushboo Kamra</p>
						<p className="text-center info">Web Developer</p>
						<div className="links flex flex-wrap">
							<a href="https://github.com/khushboo1189" target="_blank" rel="noreferrer"> <img src={GithubLogo} alt="Github Logo" /> </a>
							<a href="https://github.com/khushboo1189" target="_blank" rel="noreferrer"> <img src={LinkedinLogo} alt="Linkedin Logo" /> </a>
						</div>
					</div>
					<div className="card flex flex-col justify-center items-center sm:w-full sm:mt-10 mb-10">
						<img src={Placeholder} alt="Gautam Aggarwal" />
						<p className="text-center name">Gautam Aggarwal</p>
						<p className="text-center info">UI/UX Designer</p>
						<div className="links flex flex-wrap">
							<a href="https://github.com/khushboo1189" target="_blank" rel="noreferrer"> <img src={GithubLogo} alt="Github Logo" /> </a>
							<a href="https://github.com/khushboo1189" target="_blank" rel="noreferrer"> <img src={LinkedinLogo} alt="Linkedin Logo" /> </a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default About;