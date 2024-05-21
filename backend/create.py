import json
import pyrebase
import datetime

def menu():
    print("Select an operation:")
    print("1. Upload a single problem")
    print("2. Upload all problems from the data.json file")
    print("3. Upload series of problems")
    print("4. Exit")
    choice = int(input("Enter your choice: "))
    if choice == 1:
        id = input("Enter the problem ID: ")
        short_name = input("Enter the problem short name: ")
        type = input("Enter the problem type: ")
        difficulty = input("Enter the problem difficulty: ")
        time = input("Enter the problem time: ")
        language = input("Enter the problem language: ")
        score = input("Enter the problem score: ")
        status = input("Enter the problem status: ")
        description = input("Enter the problem description: ")
        input_format = input("Enter the problem input format: ")
        output_format = input("Enter the problem output format: ")
        output = input("Enter the problem output: ")
        pb_input = input("Enter the problem input: ")
        pb = Problem(id, short_name, type, difficulty, time, language, score, status, description, input_format, output_format, output, pb_input)
        pb.clean()
        pb.prints()
        pb.upload()
    elif choice == 2:
        pb = Problem()
        pb.upload_all()
    elif choice == 3:
        print("Enter the series of problems:")
        series = int(input("Enter the number of problems: "))
        for i in range(series):
            id = input("Enter the problem ID: ")
            short_name = input("Enter the problem short name: ")
            type = input("Enter the problem type: ")
            difficulty = input("Enter the problem difficulty: ")
            time = input("Enter the problem time: ")
            language = input("Enter the problem language: ")
            score = input("Enter the problem score: ")
            status = input("Enter the problem status: ")
            description = input("Enter the problem description: ")
            input_format = input("Enter the problem input format: ")
            output_format = input("Enter the problem output format: ")
            output = input("Enter the problem output: ")
            pb_input = input("Enter the problem input: ")
            pb = Problem(id, short_name, type, difficulty, time, language, score, status, description, input_format, output_format, output, pb_input)
            pb.clean()
            pb.prints()
            pb.upload()
    elif choice == 4:
        print("Exiting...")
    else:
        print("Invalid choice\n\n")
        menu()

class Problem:
    def __init__(self, id = None, short_name = None, type = None, difficulty = None, time = None, language = None, score = None, status = None, description = None, input_format = None, output_format = None, output = None, pb_input = None):
        self.id = id
        self.short_name = short_name
        self.type = type
        self.difficulty = difficulty
        self.time = time
        self.language = language
        self.score = score
        self.status = status
        self.description = description
        self.input_format = input_format
        self.output_format = output_format
        self.output = output
        self.pb_input = pb_input
        self.created_on = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.db = self.init_db()
    
    def prints(self):
        """ Print the problem details """
        print(f"ID: {self.id}\n"
        f"Short Name: {self.short_name}\n"
        f"Type: {self.type}\n"
        f"Difficulty: {self.difficulty}\n"
        f"Time: {self.time}\n"
        f"Language: {self.language}\n"
        f"Score: {self.score}\n"
        f"Status: {self.status}\n"
        f"Description: {self.description}\n"
        f"Input Format: {self.input_format}\n"
        f"Output Format: {self.output_format}\n"
        f"Output: {self.output}\n"
        f"Input: {self.pb_input}\n"
        f"Created On: {self.created_on}\n")
        
    def clean(self):
        """ Clean the problem details """
        if self.id in ["", None]:
            return "Problem ID is empty", self
        if self.short_name in ["", None]:
            return "Problem short name is empty", self
        else: 
            self.short_name = self.short_name.title()
        if self.type in ["", None]:
            return "Problem type is empty", self
        if self.difficulty in ["", None]:
            return "Problem difficulty is empty", self
        if self.time in ["", None]:
            self.time = "NaN"
        if self.language in ["", None]:
            self.language = "Any"
        if self.score in ["", None]:
            self.score = "0"
        if self.status in ["", None]:
            self.status = "Not Attempted"
        if self.description in ["", None]:
            return "Problem description is empty", self
        if self.input_format in ["", None]:
            return "Problem input format is empty", self
        if self.output_format in ["", None]:
            return "Problem output format is empty", self
        if self.output in ["", None]:
            return "Problem output is empty", self
        if self.pb_input in ["", None]:
            return "Problem input is empty", self
        return self
    
    def check_last_num(self):
        db_val = self.db.child('problems').get().val()  # Retrieve the database value using the get() method
        print("db_val:", db_val)  # Print the value of db_val for debugging
        if db_val is None:
            return "1"
        
        problems = [int(no[3:]) for no in db_val.keys()]
        print("problems:", problems)  # Print the value of problems for debugging
        next_num = max(problems) + 1
        print("next_num:", next_num)  # Print the value of next_num for debugging
        return str(next_num)
        
    def init_db(self):
        with open("creds.json") as f:
            config = json.load(f)
        db = pyrebase.initialize_app(config).database()
        self.db = db
        return db
    
    def to_dict(self):
        """ Convert the problem details to dictionary """
        return {
            "id": self.id,
            "short_name": self.short_name,
            "type": self.type,
            "difficulty": self.difficulty,
            "time": self.time,
            "language": self.language,
            "score": self.score,
            "status": self.status,
            "description": self.description,
            "input_format": self.input_format,
            "output_format": self.output_format,
            "output": self.output,
            "input": self.pb_input
        }
        
    def upload(self):
        """ Upload the problem details to firebase """
        temp_no = self.check_last_num()
        print("Uploading Problem " + temp_no + "...")
        self.db.child("problems").child("pb-" + temp_no).set(self.to_dict())
        print("Uploaded Successfully\n")
        
    def upload_all(self):
        """ Upload all the problems to firebase """
        data = json.load(open('./input/data.json'))
        for problems in data:
            pb = Problem(data[problems]["id"], data[problems]["short_name"], data[problems]["type"], data[problems]["difficulty"], data[problems]["time"], data[problems]["language"], data[problems]["score"], data[problems]["status"], data[problems]["description"], data[problems]["input_format"], data[problems]["output_format"], data[problems]["output"], data[problems]["input"])
            pb.clean()
            pb.prints()
            pb.upload()
            
if __name__ == "__main__":
    menu()