import { useState } from "react";
import { Link } from "react-router-dom";
import FirebaseInit from "../firebase/FirebaseInit";

interface Problem {
	id: number;
	description: string;
	difficulty: string;
	input: string;
	input_format: string;
	language: string;
	output: string;
	output_format: string;
	score: number;
	short_name: string;
	status: string;
	time: number;
	type: string;
}

interface ValuesProps {
	problem: Problem;
}


function Values({ problem }: ValuesProps) {
	// Fetch the list of attempted problems from Firebase users under user uid in problem_list and display them if attempted or display default "Not Attempted"

	const [status, setStatus] = useState({} as { [key: number]: string });
	const checkStatus = async () => {
		const data = await FirebaseInit.getUserProblems();
		if (data) {
			const updatedStatus: { [key: number]: string } = {};
			for (const key in data) {
				if (data.hasOwnProperty(key)) {
					updatedStatus[data[key].id] = data[key].status;
				}
			}
			setStatus(updatedStatus);
		}
	};
	checkStatus();


	return (
		<tr className={`problem-${problem.id} w-full`}>
			<td className="w-1/12 text-center p-3">{problem.id}</td>
			<td className="w-2/12 text-center p-3 hover:text-[#153448] hover:scale-105">
				<Link to={`/problem/${problem.id}`}>{problem.short_name}</Link>
			</td>
			<td className="w-1/12 text-center p-3">{problem.type}</td>
			<td className="w-1/12 text-center p-3">{problem.difficulty}</td>
			<td className="w-1/12 text-center p-3">{problem.time}</td>
			<td className="w-1/12 text-center  p-3">{problem.language}</td>
			<td className="w-1/12 text-center p-3">{problem.score}</td>
			<td className="w-1/12 text-center p-3">
				{status[problem.id] ? status[problem.id] : "Not Attempted"}
			</td>
		</tr>
	);
}

export default Values;
export type { Problem };
