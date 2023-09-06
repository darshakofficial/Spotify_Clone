import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../../utils/serverHelpers";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ProfileButton = ({ active, redirectText, onClick }) => {
  const [userData, setUserData] = useState({});
  const [firstNameData, setFirstNameData] = useState(" ");
  const [lastNameData, setLastNameData] = useState(" ");

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/auth/get/userData");
      setUserData(response.data);
      // console.log(response.data);
      setFirstNameData(response.data.firstName);
      setLastNameData(response.data.lastName);
    };
    getData();
  }, []);

  return (
    <Link to={redirectText}>
      <div
        className={`${
          active ? "text-white" : "text-black"
        } font-semibold font-size-22`}
        onClick={onClick}
      >
        {firstNameData[0] + lastNameData[0]}
      </div>
    </Link>
  );
};

export default ProfileButton;
