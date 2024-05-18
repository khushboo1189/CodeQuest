import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import FirebaseInit from "../firebase/FirebaseInit";

function CodePlatform() {
    const url = window.location.href;
    const lastPart = url.split('/').pop()?.toString() || "0";

    const [problems, setProblems] = useState(Object);

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const data = await FirebaseInit.getProblems();
                setProblems(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchProblems();
    }, []);

    useEffect(() => {
        const addProblem = async () => {
            try {
                const data = await FirebaseInit.getUserProblems();
                if (data) {
                    if (!data[lastPart]) {
                        data[lastPart] = {
                            id: lastPart,
                            status: "Attempted",
                            attempts: 0,
                        };
                    }
                    await FirebaseInit.updateUserProblems(data);
                } else {
                    const newData = {
                        [lastPart]: {
                            id: lastPart,
                            status: "Attempted",
                            attempts: 0,
                        },
                    };
                    await FirebaseInit.updateUserProblems(newData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        addProblem();
    }, [problems]);


    useEffect(() => {
        document.title = `CodeQuest | Problem ${lastPart}`;
    }, []);

    return (
        <div className="h-auto w-full flex">
            <div className="flex-1 h-auto w-full flex justify-center items-center sm:hidden">
                {problems ? (
                    Object.keys(problems).map((key) => {
                        const problem = problems[key];
                        return String(problem.id) === lastPart && (
                            <div className="problem-info flex flex-col h-auto w-[calc(80vw/2)]">
                                <h1>{problem.short_name}</h1>
                                <p className="description">{problem.description}</p>
                                <p>Difficulty: {problem.difficulty}</p>
                                <p>Example Input: {problem.input}</p>
                                <p>Example Output: {problem.output}</p>
                            </div>
                        )
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="flex-1 h-full w-full sm:hidden">
                {problems ? (
                    Object.keys(problems).map((key) => {
                        const problem = problems[key];
                        return String(problem.id) === lastPart && (
                            <CodeEditor key={key} input={problem.input_format || "def main():\n"} />
                        )
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="hidden sm:flex-auto sm:h-auto sm:w-full sm:flex justify-center items-center">
                <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <h1 className="text-3xl font-semibold text-center text-gray-800">
                        The Coding Section is Best Viewed on a Computer
                    </h1>
                    <p className="mt-4 text-lg text-center text-gray-600">
                        For the best experience, please access this section on a desktop or laptop computer.
                    </p>
                </div>
            </div>

        </div>
    )
}

export default CodePlatform;