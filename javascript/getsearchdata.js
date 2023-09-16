import {myApiKeyRef as myApiKey} from './refrences.js';

const getSearchData = async (query,numberOfRequests , pageToken) => {
    let searchData = await fetch(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${numberOfRequests}&q=${query}&key=${myApiKey}${pageToken==null?"":"&pageToken=" + pageToken}`);

    searchData = await searchData.json();
    let nextPageToken = searchData.nextPageToken;
    return [searchData,nextPageToken];
};

export const getSearchDataRef = getSearchData;