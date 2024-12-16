interface ListItemProps {
    id: number,
    text: string,
    completed?: boolean
}

export default function ListItem(props: ListItemProps) {
    async function deletar() {
        await fetch('http://localhost:3000/tasks/' + props.id, {
            method: "DELETE"
        })
            .then(data => {
                if(data.status == 200)
                    location.reload()
                return data.json()})
            .then(data => data)
            .catch(err => console.log(err))
    }

    return (
        <>
            <li className={`px-5 py-2 border-b-[1px] border-[var(--dark-text-concluded)] bg-[var(--dark-bg-main)] rounded-t-md ${props.completed ? 'text-[var(--dark-text-secondary)] line-through' : 'text-[var(--dark-text-hover)]'} flex items-center text-ellipsis h-12`}>
                <input className='w-full text-ellipsis bg-transparent'
                    style={{ pointerEvents: 'none', userSelect: 'none', cursor: 'default', }}
                    type="text" value={props.text} disabled />
                <button onClick={() => {
                    const confirmacao = confirm('Quer excluir essa tarefa?')
                    if(confirmacao)
                        deletar()
                }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>
                </button>
            </li >
        </>
    )
}