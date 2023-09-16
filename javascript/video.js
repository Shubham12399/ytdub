import { videosApi } from "../videosApi/videos.js";
// import { myApiKeyRef as myApiKey } from "./refrences.js";
// import { channelIdRef as channelId } from "./refrences.js";
import getVideoData from "./getVideos.js";
import { getChannelDetailRef as getChannelDetail } from "./getchanneldetail.js";
import { getVideoDetailByVideoIdRef as getVideoDetailByVideoId } from "./getVideos.js";
import { getPlaylistVideosByPlaylistIdRef as getPlaylistVideosByPlaylistId } from "./getPlaylist.js";
import getPlaylistsByChannelId from "./getPlaylist.js";
import getDuration from "./videoDuration.js";
import getCommentsByVideoId from "./getComment.js";
import { getVideoTabVideosByChannelIdRef as getVideoTabVideosByChannelId } from "./getchanneldetail.js";

const smallScreenPlaylist = document.querySelector("#small-screen-playlist");
const homePage = document.querySelector(".post-container");
const videoSrc = document.querySelector("#video-src");
const titleCon = document.querySelector("#title-con");
const playVideoTitle = document.querySelector("#video-play-title");
const videoPlayChannelSrc = document.querySelector("#play-video-channel-src");
const videoDescription = document.querySelector("#video-description");
const playVideoChannelSrc = document.querySelector("#play-video-channel-src");
const playVideoChannelImgSrc = document.querySelector(
  "#play-video-channel-img-src"
);
const playVideoLikeCount = document.querySelector("#play-video-like-count");
const playVideoSubsCount = document.querySelector("#play-video-subs-count");
const smallVideoDesc = document.querySelector("#slidable-container");
const descView = document.querySelector("#desc-view");
const playVideoPublishAt = document.querySelector("#play-video-publishAt");
const playVideoChannelTitle = document.querySelector(
  "#play-video-channel-title"
);
const playlistTitle = Array.from(
  document.querySelectorAll(".playlist-section-title")
);
const playlistchannelName = Array.from(
  document.querySelectorAll(".playlist-channel-name")
);
const playlistVideoCount = Array.from(
  document.querySelectorAll(".playlist-video-count")
);
const playlistVideos = Array.from(
  document.querySelectorAll(".play-video-playlist-videos")
);
const playVideoPlaylist = Array.from(
  document.querySelectorAll(".play-video-playlist")
);
const playVideoVideosCon = document.querySelector("#play-video-videos-con");
const togglePlaylist = Array.from(
  document.querySelectorAll(".playlist-close-btn")
);
const videoCon = document.getElementById("video-con");
const barMenu = document.querySelector("#bar_menu");
const closeBarMenu = document.querySelector("#close_bar_menu");
const closeSlideDiv = Array.from(document.querySelectorAll(".close_slide_div"));
const totalComments = document.querySelector("#total-comments");
const commentsBox = document.querySelector("#comments-box");
const commentChannelLogo = document.querySelector("#comment-channel-logo");
// const slidableContainer = document.querySelector("#slidable-container");
// const draggableDiv = document.querySelector("#draggable-div");

// function move(e){
//   offsetY = e.offsetY;
//   slidableContainer.style.top = `${offsetY}px`;
//   console.log(offsetY);
// }
// let offsetY , offsetX;
// draggableDiv.addEventListener("mousedown" ,function(e){
//   // offsetY = e.offsetY ;
//   document.addEventListener("mousemove",move);
// });
// document.addEventListener("mouseup",()=>{
//   document.removeEventListener("mousemove" ,move);
// });
// const iframe = document.querySelector("iframe");
// const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
// const fullScreenBtn = innerDoc.querySelector(".ytp-fullscreen-button");

// console.log("fiframe" , iframe.contentWindow.document.getElementsByTagName("div")[0]);
// console.log("full" , fullScreenBtn)

// let playlistId = 'PL2NreF6p66FMywC-kvHZbIroyPPbLBpZl';
// async function getPlaylistVideos(playlistId) {
//   const playlistVideos = await fetch(
//     `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&playlistId=${playlistId}&key=${myApiKey}`
//   );
//   playlistVideos = await playlistVideos.json();
// }

