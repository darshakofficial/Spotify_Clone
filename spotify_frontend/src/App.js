import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import "./output.css";
import LoginComponent from "./routes/Login";
import SignupComponent from "./routes/Signup";
import LoggedInHomeComponent from "./routes/LoggedInHome";
import Library from "./routes/Library";
import UploadSong from "./routes/UploadSong";
import MyMusic from "./routes/MyMusic";
import SearchPage from "./routes/SearchPage";
import SinglePlaylistView from "./routes/SinglePlaylistView";
import songContext from "./contexts/songContext";
import LikedSong from "./routes/LikedSong";
import Download from "./routes/Download";
import Premium from "./routes/Premium";
import Support from "./routes/Support";
import Profile from "./routes/Profile";

import { useState } from "react";

function App() {
  const [cookie, setCookie] = useCookies(["token"]);

  const [currentSong, setCurrentSong] = useState(null);
  const [soundPlayed, setSoundPlayed] = useState(null);
  const [isPaused, setIsPaused] = useState(true);
  const [likeButton, setLikeButton] = useState(false);

  // console.log(cookie.token);

  return (
    <div className="w-screen h-screen font-poppins">
      <BrowserRouter>
        {cookie.token ? (
          <songContext.Provider
            value={{
              currentSong,
              setCurrentSong,
              soundPlayed,
              setSoundPlayed,
              isPaused,
              setIsPaused,
              likeButton,
              setLikeButton,
            }}
          >
            <Routes>
              {/* logged in routes */}
              {/* <Route path="/" element={<div>Hello</div>} /> */}
              <Route path="/home" element={<LoggedInHomeComponent />} />
              <Route path="/uploadSong" element={<UploadSong />} />
              <Route path="/myMusic" element={<MyMusic />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<Library />} />
              <Route path="/likedSong" element={<LikedSong />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/download" element={<Download />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/support" element={<Support />} />
              <Route
                path="/playlist/:playlistId"
                element={<SinglePlaylistView />}
              />
              <Route path="*" element={<Navigate to="/home" />} />
            </Routes>
          </songContext.Provider>
        ) : (
          <Routes>
            {/* without log in (logged out) routes */}
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/signup" element={<SignupComponent />} />
            {/* <Route path="/home" element={<HomeComponent />} /> */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
