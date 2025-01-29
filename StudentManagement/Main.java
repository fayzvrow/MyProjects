public class Main
{
    public static void main(String[] args)
    {
        Student students[] = new Student[2];
        int i;
        students[0] = new UndergraduateStudent(111, "Nathan");
        students[1] = new UndergraduateStudent(222, "Tobias");
		    System.out.println("\n\n\n\nUndergraduate Students:");
		
        for(i = 0; i < students.length; ++i) 
		    {
			      System.out.println("Student ID: " +
			                    students[i].getId() + ", Name: " +
			                    students[i].getLastName() + ", Tuition: " +
			                    students[i].getTuition() + " per year, " +
			                    "Student Class is: " + students[i].getClassification());
		    }
		
		    System.out.println("\n\n\nGraduate Students:");

		    Student graduateStudents[] = new Student[2];
		    graduateStudents[0] = new GraduateStudent(333, "Henry");
		    graduateStudents[1] = new GraduateStudent(444, "Jonah");
		    for (i = 0; i < graduateStudents.length; ++i)
		    {
			    System.out.println("Student ID: " + 
								graduateStudents[i].getId() + ", Name: " + 
								graduateStudents[i].getLastName() + ", Tuition: " +
								graduateStudents[i].getTuition() + " per year, " + 
								"Student Class is: " + graduateStudents[i].getClassification());
		    }
		
		    System.out.println("\n\n\nProgrammer is: Faysal Abdulkadir\n\n\n\n");
    }
}
