import { useEffect } from "react";
import '../styles/Problems.css';
import Values from "../components/Values";
import FirebaseInit from "../firebase/FirebaseInit";

function Problems() {
	let questions: number = 9;

	useEffect(() => {
		document.title = 'CoddeQuest | Problems';
	}, []);

	const db = FirebaseInit.init_db();

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
				<div className="card flex-1">HI</div>
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
							<p className="problem_time">Time</p>
							<p className="problem_language">Language</p>
							<p className="problem_score">Score</p>
							<p className="problem_status">Status</p>
						</div>
						{Object.entries(db).map(([key, problem]: [string, any]) => (
							<Values
								key={(key.toString())} // Convert the problem ID from string to number
								id={problem.id}
								short_name={problem.short_name}
								type={problem.type}
								time={problem.time}
								language={problem.language}
								score={problem.score}
								status={problem.status}
								link={`/problem/${problem.id}`} 
								description={""}
								difficulty={problem.difficulty}
								input={problem.input}
								input_format={problem.input_format}
								output={problem.output}
								output_format={problem.output_format}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Problems;