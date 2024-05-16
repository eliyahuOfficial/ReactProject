import { useEffect, useState } from "react";
import { BsSpotify } from "react-icons/bs";
import styles from "./Spotify.module.scss";
import { CiUser } from "react-icons/ci";



interface Artist {
    id: string;
    name: string;
    images: { url: string }[];
    popularity: number;
    genres: string[];
    followers?: {
        total: number;
    };
    external_urls?: {
        spotify: string;
    };

}

const CLIENT_ID = "ad480927f3114de4879a36c65923d570";
const CLIENT_SECRET = "2fda8e88679b457186b92ab667f99f44";

const Spotify = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState<Artist[]>([]);
    const [accessToken, setAccessToken] = useState("");

    useEffect(() => {
        const authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET
        };

        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => {
                setAccessToken(data.access_token);
                fetchInitialData(data.access_token);
            })
            .catch(error => console.error('Error fetching token:', error));
    }, []);

    const fetchInitialData = (accessToken: string) => {
        fetch(`https://api.spotify.com/v1/search?q=metallica&type=artist`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => setSearchResults(data.artists.items))
            .catch(error => console.error('Error fetching initial data:', error));
    };

    const handleInputChange = (event: { target: { value: string; }; }) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = () => {
        fetch(`https://api.spotify.com/v1/search?q=${searchInput}&type=artist`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(data => setSearchResults(data.artists.items))
            .catch(error => console.error('Error fetching search results:', error));
    };

    const handleKeyPress = (event: { key: string; }) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div>
            <div className={styles.container}>
                <input
                    className={`${styles.inp}`}
                    placeholder="Search For Artist"
                    type="input"
                    value={searchInput}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                />
                <button
                    className={`${styles.btn}`}
                    onClick={handleSearch}>Search</button>
            </div>

            <div className={`${styles.results}`}>
                {searchResults.map(artist => (
                    <div key={artist.id} className={`${styles.cr} bg-stone-200 dark:bg-slate-500`}>
                        {artist.images.length > 0 ? (
                            <img className={`${styles.ai}`} src={artist.images[0].url} alt={artist.name} />
                        ) : (
                            <div className={`${styles.ai} ${styles["no-image"]}`} >
                                <CiUser
                                    className="mx-auto w-auto size-28  mt-12" />
                            </div>


                        )}
                        <div className={`${styles.bi}  dark:text-white`}>
                            <h2>{artist.name}</h2>
                            <p>Popularity: {artist.popularity}</p>
                            <p>Genres: {artist.genres.join(', ')}</p>

                            {artist.followers && (
                                <p>Followers: {artist.followers.total}</p>
                            )}

                            {artist.external_urls && (
                                <div className={styles["spotify-link"]}>
                                    <a href={artist.external_urls.spotify}><BsSpotify /> </a>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Spotify;