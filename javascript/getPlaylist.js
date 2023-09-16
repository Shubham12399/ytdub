import {myApiKeyRef as myApiKey} from "./refrences.js";

async function getPlaylistsByChannelId(channelId , maxResult=10,pageToken){
  let playlists = await fetch(`https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=${channelId}&key=${myApiKey}&maxResults=${maxResult}${pageToken==null?"":"&pageToken=" + pageToken}`);
  playlists = await playlists.json();
  let token = playlists.nextPageToken;
  console.log("token lists",token)
  console.log("playlists",playlists)
  return [playlists , token];
};
async function getPlaylistVideosByPlaylistId(playlistId , maxResult=10,pageToken){
  let playlistVideos = await fetch(`https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&key=${myApiKey}&maxResults=${maxResult}${pageToken==null?"":"&pageToken=" + pageToken}`);
  playlistVideos = await playlistVideos.json();
  let token = playlistVideos.nextPageToken;
  // console.log("PLAYLIST VIDEOS", playlistVideos)
  return [playlistVideos,token];
};
export const getPlaylistVideosByPlaylistIdRef = getPlaylistVideosByPlaylistId;
export default getPlaylistsByChannelId;