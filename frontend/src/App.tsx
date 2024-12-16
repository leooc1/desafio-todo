import { useEffect, useState } from "react"
import ListItem from "./components/ListItem"
import CreateTask from "./components/CreateTask"
import EditTask from "./components/EditTask"

function App() {
  const [idUsu, setIdUsu] = useState<number | null>(0)
  const [task, setTask] = useState<{
    id: number
    titulo: string
    descricao: string
    status: string
    create_date: string
    user: { id: number }
  }[]>([])
  const [showTask, setShowTask] = useState<{
    id: number
    titulo: string
    descricao: string
    status: string
    create_date: string
    user: { id: number }
  }[]>([])
  const [filter, setFilter] = useState('all')
  const [criar, setCriar] = useState(false)
  const [editar, setEditar] = useState(false)

  const [idTask, setIdTask] = useState(0)
  const [titleTask, setTitleTask] = useState('')
  const [descTask, setDescTask] = useState('')
  const [statusTask, setStatusTask] = useState('')


  async function getTasks() {
    await fetch('http://localhost:3000/tasks', { method: 'GET' })
      .then(data => data.json())
      .then(data => {
        setTask(data.filter(d => d.user.id == idUsu))
        setShowTask(data.filter(d => d.user.id == idUsu))
      })
      .catch(err => console.log(err))
  }

  async function getUsu() {
    const token = window.localStorage.getItem('token_todo_acc')
    await fetch('http://localhost:3000/auth/token/' + token, { method: 'GET' })
      .then(data => data.json())
      .then(data => {
        if (data.id)
          setIdUsu(data.id)
        else
          setIdUsu(null)
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getTasks()
    getUsu()
  }, [])

  useEffect(() => {
    if (filter == 'all') {
      setShowTask(task)
    }
    else {
      setShowTask(task.filter(t => t.status.toLowerCase() == filter))
    }
  }, [filter])

  useEffect(() => {
    if (idUsu == null) {
      window.location.assign('/login')
    }
    getTasks()
  }, [idUsu])

  return (
    <main className={`min-h-screen full-scroll grid overflow-hidden`} style={{ gridTemplateRows: '250px 1fr' }}>
      <section className={`sm:bg-dark-image bg-dark-image-mobile bg-center bg-cover flex items-center`}>
        <div className='flex w-full justify-evenly items-center pb-10'>
          <h1 className='font-bold text-white text-4xl'>T O D O</h1>
          <button className="bg-[var(--dark-bg-main)] text-white py-2 px-3 rounded-xl"
            onClick={() => {
              setCriar(true)
            }}
          >CRIAR TAREFA</button>
          {criar && <CreateTask close={() => setCriar(false)} id={idUsu || 0} />}
          {editar && <EditTask close={() => setEditar(false)} id={idUsu || 0}
            idTask={idTask}
            titleTask={titleTask}
            descTask={descTask}
            statusTask={statusTask}
          />}
        </div>
      </section>
      <section className={`bg-[var(--dark-bg-color)]`}>
        <section className='w-80 sm:w-96 md:w-1/2 mx-auto relative -top-24'>
          <ul className={`w-full bg-[var(--dark-bg-main)] rounded-t-md shadow-xl shadow-[#00000093] min-h-[20px] max-h-80 overflow-y-scroll scroll-list`}>
            {
              showTask.length > 0 &&
              showTask.map(t => <div onClick={() => {
                setIdTask(t.id)
                setTitleTask(t.titulo)
                setDescTask(t.descricao)
                setStatusTask(t.status)
                setEditar(true)
              }}><ListItem id={t.id} text={t.titulo} completed={t.status == 'DONE'} /></div>)
            }
          </ul>


          <div className={`flex bg-[var(--dark-bg-main)] text-[var(--dark-text-secondary)] py-2 rounded-b-md justify-between px-2 text-sm`}>
            <button className={`${filter == 'all' ? 'text-blue-400' : 'text-zinc-400'}`}
              onClick={() => {
                setFilter('all')
              }}
            >TODAS</button>
            <button className={`${filter == 'todo' ? 'text-blue-400' : 'text-zinc-400'}`}
              onClick={() => {
                setFilter('todo')
              }}
            >A FAZER</button>
            <button className={`${filter == 'doing' ? 'text-blue-400' : 'text-zinc-400'}`}
              onClick={() => {
                setFilter('doing')
              }}
            >FAZENDO</button>
            <button className={`${filter == 'done' ? 'text-blue-400' : 'text-zinc-400'}`}
              onClick={() => {
                setFilter('done')
              }}
            >FEITO</button>
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
