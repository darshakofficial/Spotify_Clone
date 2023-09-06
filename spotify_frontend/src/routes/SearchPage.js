import { Icon } from "@iconify/react";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useState, useEffect } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../component/shared/SingleSongCard";

const SearchPage = () => {
  const [searchText, setSearchText] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [songData, setSongData] = useState([]);
  const [likedSongData, setLikedSongData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const userData = await makeAuthenticatedGETRequest("/like/get/userData");
      // console.log(userData.data.likedSongs);
      setLikedSongData(userData.data.likedSongs);
    };

    getData();
  }, [likedSongData]);

  const searchSong = async () => {
    const response = await makeAuthenticatedGETRequest(
      "/song/get/songname/" + searchText
    );
    setSongData(response.data);
  };

  const compareSongs = (songId) => {
    return likedSongData.includes(songId);
  };

  return (
    <LoggedInContainer curActiveScreen="search">
      <div className="w-full py-6">
        <div
          className={`w-1/3 p-3 text-white text-sm rounded-full bg-gray-800 px-5 flex items-center space-x-2 ${
            isInputFocused ? "border border-white" : ""
          }`}
        >
          <Icon icon="mingcute:search-line" className="text-lg" />

          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="w-full bg-gray-800 focus:outline-none"
            onFocus={() => {
              setIsInputFocused(true);
            }}
            onBlur={() => {
              setIsInputFocused(false);
            }}
            value={searchText}
            onChange={(event) => {
              setSearchText(event.target.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                searchSong();
              }
            }}
          />
        </div>
        {songData.length > 0 ? (
          <div className="pt-10 space-y-3">
            <div className="text-white">
              Showing search result for "
              <span className="font-semibold">{searchText}</span>"
            </div>
            {songData.map((item) => {
              return (
                <SingleSongCard
                  info={item}
                  key={JSON.stringify(item)}
                  playSound={() => {}}
                  liked={compareSongs(item._id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-gray-400 pt-10 ">Nothing to show here.</div>
        )}
      </div>
    </LoggedInContainer>
  );
};

export default SearchPage;
