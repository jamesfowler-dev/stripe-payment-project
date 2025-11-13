// Audio player
const playlistId = "3FbHJwXJGHkpWx08bmnsHB";

<iframe
    title="Spotify Embed: Recommendation Playlist "
    src={`https://open.spotify.com/embed/playlist/3FbHJwXJGHkpWx08bmnsHB?utm_source=generator&theme=0`}
    width="100%"
    height="100%"
    style={{ minHeight: "360px" }}
    frameBorder="0"
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
/>;

// Authorization token
const token =
    "BQAZXdxP8YLzhAEH060YqZfQF9Kt3KI5QQwCyfcXxQ14Gl5jkNLHPC6MEzpB3oVL6QcKLnb_y3k541oahert7hqhMOrgez3CQvnHzor1t3DSCqHFwe1NolpHlzdvBHrt6MGmTC74Hj07EYwndcsmd03lSsSDKTx2hhnmz9eZ2wOzCqxgAtisOZTH0MNIg14-FZ2MPPHJx7YUkBdIzQ4T2g5D0NSIvvMRnGWLZSF-0Xvi7EXRVrJS6FITCX1AQ2RtSQprmYwocA0bhPJffhV5QR9TPUcSMtK8zkMFcZNR";
async function fetchWebApi(endpoint, method, body) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: JSON.stringify(body),
    });
    return await res.json();
}

const tracksUri = [
    "spotify:track/7KhKuLpIPo2prZ8e3SwJ6o",
    "spotify:track:63wTGn8fPkzFYr8X4ImcH1",
    "spotify:track:3hEJfV4ur3VHFWxDtVuFZk",
    "spotify:track:5inuQrr5vhHugdhop7hwcC",
    "spotify:track:5Wl7F31B6qyJMCCxvlIUX8",
];

async function createPlaylist(tracksUri) {
    const { id: user_id } = await fetchWebApi("v1/me", "GET");

    const playlist = await fetchWebApi(
        `v1/users/${user_id}/playlists`,
        "POST",
        {
            name: "My top tracks playlist",
            description:
                "Playlist created by the tutorial on developer.spotify.com",
            public: false,
        }
    );

    await fetchWebApi(
        `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(",")}`,
        "POST"
    );

    return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);
