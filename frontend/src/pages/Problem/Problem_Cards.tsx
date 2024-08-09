import { useEffect, useState } from "react";
import FirebaseInit from "../../firebase/FirebaseInit";

interface ProblemCardProps {
	problems: Object;
}

const Problem_Cards = (problems: ProblemCardProps) => {
	const problem_list = problems.problems;
	const hard_questions = problem_list ? Object.values(problem_list).filter((value) => value.difficulty === 'Hard').length : 0;
	const medium_questions = problem_list ? Object.values(problem_list).filter((value) => value.difficulty === 'Medium').length : 0;
	const easy_questions = problem_list ? Object.values(problem_list).filter((value) => value.difficulty === 'Easy').length : 0;
	const [openedQuestions, setOpenedQuestions] = useState(0);
	const [attemptedQuestions, setAttemptedQuestions] = useState(0);
	const [submittedQuestions, setSubmittedQuestions] = useState(0);
	const [notAttemptedQuestions, setNotAttemptedQuestions] = useState(0);
	const [questions, setQuestions] = useState("Loading...");
	const [loggedIn, setLoggedIn] = useState<boolean>();

	useEffect(() => {
		if (problem_list && Object.keys(problem_list).length > 0) {
			setQuestions(Object.keys(problem_list).length.toString());
		}
		if (problem_list === 0) {
			setQuestions("No Questions Available!");
		}
	}, [problem_list]);

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
					setOpenedQuestions(data ? Object.keys(data).length : 0);
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

	return (
		<>
			<div className="problem-cards-container w-full flex sm:flex-col justify-center items-center gap-20 sm:gap-10">
				<div className="problem-card self-stretch flex flex-col justify-center items-center rounded-2xl">
					<div className="question-info-holder flex flex-col w-full h-full gap-3">
						<p className="card-total-questions flex gap-2 flex-wrap">
							Total Number of Questions:
							<span className={`${(questions === "No Questions Available!") ? 'text-[red]' : ''}`}>{questions}</span>
						</p>
						{(Object.keys(problem_list).length > 0) && <p className="card-difficulty flex flex-col gap-3">
							Difficulty:
							<span className="card-difficulty-container flex flex-col sm:flex-row pl-5 sm:pl-0 sm:justify-center sm:items-center gap-3">
								<span className="text-[red]">Hard: {hard_questions}</span>
								<span className="text-[orange]">Medium: {medium_questions}</span>
								<span className="text-[green]">Easy: {easy_questions}</span>
							</span>
						</p>}
					</div>
				</div>
				{(Object.keys(problem_list).length > 0) && <div className="problem-card self-stretch flex flex-col justify-center items-center rounded-2xl">
					<div className="user-question-info h-full w-full flex flex-col gap-4 justify-center">
						<p className="user-question-opened">
							Total Number of Questions Opened: {openedQuestions}
						</p>
						<p className="user-question-attempted">
							Total Number of Questions Attempts: {attemptedQuestions}
						</p>
						<p className="user-question-solved">
							Total Questions Solved: {submittedQuestions}
						</p>
						<p className="user-question-not-attempted">
							Total Not Attempted Questions: {notAttemptedQuestions}
						</p>
					</div>
				</div>}
			</div>
		</>
	)
}

export default Problem_Cards;
