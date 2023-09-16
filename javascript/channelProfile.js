import { videosApi } from "../videosApi/videos.js";
import playlistsApi from "../playlistApi/playlistApi.js";
import getPlaylistsByChannelId from "./getPlaylist.js";
import { myApiKeyRef as myApiKey } from "./refrences.js";
import { channelIdRef as channelId } from "./refrences.js";
import { getChannelDetailRef as getChannelDetail } from "./getchanneldetail.js";
import { getVideoDetailByVideoIdRef as getVideoDetailByVideoId } from "./getVideos.js";
import { getVideoTabVideosByChannelIdRef as getVideoTabVideosByChannelId } from "./getchanneldetail.js";
import { getPlaylistVideosByPlaylistIdRef  } from "./getPlaylist.js";
import getDuration from "./videoDuration.js";
const channelStatus = document.querySelector("#channel-status");
const owlItems = Array.from(document.querySelectorAll(".owl-item"));
const channelTabs = Array.from(document.querySelectorAll(".channel-tab"));
const homeTabDataCon = document.querySelector("#home-tab-data-con");
const homeUploadsVideosCon = document.querySelector(".home-uploads-video-con");
const homeMostPopularVideoCon = document.querySelector(
  ".most-popular-video-con"
);
const videosTabDataCon = document.querySelector("#videos-tab-data-con");
const playlistTabDataCon = document.querySelector("#playlist-tab-data-con");
const channelBanner = document.querySelector("#channel-banner");
const channelStatusTitle = document.querySelector("#channel-st-name");
const profilePlaylistTab = document.querySelector("#profile-playlist-tab");
const channelProfileCon = document.querySelector("#channel-profile-con");
const channelStatusSubsDetail = document.querySelector(
  "#channel-st-subs-detail"
);
const channelStatusTotalVideos = document.querySelector(
  "#channel-st-total-videos"
);
const homeUploadsVideoCon = document.querySelector(
  ".home-uploads-video-con"
);
const homePlaylistVideoCon = document.querySelector(
  ".home-playlist-video-con"
);
const playVideoVideoTabCon = document.querySelector(
  ".video-tab-video-con"
);
// const 

const channelIdBySearchParams = window.location.search
  .split("")
  .splice(11, 34)
  .join("");
const channelStatusId = document.querySelector("#channel-st-id");
// alert(videosTabDataCon)
let nxtToken_first = "";    // use for get video tab video 
let nxtToken_second = "";   // use for getting playlists
let scrollTrigger_first = false;    // use for get video tab video 
let scrollTrigger_second = false;   // use for getting playlists

channelTabs.forEach((tab, index) => {
  tab.addEventListener("click", function () {
    channelTabs.forEach((elem) => {
      elem.style.borderBottom = "4px solid white ";
    });
    homeTabDataCon.style.marginLeft = `-${100 * index}%`;
    this.style.borderBottom = "4px solid rgb(55 65 81 / 1)";
    if (document.body.clientWidth >= 640) {
      document.querySelector(".page-con").scrollTop = 330;
    } else {
      document.querySelector(".page-con").scrollTop = 290;
    }
  });
});



function showChannelData(data, banner) {
  console.log("chanel data" , data)
  const channelLogo = document.querySelector("#channel-logo");
  const channelStatusDesc = document.querySelector("#channel-st-desc");
  const logo = data.items[0].snippet.thumbnails.medium;
  const title = data.items[0].snippet.title;
  const id = data.items[0].snippet.customUrl;
  const description = data.items[0].snippet.description;
  const country = data.items[0].snippet.country;
  const statistics = data.items[0].statistics;

  channelBanner.setAttribute("src", banner);
  channelLogo.src = logo.url;
  channelStatusTitle.textContent = title ;
  channelStatusSubsDetail.textContent = statistics.subscriberCount / 1000 + "k";
  channelStatusTotalVideos.textContent = statistics.videoCount + " videos";
  channelStatusDesc.textContent = description;
  channelStatusId.textContent = id;
  document.querySelector("#about-tab-paragraph").innerText = description;
  document.querySelector("#channel-total-view").innerText = statistics.viewCount + " views";
  document.querySelector("#channel-publish-at").innerText = "Joined " + data.items[0].snippet.publishedAt.split("T")[0];

}

