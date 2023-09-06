import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useState } from "react";
import {useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import TextInput from "../component/shared/TextInput";
import PasswordInput from "../component/shared/PasswordInput";
import { makeUnauthenticatedPOSTRequest } from "../utils/serverHelpers";

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const login = async () => {
    
    const data = { email, password};
    const response = await makeUnauthenticatedPOSTRequest(
      "/auth/login",
      data
    );
    if (response && !response.err) {
      // console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, { path: "/", expires: date });
      alert("success");
      navigate("/home");
    } else {
      alert("failure");
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col ">
        <div className="font-bold mb-4">To continue, log in to spotify</div>

        <TextInput
          label="Email address or username"
          placeholder="Email address or username"
          className="my-4"
          value={email}
          setValue={setEmail}
        />

        <PasswordInput
          label="Password"
          placeholder="Password"
          value={password}
          setValue={setPassword}
        />

        <div className="w-full flex item-center justify-end my-8">
          <button className="bg-green-400 font-semibold p-3 px-10 rounded-full"
           onClick={(event) => {
            event.preventDefault();
            login();
           }}
          >
            LOG IN
          </button>
        </div>

        <div className="w-full border-b border-solid border-gray-600"></div>
        <div className="my-6 font-semibold text-lg">Don't have an account?</div>
        <div className="border border-gray-600 text-gray-600 font-bold w-full flex items-center justify-center py-3 rounded-full">
          <Link to="/signup">SIGN UP FOR SPOTIFY</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
