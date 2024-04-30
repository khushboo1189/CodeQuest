import "../styles/CodeEditor.css"
import CodingTextArea from "./CodingTextArea";

function CodeEditor() {
    return (
        <div className="h-full w-full max-h-full">
            <div className="code-editor flex flex-col h-full w-full max-h-full">
                <div className="action-btn flex-none flex justify-center">
                    <a className="run">Run</a>
                    <a className="submit">Submit</a>
                </div>
                <div className="boxes flex-auto flex flex-col h-full w-full gap-14 max-h-[calc(100vh-130px)]">
                    <div className="coding-box flex-auto w-full h-full">
                        <CodingTextArea />
                    </div>
                    <div className="box output flex-1 w-full h-full">
                        hey
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeEditor;
