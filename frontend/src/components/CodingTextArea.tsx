// import { historyField } from '@codemirror/commands';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import "../styles/CodingTextArea.css";

// const stateFields = { history: historyField };


function CodingTextArea() {

	return (
		<CodeMirror value={python.toString()} height='50vh'  extensions={[python()]} />
	);


}

export default CodingTextArea