namespace Estoque.Models;

public class EstoqueModel
{

    public EstoqueModel(string nome, int qtd)
    {
        Id = Guid.NewGuid();
        Nome = nome;
        Qtd = qtd;
    }
    public Guid Id { get; init; }
    public string Nome { get; private set; }
    public int Qtd { get; private set; }

    public void MudarNome(string nome)
    {
        Nome = nome;
    }

    public void MudarQtd(int qtd)
    {
        Qtd = qtd;
    }

}