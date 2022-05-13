import './App.css';

function App() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer BQBJWUDM7RKI5N7Jdb87ROaSWnsQh-PW1NLGWUcNdUwTu7-_7nsW_0eW1bg3ENYDYiDqA1A_qoTt1X_Q716tsE3bXXEnWZiQ9w-RMJIaH7Qzlc-8jxuTwsRsXWUVIyi23MVdxsvUqG93CAGxigej");

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    var latestArtist = fetch("https://api.spotify.com/v1/browse/new-releases", requestOptions)
        .then(response => response.json())
        .then(data => data["albums"]["items"][0]["artists"][0]["name"])
        .catch(error => console.log('error', error));

    console.log(latestArtist);

    return (
        <div className="App">
            <header className="App-header">
                <h1>New release by:</h1>
                <p>latestArtist</p>
            </header>
        </div>
    );
}

export default App;