const sendVideoRequest = async function (numberOfRequests=10,token=null) {
  
  let div = document.createElement("div");
  div.setAttribute("class" , `w-full h-14 flex items-center justify-center videoTabLoader`);
  div.insertAdjacentHTML("afterbegin" , `<img src="../icon-svgs/Rolling-0.8s-200px.svg" />`);
  videosTabDataCon.appendChild(div);
  let [videoTabVideos,nextPageToken] = await getVideoTabVideosByChannelId(
    channelIdBySearchParams,numberOfRequests,token
  );
  nxtToken_first = nextPageToken;
  document.querySelectorAll(".videoTabLoader").forEach((e)=>{
    e.style.display="none";
  })
  // console.log("dsdsfdsj" , videoTabVideos )
  // console.log("tttttt" , nextPageToken )
  showVideoTabVideos(videoTabVideos);
  // showChannelVideoTag(videoTabVideos);
};


sendVideoRequest();


async function getMostPopularVideosByChannelId(channelId) {
  homeMostPopularVideoCon.insertAdjacentHTML("beforeEnd",`<div class="w-full h-full flex items-center justify-center home-mostpop-tab-loader">
  <img src="../icon-svgs/Rolling-0.8s-200px.svg" />
  </div>`);
  let videoTabVideos = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=${channelId}&part=snippet%2Cid&order=date&chart=mostPopular&maxResults=50`
  );
  videoTabVideos = await videoTabVideos.json();
  console.log("most popular",videoTabVideos)
  if(videoTabVideos.items.length!==0){
    // document.querySelector(".home-mostpop-tab-loader").style.display="hidden";
    return videoTabVideos;
  }
  document.querySelector(".home-mostpop-tab-loader").style.display="none";
}

// async function channelApi(channelId) {
//   let res =
//     await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${myApiKey}
//     `);
//   res = await res.json();
//   let banner =
//     await fetch(`https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${channelId}&key=${myApiKey};
//   `);
//   // console.log(banner)
//   // banner = await banner.json();
//   showChannelData(res, banner.url);

//   // console.log(banner.url)
//   // console.log(res) ;
// }

// channelApi(JSON.parse(localStorage.getItem("videoObj")).snippet.channelId);

// async function getVideoData() {
//   let videoRes = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=${
//       JSON.parse(localStorage.getItem("videoObj")).snippet.channelId
//     }&part=snippet%2Cid&order=date&maxResults=50`
//   );
//   videoRes = await videoRes.json();
//   showVideo(videoRes);
// }
// getVideoData();

async function setchannelProfileBySearchParams(channelId) {
  if (!window.location.search == "") {
    channelProfileCon.insertAdjacentHTML(
      "afterBegin",
      `<div class="w-full h-full flex items-center justify-center profileloaderVideosCon">
    <img src="../icon-svgs/Rolling-0.8s-200px.svg" />
    </div>`
    );
    channelProfileCon.style.overflow = "hidden";
    let chDetail = await getChannelDetail(channelId);
    document.querySelector(".profileloaderVideosCon").style.display = "none";
    channelProfileCon.style.overflow = "auto";
    showChannelData(chDetail[0], chDetail[1]);
    // console.log(chDetail[0]);
  }
}

setchannelProfileBySearchParams(channelIdBySearchParams);

