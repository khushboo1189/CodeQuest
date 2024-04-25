interface ValuesProps {
    key: number;
    problem_no: number;
    problem_name: string;
    problem_type: string;
    problem_time: string;
    problem_language?: string;
    problem_score?: string;
    problem_status?: string;
    problem_link?: string;
}

function Values({problem_no, problem_name, problem_type = "Not Mentioned", problem_time = "Not Mentioned", problem_language = "Any", problem_score = "0", problem_status = "Not Completed!", problem_link = "/problems"}: ValuesProps) {
    return (
        <div className="values flex">
            <p className="problem_no">{problem_no}</p>
            <a className="problem_name" href={problem_link}>{problem_name}</a>
            <p className="problem_type">{problem_type}</p>
            <p className="problem_time">{problem_time}</p>
            <p className="problem_language">{problem_language}</p>
            <p className="problem_score">{problem_score}</p>
            <p className="problem_status">{problem_status}</p>
        </div>
    )
}

export default Values;