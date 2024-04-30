import CodeEditor from "../components/CodeEditor";

function CodePlatform() {
    return (
        <div className="h-full w-full flex">
            <div className="flex-1 h-full w-full"></div>
            <div className="flex-1 h-full w-full">
                <CodeEditor />
            </div>
        </div>
    )
}

export default CodePlatform;