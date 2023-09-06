import { useState, useEffect } from "react";

import SingleSongCard from "../component/shared/SingleSongCard";

import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";



const LikedSong = () => {
  const [songData, setSongData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await makeAuthenticatedGETRequest(
        "/like/get/likedSongs"
      );
      // console.log(response.data);

      setSongData(response.data);
    };

    getData();
  }, [songData]);

  return (
    <LoggedInContainer curActiveScreen={"likedSong"}>
      <div className="text-white text-2xl pb-4 pl-2 font-semibold pt-8">
        Liked Songs
      </div>
      <div className="space-y-2">
        {songData.map((likedSongData) => {
          return likedSongData.likedSongs.map((item) => {
            return <SingleSongCard info={item} playSound={() => {}} liked={true} />;
          });
        })}
      </div>
    </LoggedInContainer>
  );
};

export default LikedSong;
