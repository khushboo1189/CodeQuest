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
        <div className="values flex">
            <p className="problem_no">{problem.id}</p>
            <Link to={`/problem/${problem.id}`} className="problem_name">
                {problem.short_name}
            </Link>
            <p className="problem_type">{problem.type}</p>
            <p className="problem_difficulty">{problem.difficulty}</p>
            <p className="problem_time">{problem.time}</p>
            <p className="problem_language">{problem.language}</p>
            <p className="problem_score">{problem.score}</p>
            <p className="problem_status">
            {status[problem.id] ? status[problem.id] : "Not Attempted"}
            </p>
        </div>
    );
}

export default Values;
export type { Problem };