async function showChannelHomeVideo(mappingRef, callBackForVideo) {
  if(mappingRef==homeUploadsVideoCon){
    homeUploadsVideoCon.insertAdjacentHTML("beforeEnd",`<div class="w-full h-full flex items-center justify-center home-uploads-video-tab-loader">
  <img src="../icon-svgs/Rolling-0.8s-200px.svg" />
  </div>`);

  }
  let videos = [];
  if(mappingRef==homeUploadsVideoCon){
    [videos] = await callBackForVideo(channelIdBySearchParams);
  }else{
    videos = await callBackForVideo(channelIdBySearchParams);
  }
   
  // console.log("channel id" , channelIdBySearchParams)
  // console.log("videoDetailllllll" , videos);
  
  document.querySelector(".home-uploads-video-tab-loader").style.display="none";
 if(videos.items.length!==0){
  videos.items.forEach(async (videoItem) => {
    let videoDetail = await getVideoDetailByVideoId(videoItem.id.videoId);
    videoDetail = videoDetail.items[0];
    let videoId = videoDetail.id;
    let thumbnail = videoDetail.snippet.thumbnails.medium.url;
    let title = videoDetail.snippet.title;
    let viewCount = videoDetail.statistics.viewCount;
    // console.log("videdet" , videoDetail)
    let codedDuration = videoDetail.contentDetails.duration;
    // console.log("coded",codedDuration)
    let duration = getDuration(codedDuration);
    let classList = `min-w-full sm:min-w-[33%] lg:min-w-[23%] cursor-pointer sm:m-0 lg:m-0 lg:mb-6 mb-3 sm:mb-6 post-item show-hover-video-comp`;
    let parentDiv = document.createElement("div");
    parentDiv.setAttribute("class", classList);
    parentDiv.addEventListener("click", function () {
      window.location.href = `./video.html?videoId=${videoId}`;
    });
    parentDiv.insertAdjacentHTML(
      "afterbegin",
      `
      <div class="w-full object-fill sm:p-0 pb-0 relative overflow-hidden">
        <img
          src="${thumbnail}"
          class="rounded-lg w-full overflow-hidden"
          alt="thumbnal"
        />
        <div class="text-white  rounded-sm  absolute bottom-0 right-0 z-50 " style="position:absolute; background:rgba(0,0,0,0.7);padding:2px 5px;font-size:.7rem; right:10px; bottom:10px;">
   ${duration}
    </div>
    <div class="absolute z-[1000] -right-full p-1 video-comp" style="top:3px">
    <svg class="bg-black p-1" width="24" height="24" focusable="false" style="pointer-events:none;display:block;width:25px;height:100%;filter:invert(1) ; background:white" viewBox="0 0 24 24">
  <path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"/>
</svg>
<svg class=" mt-1 p-1" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 25px; height: 100%;filter:invert(1) ; background:white"><path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"/></svg>

    </div>
  </div>
      </div>

      <div
        class="px-3 sm:px-0 py-2 pb-3 sm:py-2 flex items-start justify-between video-details"
      >
        <div class="flex items-start">
          <div class="ml-4">
            <h2
              class="text-black text-sm max-h-10 font-medium sm:text-sm sm:max-h-12 text-overflow overflow-hidden"
            >
              ${title}
            </h2>

            <p class="text-gray-700 text-xs mt-1">
              ${viewCount/1000}k views - 2 days ago
            </p>
          </div>
        </div>
        <i class="material-symbols-rounded mt-2 text-xl ml-3"
          >more_vert</i
        >
      </div>
      
      `
    );
    mappingRef.appendChild(parentDiv);
  });
}
else{
  mappingRef.innerHTML="NO VIDEOS"
}
}

showChannelHomeVideo(homeUploadsVideosCon, getVideoTabVideosByChannelId);
showChannelHomeVideo(homeMostPopularVideoCon, getMostPopularVideosByChannelId);

