// import { historyField } from '@codemirror/commands';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import "../styles/CodingTextArea.css";

// const stateFields = { history: historyField };


function CodingTextArea(input_field:{input_field: String}) {

	return (
		<CodeMirror value={input_field.input_field.toString()} height='50vh'  extensions={[python()]} theme={oneDark} />
	);


}

export default CodingTextArea