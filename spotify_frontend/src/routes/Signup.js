import { Icon } from "@iconify/react";
import TextInput from "../component/shared/TextInput";
import PasswordInput from "../component/shared/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {makeUnauthenticatedPOSTRequest} from "../utils/serverHelpers";
import {useCookies} from "react-cookie";

const SignupComponent = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [cookie, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const signUp = async () => {
    if(email !== confirmEmail){
      alert("Email and confirm email field must match. Please check agian.");
    }

    const data = {email, password, username, firstName, lastName}
    const response = await makeUnauthenticatedPOSTRequest("/auth/register", data);
    if(response && !response.err){
      console.log(response);
      const token = response.token;
      const date = new Date();
      date.setDate(date.getDate() + 30);
      setCookie("token", token, {path:"/", expires: date});
      alert("success");
      navigate("/home");
    }else{
      alert("failure");
    }

  }


  return (
    <div className="w-full h-full flex flex-col items-center">
      <div className="logo p-5 border-b border-solid border-gray-300 w-full flex justify-center">
        <Icon icon="logos:spotify" width="150" />
      </div>
      <div className="inputRegion w-1/3 py-10 flex items-center justify-center flex-col ">
        <div className="font-bold mb-4 text-2xl">
          Sign up for free to start listening.
        </div>

        <TextInput
          label="Email Address"
          placeholder="Enter your email."
          className="my-6"
          value={email}
          setValue={setEmail}
        />
        <TextInput
          label="Confirm Email Address"
          placeholder="Enter your email again."
          className="mb-6"
          value={confirmEmail}
          setValue={setConfirmEmail}
        />

        <TextInput
          label="Username"
          placeholder="Enter your username."
          className="mb-6"
          value={username}
          setValue={setUsername}
        />

        <PasswordInput
          label="Create Password"
          placeholder="Enter a strong password here"
          value={password}
          setValue={setPassword}
        />

        <div className=" w-full flex justify-between items-center space-x-8">
          <TextInput
            label="First Name"
            placeholder="Enter your first name."
            className="my-6 overflow-hidden"
            value={firstName}
            setValue={setFirstName}
          />
          <TextInput
            label="Last name"
            placeholder="Enter your last name."
            className="my-6 overflow-hidden"
            value={lastName}
            setValue={setLastName}
          />
        </div>

        <div className="w-full flex item-center justify-center my-8">
          <button className="bg-green-400 font-semibold p-3 px-10 rounded-full"
            onClick={(e) => {
              e.preventDefault();
              signUp();
            }}
          >
            Sign up
          </button>
        </div>

        <div className="w-full border-b border-solid border-gray-600"></div>
        <div className="my-6 font-semibold text-lg">
          Already have an account?
        </div>
        <div className="border border-gray-600 text-gray-600 font-bold w-full flex items-center justify-center py-3 rounded-full">
          <Link to="/login">LOG IN INSTEAD</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupComponent;
