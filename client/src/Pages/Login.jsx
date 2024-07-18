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
    <div className="flex flex-col items-center m-8">
      <div className="w-md bg-[#151624] rounded-xl shadow-md py-8 px-8">
        <h2 className="form-text mb-6 text-center">
          login
        </h2>
        <form action="" className="flex flex-col" onSubmit={handleFormSubmit}>
          <input
            placeholder="Username"
            className="bg-[#D6C9AE] text-[#151624] border-0 rounded-md p-2 mb-4 focus:bg-[#F2A007] focus:outline-none transition ease-in-out duration-150 placeholder-[#151624]"
            type="text"
            name="username"
            id="username"
          />

          <input
            placeholder="Password"
            className="bg-[#D6C9AE] text-[#151624] border-0 rounded-md p-2 mb-4 focus:bg-[#F2A007] focus:outline-none transition ease-in-out duration-150 placeholder-[#151624]"
            type="password"
            id="password"
          />
          <span
            style={{ color: "#D6C9AE" }}
            className={`${visible ? "invisible" : ""} mt-4 text-center pb-4`}
          >
            {" "}
            Invalid Login Credentials!
          </span>
          <button
            className="bg-gradient-to-r from-[#F2A007] to-[#f0560f] rounded-full text-white font-medium py-2 px-4 hover:bg-[#f0560f] hover:to-[#F2A007] transtion ease-in duration-200"
            type="submit"
          >
            Submit
          </button>
          <p className="text-[#D6C9AE] mt-4 text-center">
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
