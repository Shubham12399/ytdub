import {myApiKeyRef as myApiKey} from "./refrences.js";


const getCommentsByVideoId = async (videoId , numberOfRequests , pageToken) => {
     let comments = await fetch(`https://www.googleapis.com/youtube/v3/commentThreads?key=${myApiKey}&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=${numberOfRequests}${pageToken==null?"":"&pageToken=" + pageToken}`);
     comments = await comments.json();
     let nextPageToken = comments.nextPageToken;
     return [comments,nextPageToken];
}

export default getCommentsByVideoId;