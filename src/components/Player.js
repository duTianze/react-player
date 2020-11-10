import React from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPlay, faVolumeDown} from "@fortawesome/free-solid-svg-icons";

const Player = () => {
	return (
			<div>
				<FontAwesomeIcon icon={faAngleLeft} size="2x" />
				<FontAwesomeIcon icon={faPlay} size="2x" />
				<FontAwesomeIcon icon={faAngleRight} size="2x" />
				<FontAwesomeIcon icon={faVolumeDown}/>
			</div>
	);
};

export default Player;
