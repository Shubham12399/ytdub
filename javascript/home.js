import { videosApi } from "../videosApi/videos.js";
import getVideoData from "./getVideos.js";
import {getChannelDetailRef as getChannelDetail} from "./getchanneldetail.js";
import { getVideoDetailByVideoIdRef as getVideoDetailByVideoId } from "./getVideos.js";
import getDuration from './videoDuration.js';
const postCon = Array.from(document.querySelectorAll(".post-container"));
const homePage = document.querySelector(".post-container");
const mainHomePage = document.getElementById("main-home-page");

let nextToken = "";
let scrollTrigger = false;
const sendVideoRequest = async  function(numberOfRequests=9,token=null){
  let div = document.createElement("div");
  div.setAttribute("class" , `w-full mt-8 bg-gray-600 flex items-center justify-center loader`);
  div.insertAdjacentHTML("afterbegin" , `<img src="../icon-svgs/Rolling-0.8s-200px.svg" />`);
  homePage.appendChild(div);
 let [videos , nextPageToken] =  await getVideoData(numberOfRequests,token);
//  mainHomePage.innerHTML="";


 showVideo(videos);
 nextToken = nextPageToken;


} // getting videos list
sendVideoRequest();

async function channelDetails(channelId) {
  // mainHomePage.innerHTML="Loading....";
  let channelData = await getChannelDetail(channelId);
  let logo = channelData[0].items[0].snippet.thumbnails.medium.url;

  return logo;
}; // getting channel logo


getVideoData(10,null);

