import {myApiKeyRef as myApiKey} from "./refrences.js";

async function getChannelDetail(channelId) {

  let channelDetails = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${myApiKey}`);
  channelDetails = await channelDetails.json();

  let channelBanner = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${myApiKey}`);
  channelBanner = await channelBanner.json();
  if(channelBanner.items[0].brandingSettings.image!==undefined){
    channelBanner = channelBanner.items[0].brandingSettings.image.bannerExternalUrl;
    return [channelDetails, channelBanner];
  }else{
    return [channelDetails];
  }
// console.log(channelBanner)
};



async function getVideoTabVideosByChannelId(channelId , maxResult=20,pageToken) {
 
    let channelVideoTabVideos = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=${maxResult}${pageToken==null|| pageToken== undefined ?"":"&pageToken=" + pageToken}`);
  channelVideoTabVideos = await channelVideoTabVideos.json();
  let token = channelVideoTabVideos.nextPageToken;
  // console.log("channel id:" + channelId +"videossss" , channelVideoTabVideos)
  return [channelVideoTabVideos,token];
};



export const getChannelDetailRef = getChannelDetail;
export const getVideoTabVideosByChannelIdRef = getVideoTabVideosByChannelId;
