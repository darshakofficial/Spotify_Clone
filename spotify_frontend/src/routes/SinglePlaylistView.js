import { useParams } from "react-router-dom";
import LoggedInContainer from "../containers/LoggedInContainer";
import { useEffect, useState } from "react";
import { makeAuthenticatedGETRequest } from "../utils/serverHelpers";
import SingleSongCard from "../component/shared/SingleSongCard";

const SinglePlaylistView = () => {
  const { playlistId } = useParams();
  const [playlistDetails, setPlaylistDetails] = useState({});
  const [likedSongData, setLikedSongData] = useState([]);

  useEffect(() => {
    const getData = async () => {

      const userData = await makeAuthenticatedGETRequest(
        "/like/get/userData"
      );
      // console.log(userData.data.likedSongs);
      setLikedSongData(userData.data.likedSongs);

      const response = await makeAuthenticatedGETRequest(
        "/playlist/get/playlist/" + playlistId
      );
      setPlaylistDetails(response);
      
    };

    getData();
  }, [likedSongData]);

  const compareSongs = (songId) => {
    return likedSongData.includes(songId);
  }


  return (
    <>
      <LoggedInContainer curActiveScreen={"home"} >
        {playlistDetails._id && (
          <div>
            <div className="text-white text-2xl pb-3 pl-2 font-semibold pt-8">
              {playlistDetails.name}
            </div>
            <div className="pt-10 space-y-3 ">
              {playlistDetails.songs.map((item) => {
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
          </div>
        )}
      </LoggedInContainer>
    </>
  );
};

export default SinglePlaylistView;
