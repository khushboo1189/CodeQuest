import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import FirebaseInit from "../firebase/FirebaseInit";

function CodePlatform() {
    const url = window.location.href;
    const lastPart = url.split('/').pop()?.toString() || "0";

    const [problems, setProblems] = useState(Object);
    const [outputCode, setOutputCode] = useState("");
    const [inputCall, setInputCall] = useState("main()");
    const [attempts, setAttempts] = useState(0);

    useEffect(() => {
        const fetchAttempts = async () => {
            try {
                const data = await FirebaseInit.currentAttempts(lastPart);
                setAttempts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchAttempts();
    }, []);

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
                const currentAttempts = await FirebaseInit.currentAttempts(lastPart);
                if (data) {
                    // If problem exists, update status
                    if (!data[lastPart]) {
                        data[lastPart] = {
                            id: lastPart,
                            status: currentAttempts > 0 ? "Attempted" : "Opened",
                            attempts: 0,
                        };
                    }
                    await FirebaseInit.updateUserProblems(data);
                } else {
                    // If problem does not exist, add problem
                    const newData = {
                        [lastPart]: {
                            id: lastPart,
                            status: "Opened",
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
        const fetchOutput = async () => {
            try {
                // Fetch output from Problems
                const output_value = problems.hasOwnProperty("pb-"+lastPart) ? problems["pb-"+lastPart].output : "";
                if (output_value) {
                    setOutputCode(output_value);
                }
                // Fetch input call from Firebase if user has submitted code or use default input call
                let input_call = problems.hasOwnProperty("pb-"+lastPart) ? problems["pb-"+lastPart].output_format : "";
                if (input_call) {
                    setInputCall(input_call);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        fetchOutput();
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
                                <p>Example Input: {problem.output_format}</p>
                                <p>Example Output: {problem.output}</p>
                                <p>Current Attempts: {attempts}</p>
                            </div>
                        )
                    })
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            <div className="flex-1 h-[calc(100vh-130px)] w-full sm:hidden">
                {problems ? (
                    Object.keys(problems).map((key) => {
                        const problem = problems[key];
                        return String(problem.id) === lastPart && (
                            <CodeEditor key={key} problem={problems["pb-"+lastPart]} problem_no={lastPart} output={outputCode} input_call={inputCall} />
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