import React, {useEffect, useRef, useState} from "react";
import "./styles/app.scss"
import Song from "./components/Song";
import Player from "./components/Player";
import data from "./data";
import Library from "./components/Library";
import Nav from "./components/Nav"

function App() {
	const audioRef = useRef(null);
	const [songs, setSongs] = useState(data());
	const [currentSong, setCurrentSong] = useState(songs[0]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [libraryStatus, setLibraryStatus] = useState(false);
	useEffect(() => {
		const newSongs = songs.map((song) => {
			if (song.id === currentSong.id) {
				return {
					...song,
					active: true,
				};
			} else {
				return {
					...song,
					active: false,
				};
			}
		});
		setSongs(newSongs);
	}, [currentSong, songs]);

	return (
			<div className="App">
				<Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>
                <Song currentSong={currentSong} />
                <Player isPlaying={isPlaying}
                        setIsPlaying={setIsPlaying}
                        currentSong={currentSong}
                        audioRef={audioRef}
                        songs={songs}
                        setCurrentSong={setCurrentSong}
                        setSongs={setSongs}
                />
                <Library
		                songs={songs}
		                setCurrentSong={setCurrentSong}
		                audioRef={audioRef}
		                isPlaying={isPlaying}
		                setSongs={setSongs}
		                libraryStatus={libraryStatus}
		                currentSong={currentSong}
                />
			</div>
	);
}

export default App;
