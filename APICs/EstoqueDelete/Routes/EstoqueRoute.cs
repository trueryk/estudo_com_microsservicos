using Estoque.Data;

namespace Estoque.Routes;

public static class EstoqueRoute
{
    public static void EstoqueRoutes(this WebApplication app)
    {
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