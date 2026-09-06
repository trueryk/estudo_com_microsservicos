using Estoque.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Data;

public class EstoqueContext : DbContext
{
    public DbSet<EstoqueModel> Estoques { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        
        optionsBuilder.UseSqlite(connectionString: @"Data Source=..\estoque.sqLite");
        base.OnConfiguring(optionsBuilder);
    }
}