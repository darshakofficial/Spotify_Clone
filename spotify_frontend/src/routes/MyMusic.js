import { useState, useEffect } from "react";
import React from "react";

import SingleSongCard from "../component/shared/SingleSongCard";

import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import LoggedInContainer from "../containers/LoggedInContainer";

const songData = [
  {
    thumbnail:
      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29uZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60",
    name: "Curtains",
    artist: "Ed Sheeran",
  },
];

const MyMusic = () => {
  const [songData, setSongData] = useState([]);
  const [likedSongData, setLikedSongData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const userData = await makeAuthenticatedGETRequest(
        "/like/get/userData"
      );
      // console.log(userData.data.likedSongs);
      setLikedSongData(userData.data.likedSongs);
      
      const response = await makeAuthenticatedGETRequest("/song/get/mysongs");
      // console.log(response.data);
      setSongData(response.data);

    };

    getData();
  }, [likedSongData]);

  const compareSongs = (songId) => {
    return likedSongData.includes(songId);
  }

  return (
    <LoggedInContainer curActiveScreen={"myMusic"} >
      <div className="text-white text-2xl pb-4 pl-2 font-semibold pt-8">
        My Songs
      </div>
      <div className="space-y-2 ">
        {songData.map((item) => {          
          return (            
            <SingleSongCard info={item} playSound={() => {}} liked={compareSongs(item._id)} />
          );
        })}
      </div>
    </LoggedInContainer>
  );
};

export default MyMusic;
