using System;
using System.Collections.Generic;
using System.Data;
using API_Users.Models;
using Dapper;

namespace API_Users.Repositories
{
  public class VaultKeepsRepository : DbContext
  {
    public VaultKeepsRepository(IDbConnection db) : base(db)
    {

    }
    // Create Vaultkeep
    public VaultKeeps CreateVaultKeep(VaultKeeps newVaultKeep)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO vaultKeeps (userId, vaultId, keepId)
                VALUES (@KeepId, @VaultId, @UserId);
                SELECT LAST_INSERT_ID();
            ", newVaultKeep);
      newVaultKeep.Id = id;
      return newVaultKeep;
    }

    // GetbyUser
    public IEnumerable<VaultKeeps> GetbyUserId(int id)
    {
      return _db.Query<VaultKeeps>("SELECT * FROM vaultKeeps WHERE userId = @id;", new { id });
    }
    // GetbyId
    public Vault GetbyVaultKeepId(int id)
    {
      return _db.QueryFirstOrDefault<Vault>("SELECT * FROM vaultKeeps WHERE id = @id;", new { id });
    }

    // Delete
    public bool DeleteVaultKeep(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM vaultKeeps
      WHERE id = @id
      LIMIT 1;
      ", new { id });
      if (i > 0)
      {
        return true;
      }
      return false;
    }
  }





}