import './App.css';
import { useState } from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState("");
    const [artist, setArtist] = useState("");
    const [url, setUrl] = useState("");
    const [image, setImage] = useState("");
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");

    async function getTrack() {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer BQDCatdHit-UbHbqj45nvjbKbPNwRGbxs_3P-xrjb83BPQPHS2WP3MhuCXv18WiP1ybiZxnK903QkooKrB7v2MKJ4F2SsCm6M8MRI1x813Z1k5btu9pqZpfwTKaSeKo5ydPWS8G-pxCOfyBumBRp");
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
        const year = Math.floor(1900 + Math.random() * 100).toString();
        const result = await fetch(`https://api.spotify.com/v1/search?q=year:${year}+genre:${genre}&type=track`, requestOptions);
        const data = await result.json();
        const items = data["tracks"]["items"];
        console.log(items.length);
        if (items.length === 0) {
            console.log("here");
            getTrack();
        }
        const offset = Math.floor(Math.random() * items.length);
        const trackObject = items[offset];
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
        </div>
    );
}

export default App;