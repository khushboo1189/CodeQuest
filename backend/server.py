import json
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess
import tempfile
import os
import autopep8
import pyrebase 

app = Flask(__name__)
CORS(app, origins="*")

@app.route('/compile', methods=['POST'])
def compile_code():
    try:
        code = request.json["code"]
        if not code["code"] or code["code"].isspace() or code["code"] == "":
            return jsonify({'error': 'No code provided'}), 400
        
        forbidden_patterns = [
            "input(", "input (", "open(", "open (", "os.", "subprocess.", "import ", "from ", 
            "eval(", "eval (", "exec(", "exec (", "execfile(", "execfile (", 
            "compile(", "compile (", "os.system(", "os.system (", "os.popen(", "os.popen (",
            "shutil.", "sys.exit(", "sys.exit ("
        ]
        
        for pattern in forbidden_patterns:
            if pattern in code["code"]:
                return jsonify({'error': 'Forbidden pattern detected'}), 400
        
        formatted_code = autopep8.fix_code(code["code"])

        # Create a temporary file to save the Python code
        with tempfile.NamedTemporaryFile(suffix=".py", delete=False) as temp_file:
            temp_file.write(formatted_code.encode('utf-8'))
            temp_file_name = temp_file.name

        # Run the code using subprocess and capture the output
        try:
            result = subprocess.run(
                ['python', temp_file_name],
                capture_output=True,
                text=True,
                timeout=10  # Add a timeout to prevent long-running code
            )
            output = result.stdout
            error = result.stderr.replace(f'File "{temp_file_name}"', 'main.py')
        except subprocess.TimeoutExpired:
            return jsonify({'error': 'Code execution timed out'}), 408
        except Exception as e:
            return jsonify({'error': str(e)}), 400
        finally:
            # Clean up the temporary file
            os.remove(temp_file_name)

        return jsonify({
            'output': output,
            'error': error
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/submit', methods=['POST'])
def submit():
    # Get the code from the request and check it with existing code in firebase database
    problem_no = request.json["submit_info"]["problem_no"]
    user_uid = request.json["submit_info"]["user_uid"]
    code = request.json["submit_info"]["code"]

    # Initialize Firebase
    firebase = pyrebase.initialize_app(json.load(open("creds.json")))
    db = firebase.database()
    
    # Get the existing code from the database
    db.child("users").child(user_uid).child("problems_list").child(problem_no).child("status").set("Submitted!")
    value = db.child("problems").child("pb-"+problem_no).get().val()
    db.child("users").child(user_uid).child("problems").child(problem_no).set(value)
    db.child("users").child(user_uid).child("problems").child(problem_no).child("input").set(code)

    return jsonify({'message': 'Code submitted successfully!'})

# Example usage
# code = {'code': "for i in range(5):    for j in range(5):        print(i, j)"}
# formatted_code = {'code': autopep8.fix_code(code["code"])}
# check = compile_code(formatted_code)
# print(check)

if __name__ == '__main__':
    app.run(debug=True)
