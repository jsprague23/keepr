using System.Collections.Generic;

namespace API_Users.Models{

public class Keep
{
public int Id { get; set; }
public string Name { get; set; }
public string Description {get; set;}
public string Body { get; set; }
public string UserId { get; set; }
public string VaultId {get; set; }
public int Views {get; set;}
public int KeepCount {get; set;}
// public List<Tag> Tags {get; set;}
}



}