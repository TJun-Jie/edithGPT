"use client";
import React, { useState } from "react";

const SpotifyPlayerUI = ({ player }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  console.log(player);

  const togglePlayPause = () => {
    if (isPlaying) {
      player.pause();
    } else {
      player.resume();
    }
    setIsPlaying(!isPlaying);
  };

  const changeVolume = (event) => {
    const value = event.target.value;
    setVolume(value);
    player.setVolume(value);
  };

  return (
    <div className="p-4 bg-gray-800 text-white rounded-md">
      <div className="flex items-center justify-between">
        <button
          className="tw-p-2 tw-bg-green-500 tw-rounded tw-text-white"
          onClick={togglePlayPause}
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <div className="tw-flex tw-items-center">
          <span className="tw-mr-2">Volume:</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={changeVolume}
            className="tw-w-32"
          />
        </div>
      </div>
    </div>
  );
};

export default SpotifyPlayerUI;
