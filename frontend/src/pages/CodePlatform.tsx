import { useEffect, useState } from "react";
import CodeEditor from "../components/CodeEditor";
import FirebaseInit from "../firebase/FirebaseInit";

function CodePlatform() {
    const url = window.location.href;
    const lastPart = url.split('/').pop()?.toString();

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

    return (
        <div className="h-full w-full flex">
            <div className="flex-1 h-full w-full"></div>
            <div className="flex-1 h-full w-full">
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
        </div>
    )
}

export default CodePlatform;