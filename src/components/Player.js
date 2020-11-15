import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleLeft, faAngleRight, faPause, faPlay} from "@fortawesome/free-solid-svg-icons";

const Player = ({isPlaying, setIsPlaying, currentSong, audioRef, songs, setCurrentSong, setSongs}) => {
	const [songInfo, setSongInfo] = useState({
		currentTime: 0,
		duration: 0,
		animationPercentage: 0,
	});
	const playSongHandler = () => {
		if (isPlaying) {
			audioRef.current.pause();
			setIsPlaying(!isPlaying);
		} else {
			audioRef.current.play();
			setIsPlaying(!isPlaying);
		}
	};
	const timeUpdateHandler = (e) => {
		const currentTime = e.target.currentTime;
		const duration = e.target.duration;
		const roundedCurrent = Math.round(currentTime);
		const roundedDuration = Math.round(duration);
		const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100);
		setSongInfo({...songInfo, currentTime : currentTime, duration : duration, animationPercentage: animationPercentage});
	};
	const getTime = (time) => {
		return (
				Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
		);
	};
	const dragHandler = (e) => {
		console.log(e.target)
		audioRef.current.currentTime = e.target.value;
		setSongInfo({...songInfo, currentTime : e.target.value});
	};
	const skipTrackHandler = async (direction) => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		if (direction === 'skip-forward') {
			currentIndex = (currentIndex + 1) % songs.length;
		} else if (direction === 'skip-back'){
			if ((currentIndex - 1) < 0) {
				currentIndex = currentIndex - 1 + songs.length;
			} else {
				currentIndex = currentIndex - 1
			}
		}
		await setCurrentSong(songs[currentIndex]);
		if (isPlaying) audioRef.current.play();
	};
	const trackAnim = {
		transform : `translateX(${songInfo.animationPercentage}%)`
	};
	const songEndHandler = async () => {
		let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
		await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
		if (isPlaying) audioRef.current.play();
	}
	return (
			<div className="player">
				<div className="time-control">
					<p>{getTime(songInfo.currentTime)}</p>
					<div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}}
					     className="track">
	                    <input
			                    min={0}
							    max={songInfo.duration || 0}
							    value={songInfo.currentTime}
							    onChange={dragHandler}
							    type="range"
					    />
						<div style={trackAnim} className="animate-track" />
					</div>
 					<p>{songInfo.duration ? getTime(songInfo.duration) : "0:00"}</p>
				</div>
				<div className="play-control">
					<FontAwesomeIcon
							onClick={() => skipTrackHandler('skip-back')}
							className="skip-forward"
							icon={faAngleLeft}
							size="2x"
					/>
					<FontAwesomeIcon
							onClick={playSongHandler}
							className="play"
							icon={isPlaying ? faPause : faPlay}
							size="2x"
					/>
					<FontAwesomeIcon
							onClick={() => skipTrackHandler('skip-forward')}

							className="skip-back"
							icon={faAngleRight}
							size="2x"
					/>
				</div>
				<audio
						onTimeUpdate={timeUpdateHandler}
						onLoadedMetadata={timeUpdateHandler}
						ref={audioRef}
						src={currentSong.audio}
						onEnded={songEndHandler}
				/>
			</div>
	);
};

export default Player;
