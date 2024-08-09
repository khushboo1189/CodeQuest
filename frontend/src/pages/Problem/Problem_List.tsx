import { useEffect, useState } from "react";
import Values from "../../components/Values";

interface ProblemListProps {
	list_problems: Object;
}

const Problem_List = (list_problems: ProblemListProps) => {

	const [problem_list, setProblemList] = useState<Object>({});

	useEffect(() => {
		if (list_problems.list_problems && Object.keys(list_problems.list_problems).length > 0) {
			setProblemList(list_problems.list_problems);
			console.log(problem_list);
		}
		if (list_problems.list_problems === 0) {
			setProblemList("No Questions Available!");
		}
	}, [list_problems]);

	return (
		<>
			<div className="problem-list-container w-full h-full overflow-x-scroll rounded-2xl">
				<p className="problem-table-title">Questions: </p>
				<hr className="bg-black h-1 mb-5" />
				<table className="problem-table relative w-full h-full border-spacing-x-[1rem]">
					<thead>
						<tr className="w-full">
							<th className="w-1/12 rounded-md p-3">No.</th>
							<th className="w-2/12 rounded-md p-3">Name</th>
							<th className="w-1/12 rounded-md p-3">Type</th>
							<th className="w-1/12 rounded-md p-3">Difficulty</th>
							<th className="w-1/12 rounded-md p-3">Time</th>
							<th className="w-1/12 rounded-md p-3">Language</th>
							<th className="w-1/12 rounded-md p-3">Score</th>
							<th className="w-1/12 rounded-md p-3">Status</th>
						</tr>
					</thead>
					<tbody>
						{(Object.keys(problem_list).length > 0) ? (
							Object.entries(problem_list).map(([key, value]) => {
								return (
									<Values problem={value} key={key} />
								)
							})
						) : (
							<tr className="w-full">
								<td className="loading-text text-center">Loading...</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default Problem_List
