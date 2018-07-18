using Microsoft.AspNetCore.Mvc;
using API_Users.Repositories;
using API_Users.Models;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace API_Users.Controllers
{
  [Route("api/[controller]")]
  public class VaultController : Controller
  {
    private readonly VaultRepository _db;
    public VaultController(VaultRepository repo)
    {
      _db = repo;  
    }
    [Authorize]
    [HttpPost]
    public Vault CreateVault([FromBody]Vault newVault)
    {
      if(ModelState.IsValid)
      {
        var user = HttpContext.User;
        newVault.UserId = user.Identity.Name;
        return _db.CreateVault(newVault);
      }
      return null;
    }
    //get all Vaults
    // [HttpGet]
    // public IEnumerable<Vault> GetAll()
    // {
    //   return _db.GetAll();
    // }
    //get Vault by id
    [HttpGet("{id}")]
    public Vault GetById(int id)
    {
      return _db.GetbyVaultId(id);
    }
    //get Vault by author
    [HttpGet]
    [Authorize]
    public IEnumerable<Vault> GetByUserId()
    {
      var user = HttpContext.User;
      var id = user.Identity.Name;
      return _db.GetbyUserId(id);
    }
    //edit Vault
    [Authorize]
    [HttpPut("{id}")]
    public Vault EditVault(int id, [FromBody]Vault newVault)
    {
      return _db.EditVault(id, newVault);
    }
    [Authorize]
     [HttpDelete("{id}")]
        public void DeleteVault(int id)
        {
        }
  }
}