barMenu.addEventListener("click", () => {
  snipMenu.classList.add("snip-menu");
  snipMenu.classList.add("left-zero");
  videoCon.style.filter = "blur(5px)";
});

closeBarMenu.addEventListener("click", () => {
  snipMenu.classList.toggle("snip-menu");
  snipMenu.classList.toggle("left-zero");
  videoCon.style.filter = "blur(0px)";
});
// console.log (closeSlideDiv)
closeSlideDiv.forEach((e)=>{e.addEventListener("click" , ()=>{
  alert("hello")
  document.body.style.background="#fff";
    smallVideoDesc.style.bottom="-100%";
})});

const videoIdBySearchParams = window.location.search
  .split("")
  .splice(9, 11)
  .join("");
let nextToken = "";
let nextToken_two = "";
let scrollTrigger = false;
let scrollTrigger_two = false;
let comNextToken = "";
let commentScrollTrigger = false;

const sendVideoRequest = async function (
  channel = null,
  numberOfRequests = 10,
  token = null
) {
  let div = document.createElement("div");
  div.setAttribute(
    "class",
    `w-full h-full flex items-center justify-center loader`
  );
  div.insertAdjacentHTML(
    "beforeend",
    `<img src="../icon-svgs/Rolling-0.8s-200px.svg" />`
  );
  playVideoVideosCon.appendChild(div);
  let [videos, nextPageToken] = await getVideoData(numberOfRequests, token);
  nextToken = nextPageToken;
  if (channel !== null) {
    let [d] = await getVideoTabVideosByChannelId(channel);
    videos.items = [...d.items, ...videos.items];
  }
  // alert("hello")
  insertVideoIntoPlayVideoVideosCon(videos);
  document.querySelectorAll(".loader").forEach((e) => {
    e.style.display = "none";
  });
};

function setplaylistDetails(data) {
  playlistTitle.forEach((elem) => {
    // console.log("playlist title", elem);
    elem.textContent = data.snippet.title;
  });
  playlistchannelName.forEach((elem) => {
    elem.textContent = data.snippet.channelTitle;
  });
  playlistVideoCount.forEach((elem) => {
    elem.textContent = data.contentDetails.itemCount;
  });
  // playlistTitle.textContent = data.snippet.title;
}
let playlistIindex = -1;
// let addIndex = false;
function addVideoIntoPlaylist(data) {
  playlistIindex++;
  // let channelName = channelDetail.items[0].snippet.title;
  data.items.map((videoObj, index) => {
    index = index + playlistIindex * 10;
    // let videoDetails = getEachVideoDetails(videoObj[0].id.videoId);
    // console.log(videoObj[0].id.videoId);
    // let videoStatistics = videoDetails.items[0].statistics;
    // console.log(videoObj, "obj");
    // console.log(videoObj.snippet.thumbnails.medium == undefined);
    let thumbnail = "";
    if (videoObj.snippet.thumbnails.medium == undefined) {
      thumbnail = `https://online.visual-paradigm.com/repository/images/645ead47-1cf0-4f84-bf6c-e082000eed3f/youtube-thumbnails-design/blank-youtube-thumbnail.png`;
    } else {
      thumbnail = videoObj.snippet.thumbnails.medium.url;
    }

    // else{
    //   let
    // }
    let title = videoObj.snippet.title;
    let channelTitle = videoObj.snippet.channelTitle;

    playlistVideos.forEach((e, i) => {
      const classList = `flex justify-start items-start w-full rounded-sm cursor-pointer post-item mb-0  py-1 hover:bg-gray-200 playlist-video-item ${
        videoObj.contentDetails.videoId == videoIdBySearchParams
          ? "bg-gray-200"
          : ""
      }`;
      const parentDiv = document.createElement("div");
      parentDiv.addEventListener("click", function () {
        // alert("hello")
        // console.log("video id", videoObj);
        window.location.href = `./video.html?videoId=${
          videoObj.contentDetails.videoId
        }&playlistId=${window.location.search
          .split("")
          .splice(32, 34)
          .join("")}`;
        // console.log(videoObj.contentDetails.videoId);
        // window.location.reload();
        window.scrollTo(0, 0);
      });
      parentDiv.setAttribute("class", classList);
      parentDiv.insertAdjacentHTML(
        "afterbegin",
        `
                       <span class=" text-4xl i-effect p-2 text-gray-700 ${
                         index >= 9 ? "ml-1 mr-1" : "ml-2 mr-2"
                       } mt-3 pl-2 ${
          videoObj.contentDetails.videoId == videoIdBySearchParams
            ? "mr-0 pr-0 pl-0  "
            : ""
        }">
                       ${
                         videoObj.contentDetails.videoId ==
                         videoIdBySearchParams
                           ? ` <i
                        class="material-icons-round text-gray-700 flex items-center mx-0"
                        >play_arrow</i
                      > `
                           : index + 1
                       }
                       </span>
                       <div class="flex justify-between w-full ">
                       <div class="px-0 py-0 ml-1 pb-1 flex items-start justify-start video-details ">
                         <div class="pb-0 play-video-playlist-video-item-thumbnail">
                           <img src="${thumbnail}" class="rounded-lg w-full overflow-hidden" alt="thumbnail" />
                         </div>
                 
                           <div class="flex items-start ml-4 ">
                             <div class="ml-0">
                               <h2
                                 class="text-black text-sm max-h-10 font-medium text-overflow overflow-hidden h-14 line-clamp-2">
                                 ${title}
                               </h2>
                 
                               <p class="text-gray-700 text-xs mt-0">
                                ${channelTitle}
                               </p>
                             </div>
                           </div>
                         </div>
                         <i class=" mt-2  ml-3"><svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 18px; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"/></svg></i>
                       </div>`
      );

      e.appendChild(parentDiv);
      scrollTrigger_two = true;
    });
  });
}

