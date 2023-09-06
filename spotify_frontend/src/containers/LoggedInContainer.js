import { Icon } from "@iconify/react";
import { Howl, Howler } from "howler";
import { useState, useContext, useLayoutEffect, useRef } from "react";

import spotify_logo from "../assets/images/spotify_logo_white.svg";
import IconText from "../component/shared/IconText";
import TextWithHover from "../component/shared/TextWithHover";
import songContext from "../contexts/songContext";
import CreatePlayListModel from "../models/CreatePlaylistModel";
import AddToPlayListModel from "../models/AddToPlaylistModel";
import LikeButton from "../component/shared/LikeButton";
import UploadSong from "../routes/UploadSong";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelpers";
import ProfileButton from "../component/shared/ProfileButton";
import { useNavigate } from "react-router-dom";

const LoggedInContainer = ({ children, curActiveScreen }) => {
  // const [soundPlayed, setSoundPlayed] = useState(null);
  // const [isPaused, setIsPaused] = useState(true);

  const [CreatePlayListModelOpen, setCreatePlayListModelOpen] = useState(false);
  const [addToPlayListModelOpen, setAddToPlayListModelOpen] = useState(false);
  // const [likedSong, setLikedSong] = useState(false);

  const {
    currentSong,
    setCurrentSong,
    soundPlayed,
    setSoundPlayed,
    isPaused,
    setIsPaused,
    likeButton,
    setLikeButton,
  } = useContext(songContext);

  const firstUpdate = useRef(true);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    if (!currentSong) {
      return;
    }

    changeSong(currentSong.track);
  }, [currentSong && currentSong.track]);

  const addSongToPlaylist = async (playlistId) => {
    const songId = currentSong._id;

    const playload = { playlistId, songId };

    const response = await makeAuthenticatedPOSTRequest(
      "/playlist/add/song",
      playload
    );
    if (response) {
      setAddToPlayListModelOpen(false);
    }
  };

  const playSound = () => {
    if (!soundPlayed) {
      return;
    }
    soundPlayed.play();
  };

  const changeSong = (songSrc) => {
    if (soundPlayed) {
      soundPlayed.stop();
    }

    let sound = new Howl({
      src: [songSrc],
      html5: true,
    });

    setSoundPlayed(sound);
    sound.play();
    setIsPaused(false);
  };

  const pauseSound = () => {
    soundPlayed.pause();
  };

  const togglePlayPause = () => {
    if (isPaused) {
      playSound(currentSong.track);
      setIsPaused(false);
    } else {
      pauseSound();
      setIsPaused(true);
    }
  };

  return (
    <div className="h-full w-full bg-app-black">
      {CreatePlayListModelOpen && (
        <CreatePlayListModel
          closeModel={() => {
            setCreatePlayListModelOpen(false);
          }}
        />
      )}

      {addToPlayListModelOpen && (
        <AddToPlayListModel
          closeModel={() => {
            setAddToPlayListModelOpen(false);
          }}
          addSongToPlaylist={addSongToPlaylist}
        />
      )}

      <div className={`${currentSong ? "h-9/10" : "h-full"} w-full flex`}>
        {/* sidebar */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          <div>
            <div className="logoDiv p-6" onClick={()=>{navigate("/home");}}>
              <img src={spotify_logo} alt="spotify logo" width={125} />
            </div>
            <div className="py-2">
              <IconText
                iconName={"material-symbols:home"}
                displayText={"Home"}
                targetLink={"/home"}
                active={curActiveScreen === "home"}
              />

              <IconText
                iconName={"mingcute:search-line"}
                displayText={"Search"}
                targetLink={"/search"}
                active={curActiveScreen === "search"}
              />
              <IconText
                iconName={"solar:music-library-2-line-duotone"}
                displayText={"Library"}
                targetLink={"/library"}
                active={curActiveScreen === "library"}
              />
              <IconText
                iconName={"mdi:music-box"}
                displayText={"My Songs"}
                targetLink={"/myMusic"}
                active={curActiveScreen === "myMusic"}
              />
            </div>

            <div className="pt-4">
              <IconText
                iconName={"icon-park-solid:add"}
                displayText={"Create Playlist"}
                onClick={() => {
                  setCreatePlayListModelOpen(true);
                }}
              />
              <IconText
                iconName={"bxs:heart-square"}
                displayText={"Liked Songs"}
                targetLink={"/likedSong"}
                active={curActiveScreen === "likedSong"}
              />
            </div>
          </div>
          <div className="px-5">
            <div className="border border-gray-100 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center cursor-pointer hover:border-white">
              <Icon icon="pajamas:earth" />
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>

        {/* right area */}
        <div className="h-full w-4/5 bg-app-black overflow-auto">
          {/* navbar */}
          <div className="navbar w-full h-1/10 bg-black bg-opacity-40 flex items-center justify-end">
            <div className="w-1/2 h-full flex">
              <div className="w-2/3 h-full flex items-center justify-around">
                <TextWithHover displayText={"Premium"} redirectText={"/premium"} active={curActiveScreen==="premium"} />
                <TextWithHover displayText={"Support"} redirectText={"/support"} active={curActiveScreen==="support"} />
                <TextWithHover displayText={"Download"} redirectText={"/download"} active={curActiveScreen==="download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-1/3 h-full flex items-center justify-around ">
                <TextWithHover displayText={"Upload Song"} redirectText={"/uploadSong"} active={curActiveScreen==="uploadSong"}/>
                <div className="bg-green-500 h-10 w-10 cursor-pointer flex items-center justify-center rounded-full font-semibold">
                  <ProfileButton redirectText={"/profile"} active={curActiveScreen==="profile"} />
                </div>
              </div>
            </div>
          </div>

          {/* main content */}
          <div className="content p-8 pt-0 overflow-auto">{children}</div>
        </div>
      </div>

      {/* player ui */}
      {currentSong && (
        <div className="w-full h-1/10 bg-black bg-opacity-30 text-white flex items-center px-4 overflow-hidden">
          <div className="w-1/4 flex items-center">
            <img
              src={currentSong.thumbnail}
              alt="currentThumbnail"
              className="h-12 w-12 rounded"
            />
            <div className="pl-4 space-y-1">
              <div className="text-sm hover:underline cursor-pointer">
                {currentSong.name}
              </div>
              <div className="text-xs hover:underline cursor-pointer hover:text-white text-gray-500">
                {currentSong.artist.firstName +
                  " " +
                  currentSong.artist.lastName}
              </div>
            </div>
          </div>
          <div className="w-1/2 h-full flex flex-col justify-center items-center">
            <div className="flex w-1/3 justify-between items-center">
              <Icon
                icon="ph:shuffle-bold"
                fontSize={20}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="mingcute:skip-previous-fill"
                fontSize={20}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon={
                  isPaused ? "heroicons-solid:play" : "heroicons-solid:pause"
                }
                fontSize={50}
                className="cursor-pointer text-gray-500 hover:text-white"
                onClick={togglePlayPause}
              />
              <Icon
                icon="mingcute:skip-previous-fill"
                rotate={2}
                fontSize={20}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
              <Icon
                icon="iconamoon:playlist-repeat-list-fill"
                fontSize={20}
                className="cursor-pointer text-gray-500 hover:text-white"
              />
            </div>
            {/* <div>Hello</div> */}
          </div>
          <div className="w-1/4 flex justify-end pr-4 space-x-2 items-center">
            <Icon
              icon="ic:round-playlist-add"
              fontSize={30}
              className="cursor-pointer text-gray-500 hover:text-white"
              onClick={() => {
                setAddToPlayListModelOpen(true);
              }}
            />
            <LikeButton />
            {/* <Icon
              icon="tabler:heart"
              fontSize={25}
              className="cursor-pointer text-gray-500 hover:text-white"
            /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoggedInContainer;
