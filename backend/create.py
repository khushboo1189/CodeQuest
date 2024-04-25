import json
import pyrebase

class Problem:
    def __init__(self, id, short_name, type, difficulty, time, language, score, status, description, input_format, output_format, output, input):
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
        self.input = input
        self.db = self.init_db()
    
    def prints(self):
        """ Print the problem details """
        print("ID: " + self.id + "\nShort Name: " + self.short_name + "\nType: " + self.type + "\nDifficulty: " + self.difficulty + "\nTime: " + self.time + "\nLanguage: " + self.language + "\nScore: " + self.score + "\nStatus: " + self.status + "\nDescription: " + self.description + "\nInput Format: " + self.input_format + "\nOutput Format: " + self.output_format + "\nOutput: " + self.output + "\nInput: " + self.input + "\n")
        
    def clean(self):
        """ Clean the problem details """
        if self.id in ["", None]:
            return "Problem ID is empty", self
        else: 
            self.id = self.id.title()
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
        if self.input in ["", None]:
            return "Problem input is empty", self
        return self
    
    def check_last_num(self):
        db_val = self.db.child("problems").get().val()
        if db_val:
            problems = [int(no[3:]) for no in db_val.keys()]
            next_num = max(problems) + 1
            return str(next_num)
        else:
            return "1"
        
    def init_db(self):
        with open("backend/config.json") as f:
            config = json.load(f)
        db = pyrebase.initialize_app(config).database()
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
            "input": self.input
        }
        
    def upload(self):
        """ Upload the problem details to firebase """
        temp_no = self.check_last_num()
        self.db.child("problems").child("pb-" + temp_no).set(self.to_dict())
        print("Uploaded Successfully\n")
        
    def upload_all(self):
        """ Upload all the problems to firebase """
        self.db.child("problems").set({})
        data = json.load(open('./input/data.json'))
        for problems in data:
            pb = Problem(data[problems]["id"], data[problems]["short_name"], data[problems]["type"], data[problems]["difficulty"], data[problems]["time"], data[problems]["language"], data[problems]["score"], data[problems]["status"], data[problems]["description"], data[problems]["input_format"], data[problems]["output_format"], data[problems]["output"], data[problems]["input"])
            pb.clean()
            pb.prints()
            pb.upload()