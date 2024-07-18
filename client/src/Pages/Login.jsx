// Login.jsx
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { useState } from "react";
import auth from "../utils/auth";

function Login() {
  const [login, { error }] = useMutation(LOGIN_USER);
  const [visible, setVisible] = useState(true);

  if(auth.loggedIn()) {
    window.location.assign("/");
  }
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await login({
        variables: {
          username: e.target.username.value,
          password: e.target.password.value,
        },
      });
      localStorage.setItem("user_id", data.login.user._id);
      auth.login(data.login.token);
    } catch (err) {
      setVisible(false);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen m-2">
      <div className="w-full max-w-md bg-[#222] rounded-xl shadow-md py-8 px-8">
        <h2 className="text-[25px] font-bold text-white mb-6 text-center">
          Login
        </h2>
        <form action="" className="flex flex-col" onSubmit={handleFormSubmit}>
          <input
            placeholder="Username"
            className="bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300"
            type="text"
            name="username"
            id="username"
          />

          <input
            placeholder="Password"
            className="bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300"
            type="password"
            id="password"
          />
          <span
            style={{ color: "white" }}
            className={`${visible ? "invisible" : ""} mt-4 text-center pb-4`}
          >
            {" "}
            Invalid Login Credentials!
          </span>
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-white font-medium py-2 px-4 hover:bg-indigo-600 hover:to-blue-600 transtion ease-in duration-200"
            type="submit"
          >
            Submit
          </button>
          <p className="text-white mt-4 text-center">
            Don't have an account?
            <a href="/register" className="text-white-500 hover:underline mt-4 px-1 ">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
