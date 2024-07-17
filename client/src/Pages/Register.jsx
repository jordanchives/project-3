import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import auth from "../utils/auth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [addUser, { error }] = useMutation(ADD_USER);

  if(auth.loggedIn()) {
    window.location.assign("/");
  }

  const [visible, setVisible] = useState(true);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({
        variables: { username, email, password },
      });
      console.log(data);
      auth.login(data.addUser.token);
    } catch (err) {
      console.error(error);
      setVisible(false);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md bg-[#222] rounded-xl shadow-md py8 px-8">
        <h2 className="text-[25px] font-bold text-white mb-6 text-center">
          SignUp
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col">
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="UserName"
            className="bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300"
            type="text"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300"
            type="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-gray-700 text-white border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none transition ease-in-out duration-150 placeholder-gray-300"
            type="password"
          />
          <span
            style={{ color: "white" }}
            className={visible ? "invisible" : ""}
          >
            {" "}
            Problem Creating User!
          </span>
          <button
            onClick={handleRegister}
            className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full text-white font-medium py-2 px-4 hover:bg-indigo-600 hover:to-blue-600 transtion ease-in duration-200"
            type="submit"
          >
            Submit
          </button>
          <p className="text-white mt-4 text-center">
            Already have an account?
            <a href="/login" className="text-white-500 hover:underline mt-4 px-1 ">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
