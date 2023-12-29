import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

const Container = styled.div`
    width: 100%;
`

const Wrapper = styled.div`
    max-width: 1280px;
    margin: 0 auto;
    padding-left: 20px;
    padding-right: 20px;
`

const Title = styled.h1`
    font-size: 30px;
    padding-top: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid ${(props)=>(props.theme.colors.inputBorder)};
`

const Select = styled.div`
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    p{
        margin-right: 10px;
    }
`

function AlbumList() {

    const [newReleases,setNewReleases] = useState([]);
    const [selectCountry, setSelectCountry] = useState('KR');
    const [isLoading,setIsLoading] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');
        
    useEffect(() => {

        const getNewRelease = async () => {
            
            setIsLoading(true);
            setErrorMsg('')

            try {
                const authResponse = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': `Basic ${btoa(process.env.REACT_APP_CLIENT_ID + ":" + process.env.REACT_APP_CLIENT_SECRET)}`
                    }
                });
        
                const { access_token } = authResponse.data;
        
                const res = await axios.get(`https://api.spotify.com/v1/browse/new-releases?country=${selectCountry}&offset=0&limit=20`, {
                    headers: {
                        'Authorization': `Bearer ${access_token}`
                    }
                });
        
                setNewReleases(res.data.albums.items);
            } catch (error) {
                setErrorMsg("새 앨범을 불러오는 중 오류가 발생하였습니다.")
                console.log(error);
            }

            setIsLoading(false);
        };
      
        getNewRelease();
      }, [selectCountry]);

    return (
        <>
            <Container>
                <Wrapper>
                    <Title>새 앨범 리스트 🎧</Title>
                    <Select>
                        <p>국가 선택</p>
                        <select value={selectCountry} onChange={(e)=>{setSelectCountry(e.target.value)}}>
                            <option value="KR">한국</option>
                            <option value="US">미국</option>
                            <option value="SE">스웨덴</option>
                        </select>
                    </Select>
                    {
                        isLoading ? <p>로딩중 ... </p>
                        : 
                        errorMsg ? <p>{errorMsg}</p>
                        :
                        <>
                            <ul>
                                {
                                    newReleases.map((e,i)=>{

                                        const imageUrl = e.images[0] && e.images[0].url;
                                        // const imageHeight = e.images[0] && e.images[0].height;
                                        // const imageWidth = e.images[0] && e.images[0].width;

                                        return(
                                            // <li key={e.id}>
                                            <React.Fragment key={i}>
                                                <li>
                                                    <img src={imageUrl} height={200} width={200} alt={e.name} />
                                                </li>
                                                <li>
                                                    {e.name}
                                                </li>
                                            </React.Fragment>
                                        )
                                    })
                                }
                            </ul>
                        </>
                    }
                </Wrapper>
            </Container>
        </>
  )
}

export default AlbumList