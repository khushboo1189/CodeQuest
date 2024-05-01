import { useEffect, useState } from "react";
import '../styles/Problems.css';
import FirebaseInit from "../firebase/FirebaseInit";
import Values from "../components/Values";

function Problems() {
	const [problems, setProblems] = useState(Object); // Initialize state with null
	let questions = problems ? Object.keys(problems).length : 0;

    useEffect(() => {
		const fetchProblems = async () => {
			try {
				const data = await FirebaseInit.getProblems();
				if (data) {
					setProblems(data);
				}
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchProblems();
	}, []);

	useEffect(() => {
		document.title = 'CoddeQuest | Problems';
	}, []);

	return (
		<div className="w-full h-auto">
			<div className="card-holder h-full flex">
				<div className="card flex-1 ">
					<p>Total Number of Questions: {questions}</p>
					<p className="text-[red]">
						Hard:
						<span className="text-black ml-1">{questions}</span>
					</p>
					<p className="text-[orange]">
						Medium:
						<span className="text-black ml-1">{questions}</span>
					</p>
					<p className="text-[green]">
						Easy:
						<span className="text-black ml-1">{questions}</span>
					</p>
				</div>
				<div className="card flex-1">
					<p className="">Total Number of Attempted: {questions}</p>
				</div>
			</div>
			<div className="question-holder">
				<div className="question-box w-full">
					<p className="heading">Questions</p>
					<hr className="border-t-4 border-black mb-2" />
					<div className="box w-full flex flex-col">
						<div className="subheadings flex">
							<p className="problem_no">No.</p>
							<p className="problem_name">Name</p>
							<p className="problem_type">Type</p>
							<p className="problem_difficulty">Difficulty</p>
							<p className="problem_time">Time</p>
							<p className="problem_language">Language</p>
							<p className="problem_score">Score</p>
							<p className="problem_status">Status</p>
						</div>
						{problems ? (
							Object.keys(problems).map((key) => (
								<Values key={key} problem={problems[key]} />
							))
						) : (
							<div>Loading...</div>
						)}
						{!problems ? (
							<div>Loading...</div>
						) : Object.keys(problems).length === 0 ? (
							<div className="text-2xl h-[100px] w-full flex  justify-center items-center">
								<p>No Questions Available!</p>
							</div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Problems;