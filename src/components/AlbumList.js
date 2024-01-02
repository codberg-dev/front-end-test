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

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    ul{
        flex-basis: 24%;
        padding-bottom: 20px;
        @media (max-width: 767px) {
            flex-basis: 100%;
        }
        @media (min-width: 768px) and (max-width: 1023px) {
            flex-basis: 49%;
        }
        img{
            width: 100%;
        }
    }
`

const PaginationWrap = styled.div`
    margin: 20px 0;
    display: flex;
    justify-content: center;
    column-gap: 10px;
`

const Pagination = styled.button`
    background-color: ${(props) => (props.$active ? '#c3c3c3' : '#fff')};
    color: ${(props) => (props.$active ? '#fff' : '#000')};
    padding: 4px 9px;
    border-radius: 30px;
    border: 1px solid ${(props)=>(props.$active ? '#c3c3c3' : '#fff')};
    cursor: pointer;
`

function AlbumList() {

    const [newReleases,setNewReleases] = useState([]);
    const [selectCountry, setSelectCountry] = useState('KR');
    const [isLoading,setIsLoading] = useState(false);
    const [errorMsg,setErrorMsg] = useState('');

    const [page,setPage] = useState(1); //현재 보여지는 페이지 숫자 , 처음은 1페이지
    const totalCnt = 100 //총 개시물 개수
    const pageRange = 8; //페이지당 보여줄 게시물 수
    const btnRange = 5; //보여질 페이지 버튼의 개수 btnRange
    const offset = (page - 1) * pageRange;

    const startPage = Math.floor((page - 1)/btnRange) * btnRange + 1; //현재 보여질 버튼의 첫번째 수
    const lastPage = Math.ceil(totalCnt / pageRange);
    const endPage = Math.min(lastPage,startPage + btnRange - 1)
    // Math.min 두 값중 더 작은 값을 endPage로 설정
    
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
        
                const res = await axios.get(`https://api.spotify.com/v1/browse/new-releases?country=${selectCountry}&offset=${offset}&limit=${pageRange}`, {
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

      }, [selectCountry,page]);

      const prevPage = () => {
        setPage(page - 1)
      }

      const nextPage = () => {
        setPage(page + 1)
      }

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
                        <Content>
                            {
                                newReleases.map((e,i)=>{

                                    const imageUrl = e.images[0] && e.images[0].url;
                                    // const imageHeight = e.images[0] && e.images[0].height;
                                    // const imageWidth = e.images[0] && e.images[0].width;

                                    return(
                                        // <li key={e.id}>
                                        <ul key={i}>
                                            <li>
                                                <img src={imageUrl} alt={e.name} />
                                                <p>제목 : {e.name}</p>
                                                <p>가수 : {e.artists[0].name}</p>
                                            </li>
                                        </ul>
                                    )
                                })
                            }
                        </Content>
                    }

                    {/* 페이지네이션 시작 */}
                    <PaginationWrap>
                        {
                            page > 1 &&
                            <Pagination onClick={prevPage}>&lt;</Pagination>
                        }
                        {
                            Array(endPage - startPage + 1).fill(null).map((_,i)=>{
                                const pageNum = startPage + i
                                return(
                                    <Pagination $active={page === pageNum} key={pageNum} onClick={()=>{setPage(pageNum)}}>{pageNum}</Pagination>
                                )
                            })
                        }
                        {
                            page < lastPage &&
                            <Pagination onClick={nextPage}>&gt;</Pagination>
                        }
                    </PaginationWrap>
                    {/* 페이지네이션 끝 */}
                </Wrapper>
            </Container>
        </>
  )
}

export default AlbumList