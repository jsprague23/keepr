using System.Collections.Generic;
using System.Data;
using API_Users.Models;
using Dapper;

namespace API_Users.Repositories
{
  public class KeepRepository : DbContext
  {
    public KeepRepository(IDbConnection db) : base(db)
    {

    }
    // Create Keep
    public Keep CreateKeep(Keep newKeep)
    {
      int id = _db.ExecuteScalar<int>(@"
                INSERT INTO keeps (name, body, description, views, keepCount, vaultId, userId)
                VALUES (@Name, @Body, @Description, @Views, @KeepCount, @VaultId, @UserId);
                SELECT LAST_INSERT_ID();
            ", newKeep);
      newKeep.Id = id;
      return newKeep;
    }
    // GetAll Keep
    public IEnumerable<Keep> GetAll()
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE publicKeep = true;");
    }
    // GetbyUser
    public IEnumerable<Keep> GetbyUserId(int id)
    {
      return _db.Query<Keep>("SELECT * FROM keeps WHERE userId = @id;", new { id });
    }
    // GetbyId
    public Keep GetbyKeepId(int id)
    {
      return _db.QueryFirstOrDefault<Keep>("SELECT * FROM keeps WHERE id = @id;", new { id });
    }
    // Edit
    public Keep EditKeep(int id, Keep keep)
    {
      keep.Id = id;
      var i = _db.Execute(@"
                UPDATE keeps SET
                    name = @Name,
                    body = @Body,
                    description = @Description
                    WHERE id = @Id
            ", keep);
      if (i > 0)
      {
        return keep;
      }
      return null;
    }
    // Delete
    public bool DeleteKeep(int id)
    {
      var i = _db.Execute(@"
      DELETE FROM keeps
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