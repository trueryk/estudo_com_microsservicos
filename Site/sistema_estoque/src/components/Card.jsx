export default function Card(props) {

    const excluir = async (id) => {
        await fetch(`http://127.0.0.1:5003/estoque/delete?id=${id}`)
        window.location.reload()
    }

    const editar = async (produto, quantidade, id) => {
        props.setNome(produto)
        props.setQtd(quantidade)
        props.setID(id)
        props.setVisible(true)
    }

    return (
        <>
            <div className='shadow-xl px-3 py-5 rounded'>
                <div className='px-4 py-5 '>
                    <h2 className='text-xl pb-5 font-bold'>{props.produto}</h2>
                    <div className='flex flex-row'> <span className='pe-2 font-bold text-cyan-900'>Status:</span>
                        <div className={props.status == "Normal" ?
                            "bg-green-400/50 w-fit px-2 rounded" :
                            props.status == "Atenção Moderada" ? "bg-amber-300/50 w-fit px-2 rounded" :
                                props.status == "Atenção" ? "bg-orange-300/50 w-fit px-2 rounded" :
                                    props.status == "Esgotando" ? "bg-red-400/50 w-fit px-2 rounded"
                                        : "bg-red-600/50 w-fit px-2 rounded"}>
                            <p className='text-center '>{props.status}</p>
                        </div>
                    </div>
                </div>
                <div className='px-4'>
                    <p className=' text-cyan-900'><span className='font-bold'>Quant:</span> {props.quantidade}</p>
                    <div className='flex flex-row gap-4 mt-4'>
                        <button onClick={() => excluir(props.id)} className="mt-2 py-1 px-2 bg-red-400/80 rounded"> Excluir </button>
                        <button onClick={() => editar(props.produto, props.quantidade, props.id)} className="mt-2 py-1 px-2 bg-orange-400/80 rounded"> Editar </button>
                    </div>
                </div>
            </div>

        </>
    )
}