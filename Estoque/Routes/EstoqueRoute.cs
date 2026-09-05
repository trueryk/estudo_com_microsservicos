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

        app.MapGet(pattern: "/estoque", async (EstoqueContext context) =>
        {
            var produtos = await context.Estoques.ToListAsync();
            return Results.Ok(produtos);
        });

        app.MapPut(pattern: "/estoque/{id:guid}", async (Guid id, EstoqueRequest req, EstoqueContext context) =>
        {
            var produto = await context.Estoques.FindAsync(id);
            if (produto == null) return Results.NotFound();

            produto.MudarNome(req.Nome);
            produto.MudarQtd(req.Qtd);
            await context.SaveChangesAsync();
            return Results.Ok(produto);
        });

        app.MapDelete(pattern: "/estoque/{id:guid}", async (Guid id, EstoqueContext context) =>
        {
            var produto = await context.Estoques.FindAsync(id);
            if (produto == null) return Results.NotFound();
            context.Remove(produto);
            await context.SaveChangesAsync();
            return Results.Ok();
           
        });
    }
}