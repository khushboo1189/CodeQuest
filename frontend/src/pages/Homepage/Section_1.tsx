import { Link } from "react-router-dom"

const Section_1 = () => {
	return (
		<>
			<div className="hero-section h-full w-full flex flex-col justify-center items-center p-10 gap-10">
				<div className="hero-section-content flex flex-col justify-center items-center">
					<h3 className="hero-section-title">Welcome to</h3>
					<h1 className="hero-section-name"><big>CoddeQuest</big></h1>
					<h5 className="hero-section-description">The best place to practice coding!</h5>
				</div>
				<Link to="/problem" className="get-started-btn bg-[#112226] rounded-2xl flex gap-2">
					<span className="flex flex-wrap text-center flex-auto">Get Started </span>
					<div className="arrow-svg flex-none flex justify-center items-center">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="flex-none flex justify-center items-center">
							<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
						</svg>
					</div>
				</Link>
			</div>
		</>
	)
}

export default Section_1
