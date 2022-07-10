import { useState } from "react"

const Login = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      email,
      password,
    }
    console.log(body)
  }

  return (
    <div className="navbar-offset md:p-16 p-4">
      <h1 className="text-lg md:text-3xl md:mb-16 mb-4">Login</h1>
      <form className="md:w-4/5 container my-center" onSubmit={handleSubmit}>
        <section className="bg-white p-8 border border-gray-300 rounded-lg md:my-8 my-6">
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Email Address*</p>
            <input type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 text-lg outline-none text-sm md:text-base" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Password*</p>
            <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 text-sm md:text-base outline-none" />
          </div>
        </section>
        <button type="button" className="block action-btn2 p-2 px-4 rounded-md mb-4">Signup Instead</button>
        <button type="submit" className="p-2 px-4 action-btn rounded-lg block">Login</button>
      </form>
    </div>
  )
}

export default Login;