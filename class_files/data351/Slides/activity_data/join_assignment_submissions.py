from faker import Faker
import random
from datetime import timedelta

NUM_STUDENTS = 20
NUM_ASSIGNMENTS = 10
CHANCE_TO_SUBMIT = 90
CHANCE_LATE = 15
FILENAME = "join_assignment_submissions.sql"


fake = Faker()

class Student:
    def __init__(self, _id, fname, lname):
        self.id = _id
        self.first_name = fname
        self.last_name = lname

    def __str__(self):
        return str((str(self.id), self.first_name, self.last_name))

class Assignment:
    def __init__(self, _id, name, tpoints, due):
        self.id = _id
        self.name = name
        self.total_points = tpoints
        self.due_date = due

    def __str__(self):
        return str((str(self.id), self.name, self.total_points, f"{self.due_date:%Y-%m-%d}"))

class Submission:
    def __init__(self, st_id, hw_id, sub_date, points):
        self.student_id = st_id
        self.hw_id = hw_id
        self.submission_date = sub_date
        self.earned_points = points

    def __str__(self):
        return str((str(self.student_id), str(self.hw_id), f"{self.submission_date:%Y-%m-%d}", self.earned_points))

def generate_students():
    students = []
    for i in range(NUM_STUDENTS):
        # students.append((i+1, fake.first_name(), fake.last_name()))
        students.append(Student(i+1, fake.first_name(), fake.last_name()))
    return students

def generate_assignments():
    types = {"Homework": 1, "Problem Set": 1, "Exam": 1, "Project":1 }
    assignments = []
    prev_date = fake.date_this_decade()
    for i in range(NUM_ASSIGNMENTS):
        atype = random.choice(list(types.keys()))
        anum = types[atype]
        new_date = fake.date_between_dates(prev_date, prev_date + timedelta(weeks=2))
        # assignments.append((i+1, f"{atype} {anum}", random.randint(10,50), new_date))
        assignments.append(Assignment(i+1, f"{atype} {anum}", random.randint(10,50), new_date))
        types[atype] += 1
        prev_date = new_date
    return assignments

def generate_submissions(students, assignments):
    submissions = []
    for student in students:
        if student.id == 6: # Have one student at least who submitted NOTHING
            continue
        for assignment in assignments:
            if random.random() < CHANCE_TO_SUBMIT/100:
                if random.random() < CHANCE_LATE / 100:
                    sub_date = fake.date_between_dates(assignment.due_date, assignment.due_date+timedelta(weeks=1))
                else:
                    sub_date = fake.date_between_dates(assignment.due_date - timedelta(days=3), assignment.due_date)
                points = random.randint(0, assignment.total_points)
                submissions.append(Submission(student.id, assignment.id, sub_date, points))
    return submissions

def print_table(name, data, columns, types):
    print(f"CREATE TABLE {name} (") #)
    cols = [f"  {c} {t}" for c,t in zip(columns, types)]
    print(",\n".join(cols))
    print(");")

    print(f"INSERT INTO {name} VALUES")
    print(",\n".join(map(str,data)))
    print(";")



if __name__ == '__main__':
    students = generate_students()
    assignments = generate_assignments()
    submissions = generate_submissions(students, assignments)
    print("CREATE SCHEMA lec7;")
    print_table("lec7.roster", students, ["id_number", "first_name", "last_name"], ["TEXT", "TEXT", "TEXT"])
    print_table("lec7.hw_info", assignments, ["id", "name", "total_points", "due_date"], ["TEXT", "TEXT", "INT", "DATE"])
    print_table("lec7.submissions", submissions, ["student_id", "hw_id", "submission_date", "earned_points"], ["TEXT", "TEXT", "DATE", "INT"])


