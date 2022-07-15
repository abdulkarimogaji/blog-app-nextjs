import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation } from "react-query"
import Spinner from "../components/Spinner"
import { useUserContext } from "../context/useUserContext"
import { request } from "../utils/axios-utils"
import { LoginResponse, MyResponseType, User } from "../utils/types"


type Credential = {
  email: string;
  password: string;
}
const handleLogin = (body: any) => {
  return request({ url: "/auth/login", method: "post", data: body })
}


const Login = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [errorText, setErrorText] = useState("")
  const onError = (err: any) => {
    if (err.response.status == 401) {
      setErrorText("Incorrect Password")
    } else if (err.response.status == 404) {
      setErrorText("Credentials not found")
    } else if (err.response.status == 400) {
      setErrorText("Incorrect email")
    }
  }
  const { mutate, isLoading } = useMutation<MyResponseType<LoginResponse>, string, Credential, string>(handleLogin, {
    onSuccess: (data) => {
      console.log("data, ", data)
      const cred = {
        username: data.data.data.user.username,
        picture: data.data.data.user.picture,
        access_token: data.data.data.access_token,
        _id: data.data.data.user._id,
        email: data.data.data.user.email,
      }
      dispatch({
        type: "LOGIN",
        payload: cred
      })
      localStorage.setItem("blognado-access-token", data.data.data.access_token)
      router.push(`/users/me`)
    }, onError
  })
  const { dispatch } = useUserContext()
  const router = useRouter()
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const body = {
      email,
      password,
    }
    mutate(body)
  }

  if (isLoading) return <Spinner />

  return (
    <div className="navbar-offset md:p-16 p-4">
      <h1 className="text-lg md:text-3xl md:mb-16 mb-4">Login</h1>
      <h1 className="text-lg text-red-600">{errorText}</h1>
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
        <button type="button" className="md:p-2 p-1 md:px-4 px-2 text-xs md:text-sm action-btn2 rounded-lg mb-4 block" onClick={() => { router.push("/signup")}}>Signup Instead</button>
        <button type="submit" className="md:p-2 p-1 md:px-4 px-2 text-xs md:text-sm action-btn rounded-lg block">Login</button>
      </form>
    </div>
  )
}

export default Login;