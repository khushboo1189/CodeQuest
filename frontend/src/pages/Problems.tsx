import { useEffect, useState } from "react";
import '../styles/Problems.css';
import FirebaseInit from "../firebase/FirebaseInit";
import Values from "../components/Values";

function Problems() {
	const [problems, setProblems] = useState(Object); // Initialize state with null
	let questions = problems ? Object.keys(problems).length : 0;
	let hard_questions = problems ? Object.keys(problems).filter((key) => problems[key].difficulty === 'Hard').length : 0;
	let medium_questions = problems ? Object.keys(problems).filter((key) => problems[key].difficulty === 'Medium').length : 0;
	let easy_questions = problems ? Object.keys(problems).filter((key) => problems[key].difficulty === 'Easy').length : 0;
	const [openedQuestions, setopenedQuestions] = useState(0);
	const [attemptedQuestions, setAttemptedQuestions] = useState(0);
	const [submittedQuestions, setSubmittedQuestions] = useState(0);
	const [notAttemptedQuestions, setNotAttemptedQuestions] = useState(0);

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

	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		const unsubscribe = FirebaseInit.auth.onAuthStateChanged((user: any) => {
			setLoggedIn(!!user);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (loggedIn) {
			const fetchUserProblems = async () => {
				try {
					const data = await FirebaseInit.getUserProblems();
					setopenedQuestions(data ? Object.keys(data).length : 0);
					const attempts = await FirebaseInit.getTotalUserAttempts();
					setAttemptedQuestions(attempts ?? 0);
					const submits = await FirebaseInit.getTotalSubmittedProblems();
					setSubmittedQuestions(submits ?? 0);
					const notAttempted = await FirebaseInit.getUserNotAttemptedProblems();
					setNotAttemptedQuestions(notAttempted ?? 0);
				} catch (error) {
					console.error('Error fetching data:', error);
				}
			};

			fetchUserProblems();
		}
	}, [loggedIn]);

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
						<span className="text-black ml-1">{hard_questions}</span>
					</p>
					<p className="text-[orange]">
						Medium:
						<span className="text-black ml-1">{medium_questions}</span>
					</p>
					<p className="text-[green]">
						Easy:
						<span className="text-black ml-1">{easy_questions}</span>
					</p>
				</div>
				<div className="card flex-1">
					<p className="">Total Number of Questions Opened: {openedQuestions}</p>
					<p className="">Total Number of Questions Attempted: {attemptedQuestions}</p>
					<p className="">Total Questions Solved: {submittedQuestions}</p>
					<p className="">Total Not Attempted Questions: {notAttemptedQuestions}</p>
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
							<div className="text-2xl h-[100px] w-full flex justify-center items-center">
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