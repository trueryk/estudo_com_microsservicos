import { useEffect, useState } from "react"
import Card from "../components/Card"

export default function Home() {
    const [produtos, setProdutos] = useState([])
    const [nome, setNome] = useState('')
    const [qtd, setQtd] = useState('')
    const [idEditando, setID] = useState('')
    const [editVisible, setVisible] = useState(false)

    useEffect(() => {
        load('Todos')
    }, [])

    const load = async (filtro) => {
        const response = fetch(`http://127.0.0.1:5000/estoque/get?filtro=${filtro}`)
            .then(response => response.json())
            .then(data => setProdutos(data))
    }

    const editar = async (id, produto, quant) => {
        await fetch(`http://127.0.0.1:5002//estoque/put?id=${id}&nome=${produto}&quant=${quant}`)
        load('Todos')
    }

    const adicionar = async (produto, quant) => {
        await fetch(`http://127.0.0.1:5001//estoque/post?nome=${produto}&quant=${quant}`)
        load('Todos')
        setNome('')
        setQtd('')
    }

    return (
        <>
            <span className="ms-6 mt-2"> Filtro de status: </span>
            <button className="ms-4 mt-2 border-1 px-1 py-1 " onClick={() => load('Todos')}>Todos</button>
            <button className="ms-4 mt-2 border-1 px-1 py-1 bg-green-400/50" onClick={() => load('Normal')}>Normal</button>
            <button className="ms-4 mt-2 border-1 px-1 py-1 bg-amber-300/50" onClick={() => load('Atenção Moderada')}>Atenção Moderada</button>
            <button className="ms-4 mt-2 border-1 px-1 py-1 bg-orange-300/50" onClick={() => load('Atenção')}>Atenção</button>
            <button className="ms-4 mt-2 border-1 px-1 py-1 bg-red-400/50" onClick={() => load('Esgotando')}>Esgotando</button>
            <button className="ms-4 mt-2 border-1 px-1 py-1 bg-red-600/50" onClick={() => load('Esgotado')}>Esgotado</button>
            <div className='grid grid-cols-3 gap-4'>
                <div className='px-5 pt-5 grid grid-cols-3 col-span-2 gap-4'>
                    {produtos.length == 0 ? "Sem produtos cadastrados" : produtos.map((p) =>
                        <>
                            <Card
                                produto={p.produto}
                                status={p.status}
                                quantidade={p.quantidade}
                                id={p.id}

                                nome={nome}
                                setNome={setNome}
                                qtd={qtd}
                                setQtd={setQtd}
                                idEditando={idEditando}
                                setID={setID}
                                setVisible={setVisible}

                            />
                        </>
                    )}
                </div>
                <div className="px-5 pt-5 col-span-1">
                    <h2 className="text-xl mb-4">Formulário:</h2>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="nome">Nome do produto:</label>
                        <input className="border-1 border-solid mt-3 px-2 rounded" type="text" name="nome" id="nome" onChange={(e) => setNome(e.target.value)} value={nome} />
                    </div>
                    <div className="flex flex-col mt-5">
                        <label htmlFor="qtd">Quantidade:</label>
                        <input className="border-1 border-solid mt-3 px-2 rounded" type="number" name="qtd" id="qtd" onChange={(e) => setQtd(e.target.value)} value={qtd} />
                    </div>
                    {editVisible ?
                        <>
                            <button className="me-5 mt-4 px-2 py-1 bg-orange-300 rounded" onClick={() => editar(idEditando, nome, qtd)}>Editar</button>
                            <button className="mt-4 px-2 py-1 bg-red-300 rounded" onClick={() => {
                                setVisible(false)
                                setNome('')
                                setQtd('')
                            }}>Cancelar</button>
                        </> :
                        <button className="mt-4 px-2 py-1 bg-green-300 rounded" onClick={() => adicionar(nome, qtd)}>Adicionar</button>
                    }

                </div>

            </div >
        </>
    )
}