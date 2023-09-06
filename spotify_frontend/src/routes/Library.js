import { useState, useEffect } from "react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import { useNavigate } from "react-router-dom";

const Library = () => {
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylist(response.data);
    };

    getData();
  }, []);

  return (
    <LoggedInContainer curActiveScreen={"library"}>
      <div className="text-white text-2xl pb-3 pl-2 font-semibold pt-8">
        My Playlists
      </div>

      <div className="pl-1 py-5 grid gap-5 grid-cols-5">
        {myPlaylist.map((item) => {
          return (
            <Card
              title={item.name}
              description={""}
              imgUrl={item.thumbnail}
              playlistId={item._id}
            />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

const Card = ({ title, description, imgUrl, playlistId }) => {
  const navigate = useNavigate();
  return (
    <div
      className="bg-black bg-opacity-40 w-full p-4 rounded-lg cursor-pointer"
      onClick={() => {
        navigate("/playlist/" + playlistId);
      }}
    >
      <div className="pb-4 pt-2 ">
        <img className="w-full rounded-md" src={imgUrl} alt="Playlist" />
      </div>
      <div className="text-white py-3 font-semibold">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default Library;
