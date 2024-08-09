import { useEffect, useState } from "react";
import '../../styles/Problems.css';
import FirebaseInit from "../../firebase/FirebaseInit";
import Problem_Cards from "./Problem_Cards";
import Problem_List from "./Problem_List";

const Problems = () => {
	const [problems_list, setProblems] = useState(Object); // Initialize state with null

	useEffect(() => {
		document.title = 'CoddeQuest | Problems';
	}, []);

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

	return (
		<>
			<div className="problem-page min-h-[400px] max-w-[100vw] flex flex-col">
				<Problem_Cards problems={problems_list} />
				<Problem_List list_problems={problems_list} />
			</div>
		</>
	)
}

export default Problems;