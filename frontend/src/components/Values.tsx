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
    link: string;    
}

interface ValuesProps {
    key: string;
    problem: Problem;
}

function Values({ id, short_name, type, time, language, score, status, link }: Problem) {
    return (
        <div className="values flex">
            <p className="problem_no">{id}</p>
            <a className="problem_name" href={`/problem/${link}`}>{short_name}</a>
            <p className="problem_type">{type}</p>
            <p className="problem_time">{time}</p>
            <p className="problem_language">{language}</p>
            <p className="problem_score">{score}</p>
            <p className="problem_status">{status}</p>
        </div>
    );
}

export default Values;
