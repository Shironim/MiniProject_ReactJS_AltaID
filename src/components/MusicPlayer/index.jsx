import React from 'react'
import ProgressBar from "react-bootstrap/ProgressBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackwardStep, faForwardStep, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons'
const MusicPlayer = () => {
  const now = 40;
  return (
    <div className='w-100 mt-5 d-flex justify-content-center'>
      <div className='w-50'>
        <div className="d-flex justify-content-center align-items-center mb-5">
          <FontAwesomeIcon className="icons px-4 fa-2x" icon={faShuffle} />
          <FontAwesomeIcon className="icons px-4 fa-2x" icon={faBackwardStep} />
          <FontAwesomeIcon className="icons px-4 fa-3x" icon={faPlay} />
          <FontAwesomeIcon className="icons px-4 fa-2x" icon={faForwardStep} />
          <FontAwesomeIcon className="icons px-4 fa-2x" icon={faRepeat} />
        </div>
        <div >
          <ProgressBar style={{ height: "0.75rem" }} now={now} label={`${now}%`} visuallyHidden />
        </div>
      </div>
    </div>
  )
}
export default MusicPlayer;