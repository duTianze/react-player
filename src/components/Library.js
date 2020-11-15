import React from 'react'
import LibrarySong from "./LibrarySong";

const Library = ({songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus, currentSong}) => {
	return (
			<div className={`library ${libraryStatus ? "active-library" : ""}`}>
				<h2>Library</h2>
				<div className="library-songs">
					{songs.map(song => (
							<LibrarySong
									setCurrentSong={setCurrentSong}
									song={song}
									key={song.id}
									audioRef={audioRef}
									isPlaying={isPlaying}
							/>
					))}
				</div>
			</div>
	);
}

export default Library;
