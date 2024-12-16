
export default function CreateTask({ close, id }: { close: () => void, id: number }) {

    async function create(task: any) {
        await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            body: JSON.stringify(
                {
                    "titulo": task.titulo,
                    "descricao": task.desc,
                    "status": task.status,
                    "user": {
                        "id": id
                    }
                }
            ),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => data.json())
            .then((data) => {
                if (data.id){
                    alert('Tarefa criada!')
                    location.reload()
                }
            })
            .catch(err => console.log(err))
    }


    return (
        <div className='w-screen h-screen fixed z-10 top-0 right-0'>
            <div className="w-screen h-screen bg-black fixed top-0 right-0 bg-opacity-20" onClick={close}></div>
            <form onSubmit={(e) => {
                e.preventDefault()
                const titulo = document.getElementById('titulo') as HTMLInputElement
                const desc = document.getElementById('desc') as HTMLInputElement
                const status = document.getElementById('status') as HTMLInputElement

                create({ titulo: titulo.value, desc: desc.value, status: status.value })
            }}
                style={{ width: '-webkit-fill-available' }}
                className="flex rounded-md flex-col absolute px-4 pb-3 gap-4 top-1/2 right-1/2 min-w-72 translate-x-1/2 -translate-y-1/2 bg-white pt-2">
                <h5 className="font-semibold text-2xl mb-2">Criar tarefa</h5>

                <label htmlFor="titulo" className="flex flex-col">
                    <span className="text-zinc-500 font-medium mb-1 text-sm">Título</span>
                    <input placeholder="Tarefa Exemplo" type="text" name="titulo" id="titulo" className="border border-zinc-300 rounded-md px-2 py-1 outline-none" />
                </label>
                <label htmlFor="desc" className="flex flex-col">
                    <span className="text-zinc-500 font-medium mb-1 text-sm">Descricao</span>
                    <input placeholder="Descrição detalhada da tarefa." type="text" name="desc" id="desc" className="border border-zinc-300 rounded-md px-2 py-1 outline-none" />
                </label>
                <label htmlFor="status" className="flex flex-col">
                    <span className="text-zinc-500 font-medium mb-1 text-sm">Status</span>
                    <select className="border border-zinc-300 rounded-md px-2 py-1 outline-none" name="status" id="status">
                        <option value="TODO">A FAZER</option>
                        <option value="DOING">FAZENDO</option>
                        <option value="DONE">FEITO</option>
                    </select>
                </label>

                <section className="flex gap-3 justify-end mt-2">
                    <button className="px-3 py-2 border border-zinc-300 rounded-lg" onClick={close}>Cancelar</button>
                    <button className="px-3 py-2 border border-zinc-300 rounded-lg"
                    >Criar</button>
                </section>
            </form>
        </div>
    )
}