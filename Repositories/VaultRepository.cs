using System;
using System.Collections.Generic;
using System.Data;
using API_Users.Models;
using Dapper;

namespace API_Users.Repositories
{
  public class VaultRepository : DbContext
  {
    public VaultRepository(IDbConnection db) : base(db)
    {

    }
    // Create Vault
    public Vault CreateVault(Vault newVault)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaults (name, description, userId )
                VALUES (@Name, @Description, @UserId);
                SELECT LAST_INSERT_ID();
            ", newVault);
      newVault.Id = id;
      return newVault;
    }
    // GetAll Vault
    // public IEnumerable<Vault> GetAll()
    // {
    //   return _db.Query<Vault>("SELECT * FROM vaults;");
    // }
    // GetbyUser
    public IEnumerable<Vault> GetbyUserId(string id)
    {
      return _db.Query<Vault>("SELECT * FROM vaults WHERE userId = @id;", new { id });
    }
    // GetbyId
    public Vault GetbyVaultId(int id)
    {
      return _db.QueryFirstOrDefault<Vault>("SELECT * FROM vaults WHERE id = @id;", new { id });
    }
    // Edit
    public Vault EditVault(int id, Vault vault)
    {
      vault.Id = id;
      var i = _db.Execute(@"
                UPDATE vaults SET
                    name = @Name,
                    description = @Description
                    WHERE id = @Id
            ", vault);
      if (i > 0)
      {
        return vault;
      }
      return null;
    }
    // Delete
    public bool DeleteVault(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM vaults
      WHERE id = @id
      LIMIT 1;
      ", new { id });
      if (i > 0)
      {
        return true;
      }
      return false;
    }

    // Add get user favs to user
  }





}