togglePlaylist.forEach((e) => {
  let toggle = true;
  e.addEventListener("click", () => {
    if (toggle) {
      playlistVideos.forEach((elem) => {
        elem.style.height = "0px";
      });
      toggle = false;
    } else {
      playlistVideos.forEach((elem) => {
        elem.style = "min-height:auto;";
        // elem.style.height = "auto";
        elem.style = "max-height:57vh;";
      });
      toggle = true;
    }
  });
});

function insertVideoIntoPlayVideoVideosCon(data) {
  console.log(data);
  data.items.map(async (videoObj) => {
    let videoStatisticsRef = await getVideoDetailByVideoId(videoObj.id.videoId);
    let videoStatistics = videoStatisticsRef.items[0].statistics;
    let thumbnail = videoObj.snippet.thumbnails.medium.url;
    let title = videoObj.snippet.title;
    let channelTitle = videoObj.snippet.channelTitle;
    let codedDuration = videoStatisticsRef.items[0].contentDetails.duration;
    // console.log("coded",codedDuration)
    let duration = getDuration(codedDuration);
    const classList = `flex justify-between items-start w-full rounded-xl cursor-pointer post-item mb-0 mx-1 my-2 show-hover-video-comp`;
    const parentDiv = document.createElement("div");
    parentDiv.addEventListener("click", function () {
      window.location.href = `../pages/video.html?videoId=${videoObj.id.videoId}`;
    });
    parentDiv.setAttribute("class", classList);
    parentDiv.insertAdjacentHTML(
      "afterbegin",
      `<div class="flex justify-start relative overflow-hidden  ">
  <div class="pb-0 play-video-video-img-con relative overflow-hidden">
    <img
      src="${thumbnail}"
      class="rounded-lg w-full overflow-hidden"
      alt="thumbnail"
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

  <div
    class="px-0 py-0 ml-4 pb-1 flex items-start justify-start video-details"
  >
    <div class="flex items-start">
      <div class="ml-0">
        <h2
          class="text-black text-sm max-h-10 font-medium text-overflow overflow-hidden h-14 line-clamp-2"
        >
          ${title}
        </h2>
        <p class="line-clamp-1 text-sm mt-1 text-gray-600">
          ${channelTitle}
        </p>
        <p class="text-gray-700 text-xs mt-0">
        ${Math.round(
          (videoStatistics.viewCount / 1000) * 10
        )}k views - 2 days ago
        </p>
      </div>
    </div>
  </div>
</div>
<i class=" mt-0  ml-3"><svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 18px; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"/></svg></i>`
    );
    playVideoVideosCon.appendChild(parentDiv);
    scrollTrigger = true;
  });
}
// insertVideoIntoPlayVideoVideosCon(data);

