public class UndergraduateStudent extends Student
{
    public static final double UNDERGRAD_TUITION = 4000;
    public static final String UND_CLASSIFY = "Undergraduate";
    public UndergraduateStudent(int pID, String pName)
    {
	super(pID, pName);
        setTuition();
        setClassification();
    }
    public void setTuition()
    {
        tuition = UNDERGRAD_TUITION;
    }
    public void setClassification()
    {
        classification = UND_CLASSIFY;
    }
}
