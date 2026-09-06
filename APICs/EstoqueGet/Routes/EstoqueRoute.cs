using Estoque.Data;
using Estoque.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Routes;

public static class EstoqueRoute
{
    public static void EstoqueRoutes(this WebApplication app)
    {
        app.MapGet(pattern: "/estoque", async (EstoqueContext context) =>
        {
            var produtos = await context.Estoques.ToListAsync();
            return Results.Ok(produtos);
        });
    }
}