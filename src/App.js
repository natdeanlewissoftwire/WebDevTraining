import './App.css';
import { useState } from "react";
import {Scopes, SpotifyAuth} from "react-spotify-auth";
import 'react-spotify-auth/dist/index.css'

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState("");
    const [artist, setArtist] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [token, setToken] = useState("");


    async function getTrack() {
        var randomWords = require('random-words');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        console.log(token);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        const genres = [
            "acoustic",
            "afrobeat",
            "alt-rock",
            "alternative",
            "ambient",
            "anime",
            "black-metal",
            "bluegrass",
            "blues",
            "bossanova",
            "brazil",
            "breakbeat",
            "british",
            "cantopop",
            "chicago-house",
            "children",
            "chill",
            "classical",
            "club",
            "comedy",
            "country",
            "dance",
            "dancehall",
            "death-metal",
            "deep-house",
            "detroit-techno",
            "disco",
            "disney",
            "drum-and-bass",
            "dub",
            "dubstep",
            "edm",
            "electro",
            "electronic",
            "emo",
            "folk",
            "forro",
            "french",
            "funk",
            "garage",
            "german",
            "gospel",
            "goth",
            "grindcore",
            "groove",
            "grunge",
            "guitar",
            "happy",
            "hard-rock",
            "hardcore",
            "hardstyle",
            "heavy-metal",
            "hip-hop",
            "holidays",
            "honky-tonk",
            "house",
            "idm",
            "indian",
            "indie",
            "indie-pop",
            "industrial",
            "iranian",
            "j-dance",
            "j-idol",
            "j-pop",
            "j-rock",
            "jazz",
            "k-pop",
            "kids",
            "latin",
            "latino",
            "malay",
            "mandopop",
            "metal",
            "metal-misc",
            "metalcore",
            "minimal-techno",
            "movies",
            "mpb",
            "new-age",
            "new-release",
            "opera",
            "pagode",
            "party",
            "philippines-opm",
            "piano",
            "pop",
            "pop-film",
            "post-dubstep",
            "power-pop",
            "progressive-house",
            "psych-rock",
            "punk",
            "punk-rock",
            "r-n-b",
            "rainy-day",
            "reggae",
            "reggaeton",
            "road-trip",
            "rock",
            "rock-n-roll",
            "rockabilly",
            "romance",
            "sad",
            "salsa",
            "samba",
            "sertanejo",
            "show-tunes",
            "singer-songwriter",
            "ska",
            "sleep",
            "songwriter",
            "soul",
            "soundtracks",
            "spanish",
            "study",
            "summer",
            "swedish",
            "synth-pop",
            "tango",
            "techno",
            "trance",
            "trip-hop",
            "turkish",
            "work-out",
            "world-music"
        ];
        const genre = genres[Math.floor(Math.random() * genres.length)];
        const year = Math.floor(1922 + Math.random() * 100).toString();
        const randomWord = randomWords();
        const result = await fetch(`https://api.spotify.com/v1/search?q=${randomWord}%20genre:${genre}%20&type=track`, requestOptions);
        const data = await result.json();
        const items = data["tracks"]["items"];
        if (items.length === 0) {
            return getTrack();
        }
        const trackObject = items[0];
        setTrack(trackObject["name"]);
        setArtist(trackObject["artists"][0]["name"]);
        setUrl(trackObject["external_urls"]["spotify"]);
        setImage(trackObject["album"]["images"][0]["url"])
        setIsLoading(false);
        setGenre(genre);
        setYear(trackObject["album"]["release_date"].substring(0, 4));
        console.log(genre, year, trackObject);
    }

    return (
        <div className="App">
                {token ? (
                    <header className="App-header">
                        <h1>Assistant for Random* Spotify Exploration</h1>
                        <button onClick={getTrack}>Get a random* track</button>
                        {isLoading}
                        {!isLoading &&
                            <div>

                                <h3>Your random* track is:</h3>
                                <a href={url}>
                                    <p>{track}</p>
                                    <img src={image} width="500" alt={""}/>
                                </a>
                                <p>by <b>{artist}</b></p>

                                <p>It's a {genre} track from {year}</p>
                            </div>
                        }
                        <p>* (ish)</p>
                    </header>
                ) : (
                    <SpotifyAuth
                        redirectUri='http://localhost:3000/callback'
                        clientID='2b199a20fc5e449f8d965379c1644014'
                        scopes={[Scopes.userReadPrivate, Scopes.userReadEmail]}
                        onAccessToken={(token) => setToken(token)}
                    />
                )}

        </div>
    );
}

export default App;