function showHomePlaylist(twoPlaylists) {
  
  twoPlaylists.forEach(async(e) => {

    let playlistId = e.id;
    let [allPlaylistVideos] = await getPlaylistVideosByPlaylistIdRef(playlistId);
    let firstPlaylistVideoId = allPlaylistVideos.items[0].contentDetails.videoId;
  
    let className = `w-[96%] sm:w-[98%] mx-auto sm:flex sm:justify-start sm:flex-row sm:items-center mb-3 show-hover`;

    let thumbnail = e.snippet.thumbnails.medium.url;
    let title = e.snippet.title;
    let firstChildTitle = allPlaylistVideos.items[0].snippet.title;
    // let secChildTitle = allPlaylistVideos.items[1].snippet.title;
    let channelTitle = e.snippet.channelTitle;
    let totalVideosCount = e.contentDetails.itemCount;
    let parentDiv = document.createElement("div");
    parentDiv.setAttribute("class", className);
    parentDiv.addEventListener("click", function () {

      window.location.href = `./video.html?videoId=${firstPlaylistVideoId}&playlistId=${playlistId}`;
    });
    // console.log("home playlists" , e)
    parentDiv.insertAdjacentHTML(
      "afterbegin",
      `<div
                          class="w-full sm:min-w-1/2 sm:w-1/2 lg:w-1/3 rounded-xl overflow-hidden relative mr-4"
                        >
                          <img
                            class="w-full"
                            src="${thumbnail}"
                            alt="palylist-video"
                          />
                          <div
                            class="w-full absolute px-2 bottom-0 text-white h-7 bg-[rgba(0,0,0,0.8)] flex justify-between items-center"
                          >
                            <i
                              class="material-symbols-rounded p-2 text-xl text-white"
                              id="bar_menu"
                              >menu</i
                            >
                            <span class="text-sm">${totalVideosCount} videos</span>
                          </div>
                        </div>
  
                        <div class="p-2 sm:p-0">
                          <h2 class="text-xl sm:text-lg">
                           ${title}
                          </h2>
                          <p class="text-sm text-slate-600 mb-4">
                            ${channelTitle}
                          </p>
                          <p class="text-sm text-slate-600 h-6 line-clamp-1">
                            ${firstChildTitle}
                          </p>
                          <p class="text-sm text-slate-600 mb-3 h-6 line-clamp-1">
                          ${ ""
                            // secChildTitle
                          }
                          </p>
                          <span
                            class="text-sm font-semibold uppercase text-slate-600 mt-8"
                            >View Full playlist</span
                          >
                        </div>
      
      `
    );
    homePlaylistVideoCon.appendChild(parentDiv);
 
  });
  
}

 function showVideoTabVideos(data) {
  data.items.map(async (videoObj) => {
    // console.log("channel", videoObj);
    let videoDetail = await getVideoDetailByVideoId(videoObj.id.videoId);
    videoDetail = videoDetail.items[0];
    let thumbnail = videoObj.snippet.thumbnails.medium.url;
    let title = videoObj.snippet.title;
    let channelTitle = videoObj.snippet.channelTitle;
    let codedDuration = videoDetail.contentDetails.duration;
    let viewCount = videoDetail.statistics.viewCount;
    // console.log("coded",codedDuration)
    let duration = getDuration(codedDuration);
    const parentDiv = document.createElement("div");
    const classList = `flex justify-between items-start w-full sm:block sm:w-[49%] lg:w-[32%] rounded-xl cursor-pointer sm:m-0 lg:m-0 mb-0 sm:mb-6 lg:mb-4 post-item show-hover-video-comp`;

    parentDiv.setAttribute("class", classList);
    parentDiv.addEventListener("click", () => {
      window.location.href = `./video.html?videoId=${videoObj.id.videoId}`;
    });

    parentDiv.insertAdjacentHTML(
      "afterbegin",
      `<div
      class="inline-block sm:w-full sm:p-0 pb-0 channel-video-item-img-con relative  overflow-hidden"
    >
      <img
        src="${thumbnail}"
        class="rounded-lg w-full overflow-hidden"
        alt="thumbnail"
      />
      <div class="text-white  rounded-sm  absolute bottom-0 right-0 z-50 " style="position:absolute; background:rgba(0,0,0,0.7);padding:2px 5px;font-size:.7rem; right:10px; bottom:10px;">
      ${duration}
       </div>
       <div class="absolute z-[1000] -right-full p-1 video-comp" style="top:3px">
    <svg class="bg-black p-1" width="24" height="24" focusable="false" style="pointer-events:none;display:block;width:30px;height:100%;filter:invert(1) ; background:white" viewBox="0 0 24 24">
  <path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"/>
</svg>
<svg class=" mt-1 p-1" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 30px; height: 100%;filter:invert(1) ; background:white"><path d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"/></svg>

    </div>
  </div>
    </div>

    <div
      class="px-0 sm:px-0 py-0 pb-3 sm:py-2 flex items-start justify-between video-details channel-video-item-text-con"
    >
      <div class="flex items-start">
        <div class="ml-4">
          <h2
            class="text-black text-xs max-h-10 font-medium sm:text-sm sm:max-h-12 text-overflow overflow-hidden"
          >
            ${title}
          </h2>

          <p class="text-gray-700 text-xs mt-1">${viewCount/1000}k views - 2 days ago</p>
        </div>
      </div>
      <i class="material-symbols-rounded mt-2 text-xl ml-3">more_vert</i>
    </div>`
    );

    playVideoVideoTabCon.appendChild(parentDiv);
  scrollTrigger_first = true; 

  });
}