// async function getVideoData() {
//   let videoRes = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=${channelId}&part=snippet%2Cid&order=date&maxResults=50`
//   );
//   // let channelDetail = await fetch(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${myApiKey}
//   // `);
//   // channelDetail = await channelDetail.json();
//   // https://www.googleapis.com/youtube/v3/search?key=AIzaSyAZf9yLBrMI0vcQYyV4WtbZY4T5MIv_bvM&channelId=UCPzqyqw2SFjU24g0aN_5CzQ&part=snippet%2Cid&order=date&maxResults=50
//   videoRes = await videoRes.json();
//   let res_two = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=UCWdnZ4Whvgo_1mKJSl48emA&part=snippet%2Cid&order=date&maxResults=50`
//   );
//   res_two = await res_two.json();
//   // videoRes = [...videoRes , ...res_two];
//   console.log(videoRes.error)
//   if(!videoRes.error){
//     videoRes.items =  [...videoRes.items , ...res_two.items ];
//   }
//   else{
//     // alert("Quota has ended");
//     // document.body.innerHTML = videoRes.error.message;
//   }
//   setVideoBySearchParams(videoRes);
//   insertVideoIntoPlayVideoVideosCon(videoRes)
//   // console.log(videoRes.items);
//   // addVideoIntoPlaylist(res_two);
//   // console.log(videoRes)
// }
// getVideoData();

// getting channel detail 
async function channelDetails(channelId) {
  let channelData = await getChannelDetail(channelId);
  let logo = channelData[0].items[0].snippet.thumbnails.medium.url;
  return [logo, channelData[0]];
};


// playlsit request  
const sendPlaylistVideoRequest = async (
  numberOfRequests = 10,
  token = null
) => {
  playlistVideos.forEach((e) => {
    let div = document.createElement("div");
    div.setAttribute(
      "class",
      `w-full h-8 flex items-center justify-center playlistVideoLoader`
    );
    div.style.marginTop ="30px"
    div.insertAdjacentHTML(
      "beforeend",
      `<img src="../icon-svgs/Rolling-0.8s-200px.svg" />`
    );
    e.appendChild(div);
  });

  if (window.location.search.split("").splice(32, 34).join("") != "") {
    let [playlistVideoRes, nextPageToken] = await getPlaylistVideosByPlaylistId(
      window.location.search.split("").splice(32, 34).join(""),
      numberOfRequests,
      token
    );
    nextToken_two = nextPageToken;
    // document.querySelectorAll(".loader")[0].style.display = "none";
    // document.querySelectorAll(".loader")[1].style.display = "none";
    addVideoIntoPlaylist(playlistVideoRes);
    // console.log("playlist Data", playlistVideoRes);
  } else {
    playVideoPlaylist.forEach((eCon) => {
      eCon.style.display = "none";
    });
  }
  document.querySelectorAll(".playlistVideoLoader").forEach((e) => {
    e.style.display = "none";
  });
};


