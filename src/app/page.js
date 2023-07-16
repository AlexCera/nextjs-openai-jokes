"use client"
import { useState } from "react";

export default function Home() {

  const [error, setError] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [joke, setJoke] = useState("")
  const [loading, setLoading] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const responseAPI = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt })
      })

      const data = await responseAPI.json()
      setPrompt("")
      setJoke(data.data)
    } catch (error) {
      setError(true)
    }
    setLoading(false)
  }

  const cleanAll = () => {
    setPrompt("")
    setError(false)
    setJoke("")
    setLoading("")
  }

  return (
    <main className="bg-zinc-800 h-screen flex justify-center items-center phone:p-2">
      {
        error && (
          <div
            className="mb-4 rounded-lg bg-red-600 px-6 py-5 text-base"
            role="alert">
            <h4 className="mb-2 text-2xl font-medium leading-tight">Ocurrio un error</h4>
            <p className="mb-4">
              Lo sentimos, no hemos podido generar el chiste.
            </p>
            <button onClick={cleanAll()} className="bg-white p-2 rounded-md block mt-2 mx-auto text-gray-700">
              Volver a intentarlo
            </button>
          </div>
        )
      }

      {!error && (
        <form onSubmit={onSubmit} className="bg-zinc-700 p-10 w-1/2 rounded-md phone:w-full phone:p-7">
          <h1 className="text-white text-2xl font-bold">Generador de chistes</h1>
          <input type="text" placeholder="Escribe aquí un tema para generar el chiste"
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            className="p-2 mt-2 block bg-neutral-600 text-white w-full rounded-md outline-none" />

          <button disabled={prompt.length <= 0} className="bg-indigo-600 p-2 rounded-md mt-3 mr-2 text-white disabled:opacity-60 disabled:cursor-not-allowed">
            Generar
          </button>

          <button disabled={prompt.length == 0} onClick={() => setPrompt("")} type="reset" className="bg-lime-600 p-2 rounded-md mt-3 ml-2 text-white disabled:opacity-60 disabled:cursor-not-allowed">
            Limpiar
          </button>



          {
            (joke)
              ? <p class="mt-5  text-gray-500 dark:text-white">{joke}</p>
              : loading && (<div className="text-center">
                <div role="status">
                  <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-indigo-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                  </svg>
                  <span className="sr-only">Generando...</span>
                </div>
              </div>
              )
          }
        </form>
      )}
    </main>
  )
}
