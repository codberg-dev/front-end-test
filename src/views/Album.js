import React, { useEffect, useState } from 'react'
import { fetchSpotifyAPI } from '../api/spotify'

import styled from 'styled-components'

const AlbumLoadStatus = styled.div`
    /* display: flex; flex-direction: column;
    justify-content: center; */
    display: flex; justify-content: center;
    & > img{width: 100px;}
`


function Album() {

    const [album, setAlbum] = useState([])
    const [country, setCountry] = useState('KR')

    const [moreAlbumURL, setMoreAlbumURL] = useState(null)

    const [isLoading, setIsLoading] = useState(true)
    const [isAllLoaded, setIsAllLoaded] = useState(false)

    
    const getAlbumData = async (endpoint) => {

        const url = '' + endpoint

        try {
            const data = await fetchSpotifyAPI(url, "GET");
            console.log(data)

            const albumData = data.albums.items
            const nextAlbumData = data.albums.next
    
            const concatData = [...album, ...albumData]
    
            setAlbum(concatData)
            setMoreAlbumURL(nextAlbumData)

            return nextAlbumData

        } catch (error) {
            
            console.error(error)
        }
        



    }

    // 앨범 요청하기
    useEffect(() => {

        getAlbumData(`https://api.spotify.com/v1/browse/new-releases?country=${country}`)

        setIsAllLoaded(false)
        setIsLoading(true)

    }, [country])

    useEffect(() => {
        // 스크롤 이벤트 핸들러 정의
        const handleScroll = () => {
            
            const viewPort = window.innerHeight // 현재 브라우저 100vh의 높이
            const nowScroll =  document.documentElement.scrollTop // 얼마나 스크롤을 내렸는지? (100vh부분 부터 시작함)
            const fullHeight = document.documentElement.offsetHeight // 문서의 전체 높이

            // console.log(viewPort + nowScroll)
            // console.log(fullHeight)
            // console.log('')

            // 오차 범위 5%..
            if ((viewPort + nowScroll) >= fullHeight * 0.95) {

                setIsLoading(true)

                // 두번 이상 연속으로 들어오기 방지
                window.removeEventListener('scroll', handleScroll);

                console.log('스크롤 끝 : ' + moreAlbumURL)

                getAlbumData(moreAlbumURL).then((nextAlbumData) => {
                    setIsLoading(false)

                    if (nextAlbumData === null) {
                        setIsAllLoaded(true)
                    }

                })
            }
        };
    
        // 이벤트 리스너 추가
        window.addEventListener('scroll', handleScroll);
    
        // 컴포넌트 언마운트 시 이벤트 리스너 제거
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [moreAlbumURL]);
    
                
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

                {
                    <AlbumLoadStatus>
                            {isLoading && <img src='/loading.gif'></img>}
                            {isAllLoaded && '마지막 데이터입니다....'}
                    </AlbumLoadStatus>
                }

            </ul>
    </div>
  )
}

export default Album