import "../styles/CodeEditor.css"
import "../styles/CodingTextArea.css";
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import axios from 'axios';
import { useEffect, useState } from "react";
import FirebaseInit from "../firebase/FirebaseInit";

function CodeEditor({ problem, problem_no, output, input_call }: { problem: Object | any, problem_no: String, output: String, input_call: String}) {

    const [Input, setInput] = useState("");
    const [terminalOutput, setTerminalOutput] = useState("Output will be displayed here\n.\n.\n.");
    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        const fetchInput = async () => {
            let value = await FirebaseInit.getUserSubmittedCode(problem.id) 
            if (!value) { 
                value = problem.hasOwnProperty("input_format") ? problem["input_format"] : "def main():\n\treturn 'Hello, World!')" || "";
            }
            setInput(value);
        }
        fetchInput();
    }, [problem]);

    const runProgram = () => {
        setTerminalOutput("Running program...");

        setTimeout(() => {
            axios.post('https://codde-quest-backend.vercel.app/compile', {
                code: {
                    code: Input.toString(),
                    call: input_call
                }
            }).then((response) => {
                FirebaseInit.updateUserAttempts(problem_no);
                if (response.data.error) {
                    setTerminalOutput(response.data.error)
                } else {
                    const match = response.data.output.replace("\n", "") === output;
                    setTerminalOutput(response.data.output + (match ? "\n(!) Matches expected output (!)" : "\n(!) Does not match expected output (!)\nExpected output: " + output ));
                    if (match) {
                        alert("Correct answer! You can now submit the program.");
                        setCanSubmit(true);
                    }
                }
            }).catch((error) => {
                if (error.response) {
                    setTerminalOutput(error.response.data.error)
                } else {
                    setTerminalOutput("An error occurred")
                }
            });
        }, 1000);
    }

    const submitProgram = () => {
        if (canSubmit) {
            setTerminalOutput("Submitting program...");

            const user_uid = FirebaseInit.auth.currentUser?.uid.toString() || "null";

            axios.post('https://codde-quest-backend.vercel.app/submit', {
                submit_info: {
                    problem_no: problem_no,
                    user_uid: user_uid,
                    code: Input.toString()
                }
            }).then((response) => {
                if (response.data.error) {
                    setTerminalOutput(response.data.error)
                } else {
                    alert("Submitted successfully!");
                    window.location.href = "/problem";
                }
            }).catch((error) => {
                if (error.response) {
                    setTerminalOutput(error.response.data.error)
                } else {
                    setTerminalOutput("An error occurred")
                }
            });
        } else {
            setTerminalOutput("You need to run the program before submitting!")
        }
    }

    return (
        <div className="h-full w-full flex">
            <div className="code-editor flex flex-col h-full w-full">
                <div className="action-btn flex-none flex justify-center">
                    <button className="run" onClick={runProgram}>Run</button>
                    <button className="submit" onClick={submitProgram}>Submit</button>
                </div>
                <CodeMirror value={Input} height='45vh' extensions={[python()]} theme={oneDark} onChange={(e) => setInput(e)} />
                <div className="box output w-full h-full justify-center items-center bg-black text-white mt-5">
                    <div className="output-title">Output:</div>
                    <div className="output-content">
                        <div className="output-text">{terminalOutput.split('\n').map((line, index) => <p key={index}>{line}</p>)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeEditor;