function showVideo(data) {
  data.items.map(async (videoObj,index) => {

    let scaleton = `
    <div class="w-full sm:m-0 lg:m-0 mb-3 sm:mb-6 post-item sceleton-div">
    <div class="w-full h-[230px] object-fill p-2 sm:p-0 pb-0 bg-gray-300 relative overflow-hidden">
    
   
  </div>

  <div class="px-3 sm:px-0 py-2 pb-3 sm:py-2 flex items-start justify-between video-details">
    <div class="flex items-start">
    
      <div class="ml-4">
        <h2
          class=" w-full bg-gray-300 h-8 mb-4">
        </h2>
        <p class="w-full bg-gray-300 h-4 mb-1">
        
        </p>
        <p class="w-full bg-gray-300 h-4">
        </p>
      </div>
    </div>
    <i class="material-symbols-rounded mt-2 text-xl ml-3">more_vert</i>
  </div>
    </div>
    `
    ;
    // postCon[0].insertAdjacentHTML("afterbegin",scaleton);

    // mainHomePage.innerHTML="Loading....";
    let videoStatisticsRef = await getVideoDetailByVideoId(videoObj.id.videoId);

    let videoStatistics = videoStatisticsRef.items[0].statistics;
    let codedDuration = videoStatisticsRef.items[0].contentDetails.duration;
    let duration = getDuration(codedDuration);
    // console.log(videoStatistics)
    let thumbnail = videoObj.snippet.thumbnails.medium.url;
    let title = videoObj.snippet.title;
    let channelTitle = videoObj.snippet.channelTitle;
    let logo = await channelDetails(videoObj.snippet.channelId);
    document.querySelectorAll(".loader").forEach((e)=>{
      e.style.display="none";
    })
    scrollTrigger=true;

    const classList = `w-full sm:m-0 mb-3 sm:mb-6 post-item home-post-item show-hover-video-comp `;
    
    const parentDiv = document.createElement("div");

    parentDiv.setAttribute("class", classList);
    parentDiv.addEventListener(
      "click",
      function () {
        // alert("hwllo")
        // localStorage.setItem("videoObj" , JSON.stringify(videoObj));
        // window.location.pathname =`/pages/video.html?videoId=${videoObj.id.videoId}`;
        window.location.href =`./pages/video.html?videoId=${videoObj.id.videoId}`;
        // window.location.path =`/pages/video.html?videoId=${videoObj.id.videoId}`;
        
      },
      false
    );
    // mainHomePage.innerHTML="";
    // postCon[0].removeChild(document.querySelectorAll(".sceleton-div")[index]);
    parentDiv.insertAdjacentHTML(
      "afterbegin",
      `<div class="w-full bg-none object-fill sm:p-0 pb-0 relative overflow-hidden" style="height:auto">
    <img src="../thumbnails/video-placeholder-blank.svg" class=" w-full overflow-hidden" class="home-item-img"/>
    <div class="text-white  rounded-sm  absolute bottom-0 right-0 z-50 " style="position:absolute; background:rgba(0,0,0,0.7);padding:2px 5px;font-size:.7rem; right:10px; bottom:10px;">
    ${duration}
    </div>
    <div class="absolute z-[1000] -right-full p-1 video-comp" style="top:3px">
    <svg class="bg-black p-1" width="24" height="24" focusable="false" style="pointer-events:none;display:block;width:30px;height:100%;filter:invert(1) ; background:white" viewBox="0 0 24 24">
  <path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"/>
</svg>
<svg class=" mt-1 p-1" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 100%;filter:invert(1) ; background:white"><path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"/></svg>
1
    </div>
  </div>

  <div class="px-3 sm:px-0 py-2 pb-3 sm:py-2 flex items-start justify-between video-details">
    <div class="flex items-start">
    <a class="channel-logo rounded-full overflow-hidden block" 
    href="./pages/profile.html?channelId=${videoObj.snippet.channelId}"
    >
    <img
      class=""
      src="${logo}"
    />
  </a>
      <div class="ml-4">
        <h2
          class="text-black text-sm max-h-10 font-medium sm:text-base sm:max-h-12 text-overflow overflow-hidden">
          ${title}
        </h2>
        <p class="text-gray-700 text-xs mt-1">
         ${channelTitle}
        </p>
        <p class="text-gray-700 text-xs mt-1">
          ${Math.round(videoStatistics.viewCount / 1000 * 10)}k views - 2 days ago
        </p>
      </div>
    </div>
    <i class="material-symbols-rounded mt-2 text-xl ml-3">more_vert</i>
  </div>`
    );
    postCon[0].appendChild(parentDiv);
    parentDiv.querySelector("img").setAttribute("src" ,thumbnail);
     
    // let videoDetails = getEachVideoDetails(videoObj);
    // console.log(videoDetails)
  });
}

// setVideoContent();
// setVideoContent();




// get total playlist of the channel 

// 1. https://youtube.googleapis.com/youtube/v3/playlists?channelId=UCWdnZ4Whvgo_1mKJSl48emA&key=[YOUR_API_KEY]  -- -----  floppppp


// https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCBkNpeyvBO2TdPGVC_PsPUA&key={YOUR_API_KEY}



//  https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCPzqyqw2SFjU24g0aN_5CzQ&key=AIzaSyCVsaSzHZJ5MGo_K4CARzXtqHjel0hkBQI



// successfull getting all playlist of channel using channel id -
// https://youtube.googleapis.com/youtube/v3/playlists?part=snippet%2CcontentDetails&channelId=UCWdnZ4Whvgo_1mKJSl48emA&key=[YOUR_API_KEY] this will give me all playlists of channel with videos count



// successfully getting all videos of playlist Id (id inner of items array) 
// https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=PL2NreF6p66FMywC-kvHZbIroyPPbLBpZl&key=[YOUR_API_KEY]



mainHomePage.addEventListener("scroll" , function(){
  
  if (scrollTrigger && mainHomePage.scrollHeight < mainHomePage.scrollTop + 1000)
  {
    scrollTrigger=false;
    sendVideoRequest(9,nextToken);
    // console.log("triggered")
  }
//  console.log(mainHomePage.scrollHeight, mainHomePage.scrollTop + 700);
})