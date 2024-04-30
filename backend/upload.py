import json
import pyrebase

class problem:
    def __init__(self, name, type, time, language, score, status):
        self.name = name
        self.type = type
        self.time = time
        self.language = language
        self.score = score
        self.status = status
        
    def prints(self):
        """ Print the problem details """
        print("Name: " + self.name + "\nType: " + self.type + "\nTime: " + self.time + "\nLanguage: " + self.language + "\nScore: " + self.score + "\nStatus: " + self.status + "\n")
    
    def clean(self):
        """ Clean the problem details """
        if self.name in ["", None]:
            return "Problem name is empty", self
        else: 
            self.name = self.name.title()
        if self.type in ["", None]:
            return "Problem type is empty", self
        if self.time in ["", None]:
            return "Problem time is empty", self
        if self.language in ["", None]:
            self.language = "Any"
        if self.score in ["", None]:
            self.score = "0"
        if self.status in ["", None]:
            self.status = "Not Attempted"
        print("Cleaned Successfully\n")
        return self
    
    def check_last_num(self):
        db_val = db.child("problems").get().val()
        if db_val:
            problems = [int(no[3:]) for no in db_val.keys()]
            next_num = max(problems) + 1
            return str(next_num)
        else:
            return "1"
        
    def to_dict(self):
        """ Convert the problem details to dictionary """
        return {
            "name": self.name,
            "type": self.type,
            "time": self.time,
            "language": self.language,
            "score": self.score,
            "status": self.status
        }
    
    def upload(self):
        """ Upload the problem details to firebase """
        temp_no = self.check_last_num()
        db.child("problems").child("pb-" + temp_no).set(self.to_dict())
        print("Uploaded Successfully\n")
        
if __name__ == "__main__":
    with open('creds.json') as f:
        config = json.load(f)

    firebase = pyrebase.initialize_app(config)
    db = firebase.database()
    db.child("problems").set({})

    data = json.load(open('./input/data copy.json'))
    for problems in data:
        pb = problem(data[problems]["name"], data[problems]["type"], data[problems]["time"], data[problems]["language"], data[problems]["score"], data[problems]["status"])
        pb.clean()
        pb.prints()
        pb.upload()