public abstract class Student
{
    private int ID;
    private String lastName;
    protected double tuition;
	  protected String classification;
	
    public Student(int pID, String pName)
    {
        this.ID = pID;
        this.lastName = pName;
    }
    public void setId(int idNum)
    {
        this.ID = idNum;
    }
    public void setLastName(String pName)
    {
        this.lastName = pName;
    }
    public int getId()
    {
        return this.ID;
    }
    public String getLastName()
    {
        return this.lastName;
    }
    public double getTuition()
    {
        return this.tuition;
    }
    public String getClassification()
    {
        return this.classification;
    }
  public abstract void setTuition();
	public abstract void setClassification();
}
