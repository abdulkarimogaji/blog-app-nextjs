import { useState } from "react"

const SignUp = () => {
  const [username, setUsername] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [description, setDescription] = useState("")
  const [name, setName] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      username,
      phone,
      email,
      password,
      description,
      name
    }
    console.log(body)
  }

  return (
    <div className="navbar-offset md:p-16 p-8">
      <h1 className="md:text-3xl text-lg md:mb-16 mb-8">Sign up to <strong>Blognado</strong></h1>
      <form className="md:w-4/5 container my-center" onSubmit={handleSubmit}>
        <section className="bg-white md:p-8 p-4 border border-gray-300 rounded-lg my-8">
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Name*</p>
            <input type="text" value={name} onChange={e => setName(e.currentTarget.value)} placeholder="Name" className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Username (This is what appears in comments)</p>
            <input type="text" placeholder="Display Name" value={username} onChange={e => setUsername(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Phone Number</p>
            <input type="text" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Email Address*</p>
            <input type="text" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Description</p>
            <textarea placeholder="Tell us About Yurself" value={description} onChange={e => setDescription(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Password*</p>
            <input type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
        </section>
        <button type="button" className="block action-btn2 p-2 px-4 rounded-md mb-4">Login Instead</button>
        <button type="submit" className="p-2 px-4 action-btn rounded-lg block">Sign up</button>
      </form>
    </div>
  )
}

export default SignUp;