// set video content 
async function setVideoContent() {

    let videoRef = await getVideoDetailByVideoId(videoIdBySearchParams);
    sendVideoRequest(videoRef.items[0].snippet.channelId);
    console.log("videoRef", videoRef);
    let videoStatistics = videoRef.items[0].statistics;
    // console.log("videoRef" , videoRef);
    let thumbnail = videoRef.items[0].snippet.thumbnails.medium.url;
    let description = videoRef.items[0].snippet.description;
    let videoId = videoRef.items[0].id;
    let videoSrcLink = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    let title = videoRef.items[0].snippet.title;
    let channelTitle = videoRef.items[0].snippet.channelTitle;
    let channelDetail = await channelDetails(
      videoRef.items[0].snippet.channelId
    );

    let logoSrc = channelDetail[0];
    commentChannelLogo.src = logoSrc;

    // channelIdDefineAtTop = videoRef.items[0].snippet.channelId;
    // channelLogoDefineAtTop = logoSrc;

    // console.log(channelDetail[1]);
    let likeCount = Math.round((videoStatistics.likeCount / 1000) * 10) + "k";
    let viewCount = Math.round((videoStatistics.viewCount / 1000) * 10) + "k";
    let subsCount = channelDetail[1].items[0].statistics.subscriberCount;
    let publishedAt = videoRef.items[0].snippet.publishedAt;
    let descTitle = videoDescription.querySelector("#desc-title");
    let descBody = videoDescription.querySelector("#desc-body");
    let toggleDesc = true;
    playVideoLikeCount.innerText = likeCount;
    
      titleCon.addEventListener("click" , function(){
        if(document.body.clientWidth <  1024){
        // document.body.style.background="rgba(0,0,0,0.1)";
        smallVideoDesc.style.bottom="10px";
        let div = document.createElement("div");
        let className = `p-3 h-[62vh] overflow-auto `; 
        div.setAttribute("class" , className);
        div.style.paddingBottom="2.5rem"
        div.insertAdjacentHTML("afterbegin" , `
        <div>
        <h1 class="text-base font-bold"> ${title}  </h1>
        <div class="flex justify-evenly sm:justify-start gap-7 border-b border-b-gray-400">
          <div class="p-4">
            <h1 class="text-base font-bold">${likeCount}</h1>
            <span class="text-xs text-gray-600">Likes</span>
          </div>
          <div class="p-4">
            <h1 class="text-base font-bold">${viewCount}</h1>
            <span class="text-xs text-gray-600">Views</span>
          </div>
          <div class="p-4">
            <h1 class="text-base font-bold">${publishedAt.split("T")[0].split("-").join("-")}</h1>
            <span class="text-xs text-gray-600">2023</span>
          </div>
        </div>
        <div class="my-2 mt-3">
          <a href="#" class="p-1 px-2 rounded-xl text-xs bg-slate-100 ">#ai</a>
          <a href="#" class="p-1 px-2 rounded-xl text-xs bg-slate-100 ">#tech</a>
          <a href="#" class="p-1 px-2 rounded-xl text-xs bg-slate-100 ">#space</a>
        </div>
      </div>  
     

      <div class="text-xs text-gray-800  py-2 my-4" id="small-desc-body">
        
      </div>
        `);
        smallVideoDesc.appendChild(div);
        document.querySelector("#small-desc-body").innerText = description;
      }});
    
      let elipseText = document.querySelector("#elipse-text"); 
      videoDescription.addEventListener("click" , function(){
        if(toggleDesc){ 
          descBody.classList.add("block");
          elipseText.textContent="see less";
          toggleDesc=false;
        }else{
          descBody.classList.remove("block");
          elipseText.textContent="...more";
          toggleDesc=true;
        }
      });
    // const videoDetail =
    playVideoTitle.textContent = title;
    playVideoChannelTitle.textContent = channelTitle;
    playVideoChannelSrc.setAttribute(
      "href",
      `./profile.html?channelId=${videoRef.items[0].snippet.channelId}`
    );
    let morePlaylisttoken = "";
    let playlists = [];
    let morePlaylist = async (numberOfRequests = 10, token = null) => {
      let [playlist, nxtToken] = await getPlaylistsByChannelId(
        videoRef.items[0].snippet.channelId,
        numberOfRequests,
        token
      );
      playlists = [...playlists, ...playlist.items];
      morePlaylisttoken = nxtToken;
      if (window.location.search.split("").splice(32, 34).join("") != "") {
        // console.log("pappapapap",playlists);
        let playlistData = playlists.filter((items) => {
          return (
            items.id == window.location.search.split("").splice(32, 34).join("")
          );
        });
        if (playlistData[0] == undefined) {
          morePlaylist(10, morePlaylisttoken);
        }
        // console.log("playlistididi",window.location.search.split("").splice(32, 34).join(""))
        // console.log("", playlistData);
        setplaylistDetails(playlistData[0]);
      }
      descTitle.textContent = title;
      playVideoSubsCount.textContent = subsCount / 1000 + "k";
      // playVideoLikeCount.textContent = likeCount;
      descView.textContent = viewCount;
      playVideoPublishAt.textContent = publishedAt;
      descBody.innerText = description;
      console.log(description)
      playVideoChannelImgSrc.setAttribute("src", logoSrc);
      // console.log(logoSrc);

      videoSrc.setAttribute("src", videoSrcLink);

      // alert("hello")

      // videoPlayChannelSrc.src
      window.scrollTo(0, 0);
    };

    morePlaylist();
}


