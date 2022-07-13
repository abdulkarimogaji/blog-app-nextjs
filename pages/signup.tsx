import { useRouter } from "next/router"
import { useState } from "react"
import { useMutation } from "react-query"
import Spinner from "../components/Spinner"
import { useUserContext } from "../context/useUserContext"
import { request } from "../utils/axios-utils"
import { LoginResponse, MyResponseType } from "../utils/types"


type Credential = {
  username: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  about: string;
  picture: string;
}


const signUp = (data: Credential) => {
  return request({ url: "/users", data, method:"post"})
}
const SignUp = () => {
  const [errorText, setErrorText] = useState("")
  const [cred, setCred] = useState<Credential>({} as Credential)
  const router = useRouter()
  const { dispatch } = useUserContext()
  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutate(cred)
  }

  const { mutate, isLoading } = useMutation<MyResponseType<LoginResponse>, any, any, any>(signUp, {
    onSuccess: (data) => {
      localStorage.setItem("blognado-access-token", data.data.data.access_token)
      dispatch({
        type: "LOGIN",
        payload: { ...data.data.data.user, access_token: data.data.data.access_token}
      })
      router.push(`/users/me`)
    },
    onError: (err: any) => {
      if (err.response.status == 401) {
        setErrorText("Incorrect Password")
      } else if (err.response.status == 404) {
        setErrorText("Credentials not found")
      } else if (err.response.status == 400) {
        setErrorText("Incorrect email")
      }
    }
  })

  if (isLoading) return <Spinner />

  return (
    <div className="navbar-offset md:p-16 p-8">
      <h1 className="md:text-3xl text-lg md:mb-16 mb-8">Sign up to <strong>Blognado</strong></h1>
      <form className="md:w-4/5 container my-center" onSubmit={handleSubmit}>
        <h1>{errorText}</h1>
        <section className="bg-white md:p-8 p-4 border border-gray-300 rounded-lg my-8">
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">FirstName*</p>
            <input type="text" value={cred.firstName} onChange={e => setCred(prev => ({...prev, firstName: e.target.value}))} placeholder="Name" className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">LastName*</p>
            <input type="text" value={cred.lastName} onChange={e => setCred(prev => ({...prev, lastName: e.target.value}))} placeholder="Name" className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Username (This is what appears in comments)</p>
            <input type="text" placeholder="Display Name" value={cred.username} onChange={e => setCred(prev => ({...prev, username: e.target.value}))} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Phone Number</p>
            <input type="text" placeholder="Phone" value={cred.phone} onChange={e => setCred(prev => ({...prev, phone: e.target.value}))} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Email Address*</p>
            <input type="text" placeholder="Email Address" value={cred.email} onChange={e => setCred(prev => ({...prev, email: e.target.value}))} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Description</p>
            <textarea placeholder="Tell us About Yourself" value={cred.about} onChange={e => setCred(prev => ({...prev, about: e.target.value}))} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Password*</p>
            <input type="password" placeholder="Enter Password" value={cred.password} onChange={e => setCred(prev => ({...prev, password: e.target.value}))} className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none" />
          </div>
        </section>
        <button type="button" className="block action-btn2 p-2 px-4 rounded-md mb-4" onClick={() => {router.push("/login")}}>Login Instead</button>
        <button type="submit" className="p-2 px-4 action-btn rounded-lg block">Sign up</button>
      </form>
    </div>
  )
}

export default SignUp;