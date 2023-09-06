import TextInput from "../component/shared/TextInput";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";

const CreatePlayListModel = ({ closeModel }) => {
  const [playlistName, setPlaylistName] = useState("");
  const [playlistThumbnail, setPlaylistThumbnail] = useState("");

  const createPlaylist = async () => {
    const response = await makeAuthenticatedPOSTRequest("/playlist/create", {
      name: playlistName,
      thumbnail: playlistThumbnail,
      songs: [],
    });

    if (response._id) {
      closeModel();
    }
  };

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
          Create Playlist
        </div>
        <div className="space-y-4 flex flex-col justify-center items-center">
          <TextInput
            label={"Name"}
            placeholder={"Playlist Name"}
            labelClassName={"text-white"}
            value={playlistName}
            setValue={setPlaylistName}
          />
          <TextInput
            label={"Thumbnail"}
            placeholder={"Thumbnail"}
            labelClassName={"text-white"}
            value={playlistThumbnail}
            setValue={setPlaylistThumbnail}
          />
          <div
            className="bg-white w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-5 cursor-pointer"
            onClick={createPlaylist}
          >
            Create
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePlayListModel;
