
export default function Login() {

    async function login(body: any) {
        await fetch('http://localhost:3000/auth', {
            method: 'POST',
            body: JSON.stringify({
                email: body.email,
                senha: body.senha
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(data => {
                if (data.status == 200)
                    return data.json()
                else return null
            })
            .then((data) => {
                if (data) {
                    window.localStorage.setItem('token_todo_acc', data)
                    window.location.assign('/')
                }
                else {
                    alert('Dados incorretos!')
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="bg-[var(--dark-bg-main)] w-full min-h-screen">
            <form onSubmit={(e) => {
                e.preventDefault()
                const email = document.getElementById('email') as HTMLInputElement
                const senha = document.getElementById('senha') as HTMLInputElement
                login({ email: email.value, senha: senha.value })
            }}
                style={{ width: '-webkit-fill-available' }}
                className="flex rounded-md flex-col absolute px-4 pb-3 gap-4 top-1/2 right-1/2 min-w-72 translate-x-1/2 -translate-y-1/2 bg-white pt-2">

                <label htmlFor="email" className="flex flex-col">
                    <span className="text-zinc-500 font-medium mb-1 text-sm">E-mail</span>
                    <input placeholder="nome@email.com" type="email" name="email" id="email" className="border border-zinc-300 rounded-md px-2 py-1 outline-none" />
                </label>
                <label htmlFor="senha" className="flex flex-col">
                    <span className="text-zinc-500 font-medium mb-1 text-sm">Senha</span>
                    <input placeholder="* * * * * * * *" type="password" name="senha" id="senha" className="border border-zinc-300 rounded-md px-2 py-1 outline-none" />
                </label>

                <section className="flex gap-3 justify-end mt-2">
                    <button className="px-3 py-2 border border-zinc-300 rounded-lg"
                    >Entrar</button>
                </section>
            </form>
        </div>
    )
}
