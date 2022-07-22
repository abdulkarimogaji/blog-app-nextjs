import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import Spinner from "../components/Spinner";
import { useUserContext } from "../context/useUserContext";
import { request } from "../utils/axios-utils";
import { LoginResponse, MyResponseType } from "../utils/types";

type Credential = {
  username: string;
  phone: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  about: string;
  picture: string;
};

const signUp = (data: Credential) => {
  return request({ url: "/users", data, method: "post" });
};

const handleGoogleLogin = (body: CredentialResponse) => {
  console.log("body", body);
  return request({ url: "/auth/google/login", method: "post", data: body });
};

const SignUp = () => {
  const [errorText, setErrorText] = useState("");
  const [cred, setCred] = useState<Credential>({} as Credential);
  const [picture, setPicture] = useState<any>(null);
  const router = useRouter();
  const { dispatch } = useUserContext();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const url = await handleImageUpload();
    mutate({ ...cred, picture: url });
  };

  const onSuccess = (data: MyResponseType<LoginResponse>) => {
    console.log("data, ", data);
    const cred = {
      username: data.data.data.user.username,
      picture: data.data.data.user.picture,
      access_token: data.data.data.access_token,
      _id: data.data.data.user._id,
      email: data.data.data.user.email,
    };
    dispatch({
      type: "LOGIN",
      payload: cred,
    });
    localStorage.setItem("blognado-access-token", data.data.data.access_token);
    router.push(`/users/me`);
  };

  const onError = (err: any) => {
    if (err.response.status == 401) {
      setErrorText("Incorrect Password");
    } else if (err.response.status == 404) {
      setErrorText("Credentials not found");
    } else if (err.response.status == 400) {
      setErrorText("Incorrect email");
    }
  };

  const { mutate: googlelogin, isLoading: loading } = useMutation<
    MyResponseType<LoginResponse>,
    string,
    CredentialResponse,
    string
  >(handleGoogleLogin, {
    onSuccess,
  });

  const handleImageUpload = async () => {
    let formData = new FormData();
    formData.append("upload", picture);
    if (!picture) return "";
    const res = await fetch("/api/file-upload", {
      method: "POST",
      body: formData,
    });
    if (res.status != 200) return "";
    const resJson = await res.json();
    return `https://drive.google.com/uc?export=view&id=${resJson.data.id}`;
  };

  const { mutate, isLoading } = useMutation<
    MyResponseType<LoginResponse>,
    any,
    any,
    any
  >(signUp, {
    onMutate(variables) {
      console.log("mutatign", variables);
    },
    onSuccess,
    onError,
  });

  const handleSetPicture = (e: any) => {
    setPicture(e.target.files[0]);
  };

  if (isLoading || loading) return <Spinner />;

  return (
    <div className="md:p-16 p-4 mt-16">
      <h1 className="md:text-3xl text-lg md:mb-16 mb-8">
        Sign up to <strong>Blognado</strong>
      </h1>
      <section className="bg-white p-8 border border-gray-300 rounded-lg md:w-4/5 my-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-lg font-semibold">Continue With Google</h1>
          <GoogleLogin
            onSuccess={googlelogin}
            onError={() => {
              setErrorText("Failed to login with google");
            }}
          />
        </div>
      </section>
      <form className="md:w-4/5 container my-center" onSubmit={handleSubmit}>
        <h1>{errorText}</h1>
        <section className="bg-white md:p-8 p-4 border border-gray-300 rounded-lg my-8">
          <h1 className="text-lg font-semibold text-center">
            Signup With Email
          </h1>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">
              FirstName*
            </p>
            <input
              type="text"
              value={cred.firstName}
              onChange={(e) =>
                setCred((prev) => ({ ...prev, firstName: e.target.value }))
              }
              placeholder="Name"
              className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none"
            />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">LastName*</p>
            <input
              type="text"
              value={cred.lastName}
              onChange={(e) =>
                setCred((prev) => ({ ...prev, lastName: e.target.value }))
              }
              placeholder="Name"
              className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none"
            />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">
              Profile Picture
            </p>
            <input
              type="file"
              name="upload"
              onChange={handleSetPicture}
              placeholder="Profile Picture"
              className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none"
            />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">
              Username (This is what appears in comments)
            </p>
            <input
              type="text"
              placeholder="Display Name"
              value={cred.username}
              onChange={(e) =>
                setCred((prev) => ({ ...prev, username: e.target.value }))
              }
              className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none"
            />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">
              Phone Number
            </p>
            <input
              type="text"
              placeholder="Phone"
              value={cred.phone}
              onChange={(e) =>
                setCred((prev) => ({ ...prev, phone: e.target.value }))
              }
              className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none"
            />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">
              Email Address*
            </p>
            <input
              type="text"
              placeholder="Email Address"
              value={cred.email}
              onChange={(e) =>
                setCred((prev) => ({ ...prev, email: e.target.value }))
              }
              className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none"
            />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">
              Description
            </p>
            <textarea
              rows={7}
              placeholder="Tell us About Yourself"
              value={cred.about}
              onChange={(e) =>
                setCred((prev) => ({ ...prev, about: e.target.value }))
              }
              className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none"
            />
          </div>
          <div className="my-12">
            <p className="md:text-lg text-base font-semibold mb-4">Password*</p>
            <input
              type="password"
              placeholder="Enter Password"
              value={cred.password}
              onChange={(e) =>
                setCred((prev) => ({ ...prev, password: e.target.value }))
              }
              className="border hover:border-gray-600 focus:border-gray-600 container rounded-lg p-2 pe-5 md:text-base text-sm outline-none"
            />
          </div>
        </section>
        <button
          type="button"
          className="block action-btn2 p-2 px-4 rounded-md mb-4"
          onClick={() => {
            router.push("/login");
          }}
        >
          Login Instead
        </button>
        <button type="submit" className="p-2 px-4 action-btn rounded-lg block">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
