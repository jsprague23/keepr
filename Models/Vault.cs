using System.Collections.Generic;

namespace API_Users.Models{

public class Vault
{
public int Id { get; set; }
public string Title { get; set; }
public string Description {get; set;}
public string Body { get; set; }
public string AuthorId { get; set; }
// public List<Tag> Tags {get; set;}
}



}