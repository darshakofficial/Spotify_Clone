import LoggedInContainer from "../containers/LoggedInContainer";
import TextInput from "../component/shared/TextInput";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  makeAuthenticatedGETRequest,
  makeAuthenticatedPUTRequest,
} from "../utils/serverHelpers";
import { useCookies } from "react-cookie";
// import { green } from "@cloudinary/url-gen/actions/adjust";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const [firstName, setFirstName] = useState(" ");
  const [lastName, setLastName] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [isEdit, setIsEdit] = useState(true);
  // const [password, setPassword] = useState("");

  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      const userData = await makeAuthenticatedGETRequest("/auth/get/userData");
      setFirstName(userData.data.firstName);
      setLastName(userData.data.lastName);
      setEmail(userData.data.email);
    };
    getData();
  }, []);

  const updateUser = async () => {
    const data = { email, firstName, lastName };
    const response = await makeAuthenticatedPUTRequest(
      "/auth/update/userData",
      data
    );
    if (response && !response.err) {
      console.log(response);

      alert("success");
    } else {
      alert("failure");
    }
  };

  const handelLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <LoggedInContainer curActiveScreen={"profile"}>
      <div className="text-white text-2xl pb-3 pl-2 font-semibold pt-8">
        User Profile
      </div>

      <div className="pt-5 pl-2">
        <div className="w-2/3">
          <TextInput
            label={"Email"}
            placeholder={"Email"}
            labelClassName={"text-white"}
            read={isEdit}
            value={email}
            setValue={setEmail}
          />
        </div>
        <div className="w-2/3 flex space-x-3 my-5">
          <div className="w-1/2">
            <TextInput
              label={"First Name"}
              placeholder={"First Name"}
              labelClassName={"text-white"}
              read={isEdit}
              value={firstName}
              setValue={setFirstName}
            />
          </div>
          <div className="w-1/2">
            <TextInput
              label={"Last Name"}
              placeholder={"Last Name"}
              labelClassName={"text-white"}
              read={isEdit}
              value={lastName}
              setValue={setLastName}
            />
          </div>
        </div>

        <div className="flex">
          <div className="w-1/3 my-5">
            {isEdit ? (
              <div
                className="bg-white w-1/3 flex items-center justify-center p-3 border-solid rounded cursor-pointer font-semibold"
                onClick={() => {
                  setIsEdit(false);
                }}
              >
                Edit
              </div>
            ) : (
              <div
                className="bg-white w-1/3 flex items-center justify-center p-3 border-solid rounded cursor-pointer font-semibold"
                onClick={() => {
                  updateUser();
                  setIsEdit(true);
                }}
              >
                Save
              </div>
            )}
          </div>
          <div className="w-1/3 my-5 mr-3 flex flex-row-reverse">
            <div
              className="bg-green-500 text-white hover:bg-white hover:text-green-500 w-1/3 flex items-center justify-center p-3 border-solid rounded cursor-pointer font-semibold"
              onClick={() => {
                handelLogout();
              }}
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default Profile;
