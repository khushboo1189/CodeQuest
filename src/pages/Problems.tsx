import { useEffect } from "react";
import '../styles/Problems.css';

function Problems() {
  let questions : number = 10;

  useEffect(() => {
    document.title = 'CodeQuest | Problems';
  }, []);

  return (
    <div className="w-full h-auto">
      <div className="card-holder h-full flex">
        <div className="card flex-1 ">
          <p>Total Number of Questions: {questions}</p>
          <p className="text-[red]">Hard:
            <span className="text-black ml-1">{questions}</span>
          </p>
          <p className="text-[orange]">Medium:
            <span className="text-black ml-1">{questions}</span>
          </p>
          <p className="text-[green]">Easy:
            <span className="text-black ml-1">{questions}</span>
          </p>
        </div>
        <div className="card flex-1">
          <p className="">Total Number of Attempted: {questions}</p>
        </div>
        <div className="card flex-1">HI</div>
      </div>
    </div>
  )
}

export default Problems;