// set video by search params 
async function setVideoBySearchParams() {
  if (!window.location.search == "") {
    // let div = document.createElement("div");
    // div.setAttribute(
    //   "class",
    //   `w-full h-full flex items-center justify-center videoConloader`
    // );
    // div.insertAdjacentHTML(
    //   "beforeend",
    //   `<img src="../icon-svgs/Rolling-0.8s-200px.svg" />`
    // );
    // document.querySelector("#video-con").insertAdjacentHTML("afterbegin" , div);
    // let videoObj = await getVideoDetailByVideoId(videoIdBySearchParams);

    // console.log(
    //   "playlist id",
    //   window.location.search.split("").splice(32, 34).join("")
    // );
    setVideoContent();
    // document.querySelector(".videoConloader").style.display="none";
    // playlistVideos.forEach((e) => {
    //   e.insertAdjacentHTML(
    //     "beforeEnd",
    //     `<div class="w-full h-full flex items-center justify-center loader">
    //       <img src="../icon-svgs/Rolling-0.8s-200px.svg" />
    //       </div>`
    //   );
    // });

    sendPlaylistVideoRequest();
    // console.log(window.location.search.split("").splice(32, 34).join(""));

    // console.log("videoObj jjjj" , videoObj , window.location.search.split("").splice(9,11).join(''));

    // getPlaylistData(videoObj.items[0].snippet.channelId);
  } else {
    videoSrc.setAttribute(
      "src",
      `https://www.youtube.com/embed/${videoIdBySearchParams}?autoplay=1`
    );
  }
  // }
}
setVideoBySearchParams();


// comment logic
const sendCommentRequest = async (numberOfRequests = 30, token = null) => {
  let div = document.createElement("div");
  div.setAttribute(
    "class",
    `w-full h-full flex items-center justify-center com-loader`
  );
  div.insertAdjacentHTML(
    "beforeend",
    `<img src="../icon-svgs/Rolling-0.8s-200px.svg" />`
  );
  commentsBox.appendChild(div);
  let commentsArr = await getCommentsByVideoId(
    videoIdBySearchParams,
    numberOfRequests,
    token
  );
  let [comments, nextPageToken] = commentsArr;
  comNextToken = nextPageToken;
  commentScrollTrigger = true;
  Array.from(document.querySelectorAll(".com-loader")).forEach((e)=>e.style.display="none");
  addComment(comments);
};
sendCommentRequest();

