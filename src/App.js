import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [track, setTrack] = useState();
    const [artist, setArtist] = useState();
    const [url, setUrl] = useState();
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
    var randGenre = genres[Math.floor(Math.random() * genres.length)];
    var randYear = Math.floor(1900 + Math.random() * 100).toString();

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer BQC5UKdKZR26AwffLw6S0a883i-lAUq0B9fF0wl-OCWeATN4FNjSLeaAaiDjz0pKeoJ7wovRQM2KpGzD1HHuwch3deUUspuBNd_IdPLBDCyD0BCl98gRKUsdhPx-nXNJ_fUJ8IOy-jrB9ZCBiY70");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        const getTrack = async (randGenre, randYear) => {
            const result = await fetch(`https://api.spotify.com/v1/search?q=year:${randYear}+genre:${randGenre}&type=track`, requestOptions);
            const data = await result.json();
            const trackObject = data["tracks"]["items"][0];
            setTrack(trackObject["name"]);
            setArtist(trackObject["artists"][0]["name"]);
            setUrl(trackObject["external_urls"]["spotify"]);
            setIsLoading(false);
            console.log(data);
        };
        getTrack(randGenre, randYear);
    }, []);

    return (
        <div className="App">
            <header className="App-header">
                {isLoading && <p>Loading...</p>}
                {!isLoading &&
                    <div>
                        <h1>Your track is:</h1>
                        <a href={url}>{track}</a>
                        <p>by</p>
                        <h3>{artist}</h3>
                        <p>It's a {randGenre} track from {randYear}</p>
                    </div>
                }
            </header>
        </div>
    );
}

export default App;