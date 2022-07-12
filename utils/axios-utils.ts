import axios from "axios";

const client = axios.create( { baseURL: 'https://blognado.herokuapp.com' })

export const request = ({...options}) => {
  const token = localStorage.getItem("blognado-access-token")
  client.defaults.headers.common.Authorization = `Bearer ${token}`
  const onSuccess = (resp: any) => resp
  const onError = (err: any) => {
  }
  return client(options).then(onSuccess)
}