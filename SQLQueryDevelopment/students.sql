CREATE TABLE Students (
    StudentID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    Age INT
);

CREATE TABLE Courses (
    CourseID INT PRIMARY KEY,
    CourseName VARCHAR(100),
    Credits INT
);

CREATE TABLE Enrollments (
    EnrollmentID INT PRIMARY KEY,
    StudentID INT,
    CourseID INT,
    Grade CHAR(1),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID),
    FOREIGN KEY (CourseID) REFERENCES Courses(CourseID)
);

INSERT INTO Students (StudentID, FirstName, LastName, Age)
VALUES
(1, 'Nathan', 'Brown', 20),
(2, 'Jane', 'Smith', 22),
(3, 'Kristan', 'Jacobs', 19),
(4, 'Miles', 'Parker', 21);

INSERT INTO Courses (CourseID, CourseName, Credits)
VALUES
(101, 'Math 101', 3),
(102, 'Chemistry 101', 4),
(103, 'Biology 101', 3),
(104, 'History 101', 3);

INSERT INTO Enrollments (EnrollmentID, StudentID, CourseID, Grade)
VALUES
(1, 1, 101, 'A'),
(2, 2, 102, 'B'),
(3, 3, 103, 'A'),
(4, 1, 104, 'C'),
(5, 4, 101, 'B'),
(6, 2, 103, 'A');


SELECT 
    Students.FirstName AS StudentFirstName,
    Students.LastName AS StudentLastName,
    Courses.CourseName,
    Enrollments.Grade
FROM 
    Students
JOIN 
    Enrollments ON Students.StudentID = Enrollments.StudentID
JOIN 
    Courses ON Enrollments.CourseID = Courses.CourseID;

SELECT 
    Courses.CourseName,
    COUNT(Enrollments.StudentID) AS NumberOfStudents
FROM 
    Courses
JOIN 
    Enrollments ON Courses.CourseID = Enrollments.CourseID
GROUP BY 
    Courses.CourseName;


SELECT 
    Students.FirstName,
    Students.LastName,
    Courses.CourseName
FROM 
    Students
JOIN 
    Enrollments ON Students.StudentID = Enrollments.StudentID
JOIN 
    Courses ON Enrollments.CourseID = Courses.CourseID
WHERE 
    Enrollments.Grade = 'A';
