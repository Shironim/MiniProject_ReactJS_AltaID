import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackwardStep, faForwardStep, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

import styled from "styled-components";

const MusicPlayer = ({ isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo, currentSong, setCurrentSong, songs }) => {

  useEffect(() => {
    console.log(currentSong);
  }, [currentSong])
  // Event handlers
  const playSongHandler = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(!isPlaying);
    } else {
      audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
    // console.log('klik');
  };
  const togglePlayPauseIcon = () => {
    if (isPlaying) {
      return faPause;
    } else {
      return faPlay;
    }
  };
  const skipTrackHandler = async (direction) => {
    let currentIndex = songs.findIndex((song) => song.id_musik === currentSong.id_musik);
    // console.log(currentIndex);
    if (direction === "forward") {
      await setCurrentSong(songs[(currentIndex + 1)]);
    } else if (direction === "back") {
      if ((currentIndex - 1) % songs.length === -1) {
        await setCurrentSong(songs[songs.length - 1]);
      } else {
        await setCurrentSong(songs[(currentIndex - 1)]);
      }
    }
    if (isPlaying) {
      audioRef.current.play();
    }
  };
  const getTime = (time) => {
    let minute = Math.floor(time / 60);
    let second = ("0" + Math.floor(time % 60)).slice(-2);
    return `${minute}:${second}`;
  };
  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value;
    setSongInfo({ ...songInfo, currentTime: e.target.value });
  };
  return (
    <div className='w-100 d-flex justify-content-center'>
      <div className='w-50'>
        <div className="d-flex justify-content-center align-items-center mb-3">
          <FontAwesomeIcon onClick={() => skipTrackHandler('back')} className="icons px-4" icon={faBackwardStep} />
          <FontAwesomeIcon onClick={playSongHandler} className="icons px-4 fa-2x" icon={togglePlayPauseIcon()} />
          <FontAwesomeIcon onClick={() => skipTrackHandler('forward')} className="icons px-4" icon={faForwardStep} />
        </div>
        <div className='d-flex align-items-center'>
          <p className='mb-0'>{getTime(songInfo.currentTime || 0)}</p>
          <Track currentSong={currentSong}>
            <Input
              onChange={dragHandler}
              min={0}
              max={songInfo.duration || 0}
              value={songInfo.currentTime}
              type="range"
            />
            <AnimateTrack songInfo={songInfo}></AnimateTrack>
          </Track>
          <p className='mb-0'>{getTime(songInfo.duration || 0)}</p>
        </div>
      </div>
    </div>
  )
}
const Track = styled.div`
	background: lightblue;
  margin: 0 16px;
	width: 100%;
	height: 1rem;
	position: relative;
	border-radius: 1rem;
	overflow: hidden;
	background: linear-gradient(to right, blue, green);
`;
const AnimateTrack = styled.div`
	background: rgb(204, 204, 204);
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;
	transform: translateX(${(a) => Math.round((a.songInfo.currentTime * 100) / a.songInfo.duration) + "%"});
	pointer-events: none;
`;

const Input = styled.input`
	width: 100%;
	-webkit-appearance: none;
	background: transparent;
	cursor: pointer;
	/* padding-top: 1rem;
	padding-bottom: 1rem; */
	&:focus {
		outline: none;
		-webkit-appearance: none;
	}
	@media screen and (max-width: 768px) {
		&::-webkit-slider-thumb {
			height: 48px;
			width: 48px;
		}
	}
	&::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 16px;
		width: 16px;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-ms-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
	&::-moz-range-thumb {
		-webkit-appearance: none;
		background: transparent;
		border: none;
	}
`;
export default MusicPlayer;