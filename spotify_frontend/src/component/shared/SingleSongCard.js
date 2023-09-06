import { useContext, useState } from "react";
import songContext from "../../contexts/songContext";
import { Icon } from "@iconify/react";
import { makeAuthenticatedPOSTRequest } from "../../utils/serverHelpers";
//import { flif } from "@cloudinary/url-gen/qualifiers/format";

const SingleSongCard = ({ info, playSound, liked }) => {
  const { currentSong, setCurrentSong, likeButton, setLikeButton } =
    useContext(songContext);

  // like song

  const likeHandler = async () => {
    const songId = info._id;

    const playload = { songId };

    const response = await makeAuthenticatedPOSTRequest(
      "/like/add/likedSong",
      playload
    );

    if (currentSong) {
      if (info._id === currentSong._id) {
        setLikeButton(true);
      }
    }

    //liked = true;
  };

  // unlike song

  const unLikeHandler = async () => {
    const songId = info._id;

    const playload = { songId };

    const response = await makeAuthenticatedPOSTRequest(
      "/like/remove/likedSong",
      playload
    );

    if (currentSong) {
      if (info._id === currentSong._id) {
        setLikeButton(false);
      }
    }

    //liked = false;
  };

  return (
    <div className="flex intem-center justify-between p-2 w-full hover:bg-gray-400 hover:bg-opacity-20">
      <div
        className="flex w-full items-center p-1 justify-between rounded-sm"
        onClick={() => {
          setCurrentSong(info);
          {
            liked ? setLikeButton(true) : setLikeButton(false);
          }
        }}
      >
        <div
          className="w-12 h-12 bg-cover bg-center"
          style={{
            backgroundImage: `url("${info.thumbnail}")`,
          }}
        ></div>
        <div className="flex w-full">
          <div className="text-white w-5/6 flex flex-col justify-center pl-4 space-y-1.5">
            <div className="hover:underline cursor-pointer">{info.name}</div>
            <div className="text-xs text-gray-400 hover:underline cursor-pointer hover:text-white">
              {info.artist.firstName + " " + info.artist.lastName}
            </div>
          </div>
          <div className="w-1/6 flex items-center justify-center text-gray-400 ">
            <div></div>
          </div>
        </div>
      </div>
      <div className="w-1/10 flex items-center justify-start p-2 text-gray-400 ">
        <div>
          {liked ? (
            <Icon
              icon="fluent:heart-16-filled"
              fontSize={25}
              className="cursor-pointer text-green-500 hover:text-white"
              onClick={() => {
                unLikeHandler();
              }}
            />
          ) : (
            <Icon
              icon="tabler:heart"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                likeHandler();
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleSongCard;
