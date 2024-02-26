/* eslint-disable react/prop-types */
import { FileAudio, ListMusic, Trash } from "lucide-react";
import React from "react";

const AddMusic = ({
  handleFileChange,
  handleDrop,
  handleDragOver,
  playlist,
  playSong,
  removeSong,
}) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <label
        className="flex flex-col items-center px-4 py-6 bg-gray-200 text-gray-700 rounded-lg shadow-lg tracking-wide uppercase cursor-pointer border-2 border-gray-400 hover:border-gray-500 w-80"
        onDrop={(e) => {
          e.preventDefault();
          handleDrop(Array.from(e.dataTransfer.files));
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <FileAudio />
        <span className="mt-2 text-sm leading-normal">
          {playlist.length ? "Add more songs to Playlist" : "Choose a file"}
        </span>
        <input
          type="file"
          accept="audio/*"
          className="hidden"
          onChange={(e) => handleFileChange(Array.from(e.target.files))}
        />
      </label>
      <ul className=" text-xl bg-slate-200 rounded-lg p-2 w-80 border-2 border-gray-400 overflow-y-scroll max-h-80 ">
        <ListMusic className=" h-6 w-6"/>
        {playlist.map((song, index) => (
          <li
            key={index}
            className="flex justify-between items-center cursor-pointer bg-slate-300 my-2 rounded-lg p-2 hover:bg-slate-400 w-full text-wrap  truncate"
          >
          <button onClick={() => removeSong(index)} className="mr-2 bg-slate-200 p-2 rounded-lg hover:bg-red-300" >
          <Trash size={20} />
          </button>
          <span onClick={() => playSong(index)}>{song.name}</span>  
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddMusic;
