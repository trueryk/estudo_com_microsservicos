using Estoque.Data;
using Estoque.Models;
using Microsoft.EntityFrameworkCore;

namespace Estoque.Routes;

public static class EstoqueRoute
{
    public static void EstoqueRoutes(this WebApplication app)
    {

        app.MapPut(pattern: "/estoque/{id:guid}", async (Guid id, EstoqueRequest req, EstoqueContext context) =>
        {
            var produto = await context.Estoques.FindAsync(id);
            if (produto == null) return Results.NotFound();

            produto.MudarNome(req.Nome);
            produto.MudarQtd(req.Qtd);
            await context.SaveChangesAsync();
            return Results.Ok(produto);
        });

    }
}