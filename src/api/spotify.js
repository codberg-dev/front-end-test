


export async function fetchSpotifyAPI(url, method) {

    // 토큰부터 구하기

    const getTokenURL = 'https://accounts.spotify.com/api/token'

    const clientID = '5f65c98beef8469a8d770aa0d2703073'
    const clientSecret = '62475a8522f44d7ca25920654e713f6c'
    
    const body = `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`;

    const getToken = await fetch(getTokenURL, {
        method: 'POST', headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }, body: body
    })

    const tokenJson = await getToken.json()
    const token = tokenJson.access_token;

    // 구한 토큰으로 본격적으로 fetch

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method: method
    });

    return await res.json();
}