async function addComment(comments) {
  // alert(channelLogoDefineAtTop);
  totalComments.textContent = comments.items.length;
  comments.items.map((comment) => {
    let commentText = "";
    let authorName = "";
    let authorImg = "";
    let authorChannelId = "";
    let comLikeCount = 0;
    let comPublish = "";
    let replyCount = 0;
    let isReply = false;
    if (comment.snippet.topLevelComment != undefined) {
      commentText = comment.snippet.topLevelComment.snippet.textOriginal;
      authorName = comment.snippet.topLevelComment.snippet.authorDisplayName;
      authorImg = comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
      authorChannelId =
        comment.snippet.topLevelComment.snippet.authorChannelId.value;
      comLikeCount = comment.snippet.topLevelComment.snippet.likeCount;
      comPublish = comment.snippet.topLevelComment.snippet.publishedAt;
      replyCount = comment.snippet.totalReplyCount;
      isReply = comment.snippet.canReply;
    } else {
      commentText = comment.snippet.textDisplay;
      authorName = comment.snippet.authorDisplayName;
      authorImg = comment.snippet.authorProfileImageUrl;
      authorChannelId = comment.snippet.authorChannelId.value;
      comLikeCount = comment.snippet.likeCount;
      comPublish = comment.snippet.publishedAt;
      replyCount = comment.snippet.totalReplyCount;
      isReply = false;
    }
    commentsBox.insertAdjacentHTML(
      "beforeend",
      `
     <div class=" flex comment py-4">
                  
     <div class="w-12 h-12 mr-4" id="author-img-con">
     <a class="channel-logo rounded-full overflow-hidden block" 
     href="./profile.html?channelId=${authorChannelId}"
     ><img src="${authorImg}" class="rounded-full" /></a>
     </div>
     <div class="comment-txt w-full">
       <span class="flex gap-1 mb-1"><a href="#" class=" text-xs font-medium author-customeUrl"> @${authorName.trim()} </a> <span class="text-xs text-gray-600 publish-date">${comPublish} ago</span></span>
       <span class="text-sm mt-10">
        ${commentText} 
       </span>
       <div class="flex mt-1">
         <div class="flex items-center gap-2 mt-0">

              <div class="flex items-center gap-1">
                <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; "><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"/></svg>
               ${comLikeCount}
                </div>
             
              <div class="flex items-center gap-1">
                <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; "><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"/></svg>
                0
              </div>

         </div>
         ${
           replyCount > 0
             ? `<div class="like-img mt-0 ml-4 flex items-center">
          <!-- <img class="w-8" src="../thumbnails/download.jpeg" /> -->
          <p class="ml-4 text-sm font-medium">${replyCount} reply</p>
        </div>`
             : ""
         }
        
       
     </div>
   


   </div>
   <span><svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="20" focusable="false" style="pointer-events: none; display: block; "><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"/></svg></span>
 </div>
     `
    );
  });

 
  if(document.body.clientWidth < 645){
   
    document.querySelector("#small-screen-comment-handler").addEventListener("click" , smallSrceenComment);
   
  }
  function smallSrceenComment() {
    // alert("helel")
    smallVideoDesc.style.bottom="0%";
    smallVideoDesc.style.overflow="auto";
    // smallVideoDesc.style.padding="";
    smallVideoDesc.style.paddingBottom=".5rem";
    
    smallVideoDesc.innerHTML = `<div class="w-full p-3  px-0 border-b sticky top-0 border-gray-300 bg-white" id="draggable-div">
    <div class="w-8 h-1 mx-auto bg-gray-400 rounded-sm"></div>
    <h3 class=" mt-3 font-medium px-4" id="small-slidediv-st">Comments</h3>
    <i class=" absolute top-1 right-2 cursor-pointer p-3 hover:bg-gray-200 rounded-full close_slide_div_comm">
    <svg  enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 26px; height: 100%;"><path d="m12.71 12 8.15 8.15-.71.71L12 12.71l-8.15 8.15-.71-.71L11.29 12 3.15 3.85l.71-.71L12 11.29l8.15-8.15.71.71L12.71 12z"/></svg>
  </i>
  </div>`;

  document.querySelector(".close_slide_div_comm").addEventListener("click" , () =>{
    document.body.style.background="#fff";
    smallVideoDesc.style.bottom="-100%";
  });
    comments.items.map((comment) => {
      let commentText = "";
      let authorName = "";
      let authorImg = "";
      let authorChannelId = "";
      let comLikeCount = 0;
      let comPublish = "";
      let replyCount = 0;
      let isReply = false;
      if (comment.snippet.topLevelComment != undefined) {
        commentText = comment.snippet.topLevelComment.snippet.textOriginal;
        authorName = comment.snippet.topLevelComment.snippet.authorDisplayName;
        authorImg = comment.snippet.topLevelComment.snippet.authorProfileImageUrl;
        authorChannelId =
          comment.snippet.topLevelComment.snippet.authorChannelId.value;
        comLikeCount = comment.snippet.topLevelComment.snippet.likeCount;
        comPublish = comment.snippet.topLevelComment.snippet.publishedAt;
        replyCount = comment.snippet.totalReplyCount;
        isReply = comment.snippet.canReply;
      } else {
        commentText = comment.snippet.textDisplay;
        authorName = comment.snippet.authorDisplayName;
        authorImg = comment.snippet.authorProfileImageUrl;
        authorChannelId = comment.snippet.authorChannelId.value;
        comLikeCount = comment.snippet.likeCount;
        comPublish = comment.snippet.publishedAt;
        replyCount = comment.snippet.totalReplyCount;
        isReply = false;
      }
      smallVideoDesc.insertAdjacentHTML(
        "beforeend",
        `
       <div class=" flex comment py-4 px-4">
                    
       <div class="w-12 h-12 mr-4" id="author-img-con">
       <a class="channel-logo rounded-full overflow-hidden block" 
       href="./profile.html?channelId=${authorChannelId}"
       ><img src="${authorImg}" class="rounded-full" /></a>
       </div>
       <div class="comment-txt w-full">
         <span class="flex gap-1 mb-1"><a href="#" class=" text-xs font-medium author-customeUrl"> @${authorName.trim()} </a> <span class="text-xs text-gray-600 publish-date">${comPublish} ago</span></span>
         <span class="text-sm mt-10">
          ${commentText} 
         </span>
         <div class="flex mt-1">
           <div class="flex items-center gap-2 mt-0">
  
                <div class="flex items-center gap-1">
                  <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; "><path d="M18.77,11h-4.23l1.52-4.94C16.38,5.03,15.54,4,14.38,4c-0.58,0-1.14,0.24-1.52,0.65L7,11H3v10h4h1h9.43 c1.06,0,1.98-0.67,2.19-1.61l1.34-6C21.23,12.15,20.18,11,18.77,11z M7,20H4v-8h3V20z M19.98,13.17l-1.34,6 C18.54,19.65,18.03,20,17.43,20H8v-8.61l5.6-6.06C13.79,5.12,14.08,5,14.38,5c0.26,0,0.5,0.11,0.63,0.3 c0.07,0.1,0.15,0.26,0.09,0.47l-1.52,4.94L13.18,12h1.35h4.23c0.41,0,0.8,0.17,1.03,0.46C19.92,12.61,20.05,12.86,19.98,13.17z"/></svg>
                 ${comLikeCount}
                  </div>
               
                <div class="flex items-center gap-1">
                  <svg height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; "><path d="M17,4h-1H6.57C5.5,4,4.59,4.67,4.38,5.61l-1.34,6C2.77,12.85,3.82,14,5.23,14h4.23l-1.52,4.94C7.62,19.97,8.46,21,9.62,21 c0.58,0,1.14-0.24,1.52-0.65L17,14h4V4H17z M10.4,19.67C10.21,19.88,9.92,20,9.62,20c-0.26,0-0.5-0.11-0.63-0.3 c-0.07-0.1-0.15-0.26-0.09-0.47l1.52-4.94l0.4-1.29H9.46H5.23c-0.41,0-0.8-0.17-1.03-0.46c-0.12-0.15-0.25-0.4-0.18-0.72l1.34-6 C5.46,5.35,5.97,5,6.57,5H16v8.61L10.4,19.67z M20,13h-3V5h3V13z"/></svg>
                  0
                </div>
  
           </div>
           ${
             replyCount > 0
               ? `<div class="like-img mt-0 ml-4 flex items-center">
            <!-- <img class="w-8" src="../thumbnails/download.jpeg" /> -->
            <p class="ml-4 text-sm font-medium">${replyCount} reply</p>
          </div>`
               : ""
           }
          
         
       </div>
     
  
  
     </div>
     <span><svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="20" focusable="false" style="pointer-events: none; display: block; "><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"/></svg></span>
   </div>
       `
      );
    });
  

  }
}


// infinite scroll 
videoCon.onscroll = () => {
  // console.log(videoCon.scrollHeight ,videoCon.scrollTop );
  if (scrollTrigger && videoCon.scrollHeight < videoCon.scrollTop + 700) {
    if (nextToken !== undefined) {
      scrollTrigger = false;
      sendVideoRequest(null, 10, nextToken);
      // console.log("triggered")
    }
  }
  if (
    commentScrollTrigger &&
    videoCon.scrollHeight < videoCon.scrollTop + 700
  ) {
    if (comNextToken !== undefined) {
      commentScrollTrigger = false;
      sendCommentRequest(20, comNextToken);
      // console.log("triggered")
    }
  }
};
playlistVideos.forEach((e) => {
  e.addEventListener("scroll", function () {
    if (scrollTrigger_two && e.scrollHeight < e.scrollTop + 700) {
      if (nextToken_two !== undefined) {
        scrollTrigger_two = false;
        sendPlaylistVideoRequest(10, nextToken_two);
        // console.log("triggered" , nxtToken_two);
      }
    }
    //  console.log(e.scrollHeight, e.scrollTop + 700);
  });
});