const sendPlaylistsRequest = async function (numberOfRequests=10,token=null) {
  // alert("hello")
  let channelId = channelIdBySearchParams;
  let div = document.createElement("div");
  div.setAttribute("class" , `w-full h-14 flex items-center justify-center playlistTabLoader`);
  div.insertAdjacentHTML("afterbegin" , `<img src="../icon-svgs/Rolling-0.8s-200px.svg" />`);
  playlistTabDataCon.appendChild(div);
  
  let [playlists, nextPageToken] = await getPlaylistsByChannelId(channelId , numberOfRequests,token);
// console.log("naxt page token here" , nextPageToken);
  let twoPlaylists = [playlists.items[0], playlists.items[1]];
  
  nxtToken_second = nextPageToken;
  if(playlists.items.length!==0){

    showHomePlaylist(twoPlaylists);
  showChannelProfilePlaylists(playlists);

    ;}
    document.querySelectorAll(".playlistTabLoader").forEach((e)=>{
      e.style.display="none";
    })
  // console.log("getetete" , playlists)
};

sendPlaylistsRequest();
// showChannelProfilePlaylists(playlistsApi);

function showChannelProfilePlaylists(playlists) {
  playlists.items.map(async (playlistItem) => {
    let title = playlistItem.snippet.title;
    let playlistId = playlistItem.id;
    let [allPlaylistVideos] = await getPlaylistVideosByPlaylistIdRef(playlistId);
    let firstPlaylistVideoId =
      allPlaylistVideos.items[0].contentDetails.videoId;
    let thumbnail = playlistItem.snippet.thumbnails.medium.url;
    let videoslength = playlistItem.contentDetails.itemCount;

    let className = `playlist-video sm:w-[32%] lg:w-[23%] sm:min-w-[23%] sm:m-0 lg:m-0 lg:mb-6 mb-3 sm:mb-6 post-item cursor-pointer`;

    let parentDiv = document.createElement("div");
    parentDiv.setAttribute("class", className);

    parentDiv.addEventListener("click", function () {
      window.location.href = `./video.html?videoId=${firstPlaylistVideoId}&playlistId=${playlistId}`;
    });
    parentDiv.insertAdjacentHTML(
      "afterbegin",
      ` <div class="w-full rounded-lg overflow-hidden relative mr-4" >
        <img
          class="w-full"
          src="${thumbnail}"
          alt="palylist-video"
        />
        <div
          class="w-full absolute px-2 bottom-0 text-white h-7 bg-[rgba(0,0,0,0.8)] flex justify-between items-center"
        >
          <i
            class=" p-2 text-xl text-white"
            id="bar_menu"
            ><svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none;color:white; display: block; width: 22px; height: 100%;filter:invert(1) ; background:white"><path d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"/></svg></i
          >
          <span class="text-sm">${videoslength} videos</span>
        </div>
      </div>

      <div class="p-2 sm:p-2">
        <h2
          class="text-base font-semibold h-18 line-clamp-2"
        >
          ${title}
        </h2>

        <span
          class="text-sm font-semibold uppercase text-slate-600 mt-8"
          >View Full playlist</span
        >
      </div>
    `
    );
    profilePlaylistTab.appendChild(parentDiv);
  scrollTrigger_second = true;

  });
}




// function showAboutTabDataCon(){
  
// }












videosTabDataCon.addEventListener("scroll" , function(){
  
  if (scrollTrigger_first && videosTabDataCon.scrollHeight < videosTabDataCon.scrollTop + 700)
  {
    if(nxtToken_first !== undefined){
    scrollTrigger_first=false;
    sendVideoRequest(10,nxtToken_first);
    }
    // console.log("triggered")
  }
//  console.log(videosTabDataCon.scrollHeight, videosTabDataCon.scrollTop + 700);
})

playlistTabDataCon.addEventListener("scroll" , function(){
  
  if (scrollTrigger_second && playlistTabDataCon.scrollHeight < playlistTabDataCon.scrollTop + 700)
  {
    if(nxtToken_second !== undefined){
      scrollTrigger_second=false;
      sendPlaylistsRequest(10,nxtToken_second);
      console.log("triggered" , nxtToken_second);
    }
    
  }
 console.log(playlistTabDataCon.scrollHeight, playlistTabDataCon.scrollTop + 700);
})