import { useEffect } from "react";
import '../styles/Problems.css';
import Values from "../components/Values";

function Problems() {
	let questions: number = 9;

	let values = [
		{
			problem_no: 1,
			problem_name: "Two Sum",
			problem_type: "Array",
			problem_time: "1",
			problem_language: "Python, C, Java, C++",
			problem_score: "100",
			problem_status: "Accepted"
		},
		{
			problem_no: 2,
			problem_name: "Add Two Numbers",
			problem_type: "Linked List",
			problem_time: "1",
			problem_language: "Python",
			problem_score: "100",
			problem_status: "Accepted"
		},
		{
			problem_no: 3,
			problem_name: "Longest Substring Without Repeating Characters",
			problem_type: "String",
			problem_time: "1",
			problem_language: "Python",
			problem_score: "100",
			problem_status: "Accepted"
		},
		{
			problem_no: 4,
			problem_name: "Median of Two Sorted Arrays",
			problem_type: "Array",
			problem_time: "1",
			problem_language: "Python",
			problem_score: "100",
			problem_status: "Accepted"
		},
		{
			problem_no: 5,
			problem_name: "Longest Palindromic Substring",
			problem_type: "String",
			problem_time: "1",
			problem_language: "Python",
			problem_score: "100",
			problem_status: "Accepted"
		},
		{
			problem_no: 6,
			problem_name: "ZigZag Conversion",
			problem_type: "String",
			problem_time: "1",
			problem_language: "Python",
			problem_score: "100",
			problem_status: "Accepted"
		},
		{
			problem_no: 7,
			problem_name: "Reverse Integer",
			problem_type: "Math",
			problem_time: "1",
			problem_language: "Python",
			problem_score: "100",
			problem_status: "Accepted",
			problem_link: "/problems"
		},
		{
			problem_no: 8,
			problem_name: "String to Integer (atoi)",
			problem_type: "String",
			problem_time: "1",
			problem_language: "Python",
			problem_score: "100",
			problem_status: "Accepted"
		},
		{
			problem_no: 9,
			problem_name: "Palindrome Number",
			problem_type: "Math",
			problem_time: "1",
		}
	];

	useEffect(() => {
		document.title = 'CoddeQuest | Problems';
	}, []);

	return (
		<div className="w-full h-auto">
			<div className="card-holder h-full flex">
				<div className="card flex-1 ">
					<p>Total Number of Questions: {questions}</p>
					<p className="text-[red]">Hard:
						<span className="text-black ml-1">{questions}</span>
					</p>
					<p className="text-[orange]">Medium:
						<span className="text-black ml-1">{questions}</span>
					</p>
					<p className="text-[green]">Easy:
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
						{values.map((value, index) => {
							return (
								<Values
									key={index}
									problem_no={value.problem_no}
									problem_name={value.problem_name}
									problem_type={value.problem_type}
									problem_time={value.problem_time}
									problem_language={value.problem_language}
									problem_score={value.problem_score}
									problem_status={value.problem_status}
									problem_link={value.problem_link}
								/>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Problems;