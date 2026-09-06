using Estoque.Data;
using Estoque.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Routes;

public static class EstoqueRoute
{
    public static void EstoqueRoutes(this WebApplication app)
    {
        app.MapPost(pattern: "/estoque", async (EstoqueRequest req, EstoqueContext context) =>
        {
            var produto = new EstoqueModel(req.Nome, req.Qtd);
            await context.AddAsync(produto);
            await context.SaveChangesAsync();
        });

    }
}