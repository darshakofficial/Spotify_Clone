import { Icon } from "@iconify/react";
import { useContext } from "react";
import songContext from "../../contexts/songContext";
import { makeAuthenticatedPOSTRequest } from "../../utils/serverHelpers";
import { useEffect } from "react";

const LikeButton = () => {
  const { currentSong, setCurrentSong, likeButton, setLikeButton } =
    useContext(songContext);

    // useEffect(()=>{},[likeButton]);

  // like song

  const likeHandler = async () => {
    const songId = currentSong._id;

    const playload = { songId };

    const response = await makeAuthenticatedPOSTRequest(
      "/like/add/likedSong",
      playload
    );

    if (response) {
      setLikeButton(true);
    }
  };

  // unlike song

  const unLikeHandler = async () => {
    const songId = currentSong._id;

    const playload = { songId };

    const response = await makeAuthenticatedPOSTRequest(
      "/like/remove/likedSong",
      playload
    );

    if (response) {
      setLikeButton(false);
    }
  };

  return (
    <>
      {likeButton ? (
        <Icon
          icon="fluent:heart-16-filled"
          fontSize={25}
          className="cursor-pointer text-green-500 hover:text-white"
          onClick={() => unLikeHandler()}
        />
      ) : (
        <Icon
          icon="tabler:heart"
          fontSize={25}
          className="cursor-pointer text-gray-500 hover:text-white"
          onClick={() => likeHandler()}
        />
      )}
    </>
  );
};

export default LikeButton;
