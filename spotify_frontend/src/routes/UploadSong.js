import { Icon } from "@iconify/react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import spotify_logo from "../assets/images/spotify_logo_white.svg";
import CloudinaryUpload from "../component/shared/CloudinaryUpload";
import IconText from "../component/shared/IconText";
import TextInput from "../component/shared/TextInput";
import TextWithHover from "../component/shared/TextWithHover";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

const UploadSong = () => {
  const [name, setName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [uploadedSongFileName, setUploadedSongFileName] = useState();

  const navigate = useNavigate();

  const submitSong = async () => {
    const data = { name, thumbnail, track: playlistUrl };

    const response = await makeAuthenticatedPOSTRequest("/song/create", data);

    if (response.err) {
      alert("Cloud not create song.");
      return;
    }

    alert("Success");

    navigate("/home");
  };

  return (
    <LoggedInContainer curActiveScreen={"uploadSong"}>
      <div className="text-white text-2xl pb-4 pl-2 font-semibold pt-8">
        Upload Your Music
      </div>

      <div className="pt-5 pl-2">
        <div className="w-2/3 flex space-x-3">
          <div className="w-1/2">
            <TextInput
              label={"Name"}
              placeholder={"Name"}
              labelClassName={"text-white"}
              value={name}
              setValue={setName}
            />
          </div>
          <div className="w-1/2">
            <TextInput
              label={"Thumbnail"}
              placeholder={"Thumbnail"}
              labelClassName={"text-white"}
              value={thumbnail}
              setValue={setThumbnail}
            />
          </div>
        </div>
        <div className="py-5 w-full">
          {uploadedSongFileName ? (
            <div className="bg-white rounded-full p-3 w-1/3">
              {uploadedSongFileName.substring(0, 45)}...
            </div>
          ) : (
            <CloudinaryUpload
              setUrl={setPlaylistUrl}
              setName={setUploadedSongFileName}
            />
          )}
        </div>
        <div
          className="bg-white w-1/6 flex items-center justify-center p-3 rounded-full cursor-pointer font-semibold"
          onClick={submitSong}
        >
          Submit Song
        </div>
      </div>
    </LoggedInContainer>
  );
};

export default UploadSong;
