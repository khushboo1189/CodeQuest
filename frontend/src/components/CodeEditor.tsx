import "../styles/CodeEditor.css"
import CodingTextArea from "./CodingTextArea";

function CodeEditor({ input }: { input: String }) {
    return (
        <div className="h-full w-full max-h-full">
            <div className="code-editor flex flex-col h-full w-full max-h-full">
                <div className="action-btn flex-none flex justify-center">
                    <a className="run">Run</a>
                    <a className="submit">Submit</a>
                </div>
                <div className="boxes flex-auto flex flex-col h-full w-full gap-[75px] max-h-full">
                    <div className="coding-box flex-auto w-full h-full justify-center items-center">
                        <CodingTextArea input_field={String(input)} />
                    </div>
                    <div className="box output flex-none w-full h-full justify-center items-center bg-black text-white">
                        <div className="output-title">Output:</div>
                        <div className="output-content">
                            <div className="output-text">Output will be displayed here</div>
                            <div className="output-text">.</div>
                            <div className="output-text">.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeEditor;
