import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";

const AddToPlayListModel = ({ closeModel, addSongToPlaylist }) => {
  const [myPlaylist, setMyPlaylist] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest("/playlist/get/me");
      setMyPlaylist(response.data);
      // console.log(response.data);
    };

    getData();
  }, []);

  return (
    <div
      className="absolute bg-black bg-opacity-50 w-screen h-screen flex justify-center items-center"
      onClick={closeModel}
    >
      <div
        className="bg-app-black w-1/3 rounded-md p-8"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="text-white mb-5 font-semibold text-lg">
          Select Playlist
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          {myPlaylist.map((item) => {
            return <PlaylistListComponent info={item} addSongToPlaylist={addSongToPlaylist} />;
          })}
        </div>
      </div>
    </div>
  );
};

const PlaylistListComponent = ({ info, addSongToPlaylist }) => {
  return (
    <div className="bg-app-black flex w-full items-center space-x-3 hover:bg-gray-400 hover:bg-opacity-20 cursor-pointer p-2" onClick={()=>{addSongToPlaylist(info._id)}}>
      <div>
        <img src={info.thumbnail} className="w-10 h-10 rounded" alt="thumbnail" />
      </div>
      <div className="text-white font-medium">{info.name}</div>
    </div>
  );
};

export default AddToPlayListModel;
