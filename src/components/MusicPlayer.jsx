import React, { useState, useEffect } from "react";
import AddMusic from "./AddMusic";
import AudioPlayer from "./AudioPlayer";

const MusicPlayer = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

 
  useEffect(() => {
    const storedPlaylist = localStorage.getItem("playlist");
    if (storedPlaylist) {
      setPlaylist(JSON.parse(storedPlaylist));
    }

    const storedCurrentSongIndex = localStorage.getItem("currentSongIndex");
    if (storedCurrentSongIndex) {
      setCurrentSongIndex(parseInt(storedCurrentSongIndex));
    }

    const storedIsPlaying = localStorage.getItem("isPlaying");
    if (storedIsPlaying) {
      setIsPlaying(JSON.parse(storedIsPlaying));
    }

    const storedCurrentTime = localStorage.getItem("currentTime");
    if (storedCurrentTime) {
      setCurrentTime(parseFloat(storedCurrentTime));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("playlist", JSON.stringify(playlist));
    localStorage.setItem("currentSongIndex", currentSongIndex);
    localStorage.setItem("isPlaying", isPlaying);
    localStorage.setItem("currentTime", currentTime);
  }, [playlist, currentSongIndex, isPlaying, currentTime]);

 const handleFileChange = (files) => {
  const newPlaylist = files.map((file) => ({
    name: file.name,
    url: URL.createObjectURL(file),
  }));
  setPlaylist((prevPlaylist) => [...prevPlaylist, ...newPlaylist]); 
  localStorage.setItem("playlist", JSON.stringify([...playlist, ...newPlaylist])); 
};

const handleDrop = (files) => {
  const newPlaylist = files.map((file) => ({
    name: file.name,
    url: URL.createObjectURL(file),
  }));
  setPlaylist((prevPlaylist) => [...prevPlaylist, ...newPlaylist]); 
  localStorage.setItem("playlist", JSON.stringify([...playlist, ...newPlaylist])); 
};


  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const removeSong = (indexToRemove) => {
    setPlaylist(prevPlaylist => prevPlaylist.filter((song, index) => index !== indexToRemove));
  };

  return (
    <div className="w-full min-h-screen flex flex-col-reverse items-center justify-center gap-10">
      <AddMusic
        handleFileChange={handleFileChange}
        handleDrop={handleDrop}
        handleDragOver={handleDragOver}
        playlist={playlist}
        playSong={setCurrentSongIndex}
        removeSong={removeSong}
      />
      {playlist.length > 0 && (
        <AudioPlayer
          playlist={playlist}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          currentTime={currentTime}
          setCurrentTime={setCurrentTime}
        />
      )}
    </div>
  );
};

export default MusicPlayer;
