import { Link } from "react-router-dom";

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
            <p className="problem_status">{problem.status}</p>
        </div>
    );
}

export default Values;
export type { Problem };
