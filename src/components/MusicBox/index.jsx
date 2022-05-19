import React, { useRef, useState } from 'react'
import MusicPlayer from '../MusicPlayer';
import CardMusic from '../CardMusic';

const MusicBox = ({ songs }) => {
  const audioRef = useRef(null);
  // const songs = useSelector((state) => (state.songs.songs));
  const [currentSong, setCurrentSong] = useState(songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
  });

  const updateTimeHandler = (e) => {
    const currentTime = e.target.currentTime;
    const duration = e.target.duration;
    setSongInfo({ ...songInfo, currentTime, duration });
  };

  const songEndHandler = async () => {
    let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    let nextSong = songs[(currentIndex + 1)];
    await setCurrentSong(nextSong);

    if (isPlaying) {
      audioRef.current.play();
    }
  };
  return (
    <>
      <CardMusic
        currentSong={currentSong}
        songs={songs}
      />
      <MusicPlayer
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        audioRef={audioRef}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
      />
      <audio
        onLoadedMetadata={updateTimeHandler}
        onTimeUpdate={updateTimeHandler}
        onEnded={songEndHandler}
        ref={audioRef}
        src={currentSong.audio}
      />
    </>
  )
}


export default MusicBox;
