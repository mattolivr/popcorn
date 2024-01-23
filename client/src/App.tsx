import { useEffect, useState, useRef, FormEvent } from "react"
import { api } from "./services/api"
import { User } from "../../src/core/entities/user.entity"
import { FaTrash } from "react-icons/fa6"
import Card from "./components/Card"
import Input, { InputType } from "./components/Input"

export default function App() {
  const [users, setUsers] = useState<User[]>([])
  const nameRef = useRef<HTMLInputElement | null>(null)
  const emailRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    const response = await api.get('/users')
    setUsers(response.data)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!nameRef.current?.value || !emailRef.current?.value) {
      alert("Preencha todos os campos")
      return
    }

    const response = await api.post('/user', {
      name: nameRef.current?.value,
      email: emailRef.current?.value
    })

    setUsers(allUsers => [...allUsers, response.data])

    nameRef.current.value = ""
    emailRef.current.value = ""
  }

  async function handleDelete(id:string) {
    await api.delete('/user', { params: { id: id } })
    setUsers(users.filter(user => user.id !== id))
  }

  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-100">
      <main className="w-full justify-center py-8 px-4 md:max-w-2xl md:px-0">
        <h1 className="font-bold text-3xl text-center">Cadastro de Usuários</h1>

        <Card title="Dados Gerais">
          <form className="flex flex-col my-5 gap-2" onSubmit={handleSubmit}>
            <Input type={InputType.TEXT} label="Nome" action={{ name: "Teste", function: () => {} }} ref={nameRef}/>
            <Input type={InputType.EMAIL} label="Email" hint="Necessário bla" ref={emailRef}/>

            <input type="submit" value="Cadastrar" className="cursor-pointer w-full p-2 bg-green-400 rounded mt-3"/>
          </form>
        </Card>

        <section>
          {users.map((user) => (
            <article key={ user.id } className="bg-white rounded flex mb-4">
              <div className="flex-1 py-2 px-4">
                <p className="text-xl">{ user.name }</p>
                <p>{ user.email }</p>
              </div>
              <div className="flex-none min-w-28">
                <button 
                  className="hover:bg-red-400 hover:text-gray-50 w-full h-full flex items-center justify-center rounded"
                  onClick={() => handleDelete(user.id)}
                >
                  <FaTrash/>
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    </div>
  )
}