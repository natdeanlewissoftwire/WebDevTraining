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
        var access_token;
        var client_id = '2b199a20fc5e449f8d965379c1644014';
        var client_secret = 'f40c7e472ac24c3c838240c6c7d58c3a';
        var refresh_token = "Bearer AQCtRYnPNKyMLF7LKh_101lDIPJerNeV2Mm9km50UlJ5cHKG1GYVzeKEzGwwP1xxehNH6HImllJ43QxQXPMrd1u4TPDCfD7Ai8d3RYM1Feh1AriiuhtK1gTcyv1XkjU87us";
        var authHeaders = new Headers();
        authHeaders.append('Authorization', 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')));
        var authOptions = {
            url: 'https://accounts.spotify.com/api/token',
            method: 'POST',
            headers: authHeaders,
            form: {
                grant_type: 'refresh_token',
                refresh_token: refresh_token
            },
            json: true
        };

        const authResponse = await (await fetch(authOptions.url, authOptions)).json();
        access_token = authResponse['access_token'];

        //     , function(error, response, body) {
        //     if (!error && response.statusCode === 200) {
        //         access_token = body.access_token;
        //     }
        // });


        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${access_token}`);

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
        const result = await fetch(`https://api.spotify.com/v1/search?q=year:${year}%20genre:${genre}&type=track`, requestOptions);
        const data = await result.json();
        const items = data["tracks"]["items"];
        console.log(items.length);
        if (items.length === 0) {
            return await getTrack();
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