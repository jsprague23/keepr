using Microsoft.AspNetCore.Mvc;
using API_Users.Repositories;
using API_Users.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API_Users.Controllers
{
  [Route("api/[controller]")]
  public class VaultKeepsController : Controller
  {
    private readonly VaultKeepsRepository _db;
    public VaultKeepsController(VaultKeepsRepository repo)
    {
      _db = repo;  
    }
    [Authorize]
    [HttpPost]
    public VaultKeeps CreateVaultKeep([FromBody]VaultKeeps newVaultKeep)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVaultKeep.UserId = user.Identity.Name;
        return _db.CreateVaultKeep(newVaultKeep);
      }
      return null;
    }
    [HttpGet("{id}")]
    public VaultKeeps GetByVaultId(int id)
    {
      return _db.GetByVaultId(id);
    }
    //get Vault by author
    [Authorize]
    [HttpGet]
    public IEnumerable<VaultKeeps> GetByUserId()
    {
      var user = HttpContext.User;
      var id = user.Identity.Name;
      return _db.GetbyUserId(id);
    }
  }
}