const fs = require("fs");
let students = [];
exports.prep = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./students.json", (err, data) => {
      if (err) {
        reject("unable to read file.");
      }
      students = JSON.parse(data);
      resolve("File read success.");
    });
  });
};

exports.cpa = () => {
  return new Promise((resolve, reject) => {
    let results = students.filter((student) => student.program == "CPA");
    results.length == 0 ? reject("No CPA students.") : resolve(results);
  });
};
exports.highGPA = () => {
  return new Promise((resolve, reject) => {
    let max = Math.max(...students.map((o) => o.gpa));
    let highStudent = students.find((student) => student.gpa == max);
    highStudent
      ? resolve(highStudent)
      : reject("Failed finding student with highest GPA");
  });
};

exports.allStudents = () => {
  return new Promise((resolve, reject) => {
    students.length == 0 ? reject("No students.") : resolve(students);
  });
};

exports.addStudent = (student) => {
  return new Promise((resolve, reject) => {
    students.push(student);
    fs.writeFile("./students.json", JSON.stringify(students), (err) => {
      if (err) {
        reject("Unable to write to file.");
      }
    });
    resolve("Student added.");
  });
};

exports.getSudent = (studId) => {
  return new Promise((resolve, reject) => {
    let student = students.find((student) => student.studId == studId);
    student ? resolve(student) : reject("Student not found.");
  });
};
