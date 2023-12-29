import React, { useEffect, useState } from 'react'
import { fetchSpotifyAPI } from '../api/spotify'

function Album() {

    const [album, setAlbum] = useState([])
    const [country, setCountry] = useState('KR')

    
    const getAlbumData = async (country) => {
        const url = `https://api.spotify.com/v1/browse/new-releases?country=${country}`
        const data = await fetchSpotifyAPI(url, "GET");
        const albumData = data.albums.items
        console.log(albumData)
        setAlbum(albumData);
    }

    useEffect(()=>{
        getAlbumData(country)
    }, [country])
    
  return (
    <div>
            <h1>새 앨범 사이소</h1>
            <select onChange={(e) => setCountry(e.target.value)}>
                <option value='KR'>한국</option>
                <option value='US'>미국</option>
                <option value='GB'>영국</option>
            </select>
            <ul>
                {
                    album.map((a) => {
                        return (
                            <li>
                                <div className='album-cover'>
                                    <img src={a.images[0] && a.images[0].url}></img>
                                </div>
                                <p className='album-info'>
                                    {a.name} - {
                                        a.artists.map((artist, index) => {
                                            if (index < a.artists.length - 1) {
                                                return artist.name + ', '
                                            } else {
                                                return artist.name
                                            }
                                        })
                                    }
                                </p>

                                
                            </li>
                        )
                    })
                }
            </ul>
    </div>
  )
}

export default Album