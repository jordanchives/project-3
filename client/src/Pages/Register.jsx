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
    <div className="flex flex-col items-center m-8">
      <div className="form-container w-md bg-[#151624] rounded-xl py-8 px-8">
        <h2 className="form-text mb-6 text-center">
          sign-up
        </h2>
        <form onSubmit={handleRegister} className="flex flex-col">
          <input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="UserName"
            className="bg-[#D6C9AE] text-[#151624] border-0 rounded-md p-2 mb-4 focus:bg-[#F2A007] focus:outline-none transition ease-in-out duration-150 placeholder-[#151624]"
            type="text"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-[#D6C9AE] text-[#151624] border-0 rounded-md p-2 mb-4 focus:bg-[#F2A007] focus:outline-none transition ease-in-out duration-150 placeholder-[#151624]"
            type="email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="bg-[#D6C9AE] text-[#151624] border-0 rounded-md p-2 mb-4 focus:bg-[#F2A007] focus:outline-none transition ease-in-out duration-150 placeholder-[#151624]"
            type="password"
          />
          <span
            style={{ color: "#D6C9AE" }}
            className={`${visible ? "invisible" : ""} mt-4 text-center pb-4`}
          >
            {" "}
            Problem Creating User!
          </span>
          <button
            onClick={handleRegister}
            className="reg-error bg-gradient-to-r from-[#F2A007] to-[#f0560f] rounded-full text-white font-medium py-2 px-4 hover:bg-[#f0560f] hover:to-[#F2A007] transtion ease-in duration-200"
            type="submit"
          >
            Submit
          </button>
          <p className="text-[#D6C9AE] mt-4 text-center">
            Already have an account?
            <a href="/login" className="hover:underline mt-4 px-1 ">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
