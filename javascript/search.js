import {getSearchDataRef as getSearchData} from "./getsearchdata.js";
import {getVideoDetailByVideoIdRef as getVideoDetailByVideoId} from './getVideos.js';
import {getChannelDetailRef as getChannelDetail} from "./getchanneldetail.js";
import getDuration from "./videoDuration.js";
const searchQuery = Array.from(document.querySelectorAll(".search-query"));
const allSearchField = Array.from(document.querySelectorAll(".search-field"));
const searchVideoCon = document.querySelector("#search-video-con");
let query = '';
let nextToken = '';
let scrollTrigger = false;
searchQuery.forEach((e)=>{
    e.addEventListener("click", ()=>{
        // alert("hjdhsj")
        query = allSearchField[0].value;
        window.location.href=`http://127.0.0.1:5500/pages/search.html?query=${query}` ;
    });
    allSearchField[0].addEventListener("keyup", function(e){
        if(e.keyCode == 13){
          query = allSearchField[0].value;
          window.location.href=`http://127.0.0.1:5500/pages/search.html?query=${query}` ;
        }
       
    });
    
});
// alert("hello")



async function sendSearchDataRequest(queryparam,numberOfRequests=40,token=null){
    let div = document.createElement("div");
  div.setAttribute("class" , `w-full mt-8 bg-gray-600 flex items-center justify-center searchLoader`);
  div.insertAdjacentHTML("beforeend" , `<img src="../icon-svgs/Rolling-0.8s-200px.svg" />`);
  searchVideoCon.appendChild(div);
    let [data,nextPageToken] = await getSearchData(queryparam,numberOfRequests,token);
    nextToken = nextPageToken;
    scrollTrigger = true;
    setSearchResult(data);
   document.querySelectorAll(".searchLoader").forEach((e)=>{e.style.display="none"});
};
sendSearchDataRequest(window.location.search.split("").splice(7, window.location.search.split("").length - 7).join(""));


async function channelDetail(channelId){
    let detail = await getChannelDetail(channelId);
    let logo = detail[0].items[0].snippet.thumbnails.medium.url;
    return [detail[0],logo];
}


const setSearchResult = (data) => {
    data.items.map(async (e)=>{
      if(e.id.kind=="youtube#channel"){
        let channelId = e.id.channelId;
        let thumbnail = e.snippet.thumbnails.medium.url;
            // let title = e.snippet.title;
            let channeltitle = e.snippet.channelTitle;
            let [channelData] = await channelDetail(channelId);
            let subscriber = channelData.items[0].statistics.subscriberCount / 1000 + "k";
            console.log(subscriber)
            let customUrl = channelData.items[0].snippet.customUrl;
            let div = document.createElement("div");
            let className = `search-channel-module flex flex-row justify-start  items-center lg:w-[96%] sm:py-4 lg:py-6 px-4 my-6 cursor-pointer lg:first-channel-item`;
            div.setAttribute("class" , className);
            div.addEventListener("click" , function(){
                window.location.href =`http://127.0.0.1:5500/pages/profile.html?channelId=${channelId}`;
            });
            div.insertAdjacentHTML("afterbegin" , ` <div class="w-[55%]  sm:w-[65%] lg:w-[31%]  flex items-center justify-center mr-4">
            <img
              class="w-[55%] sm:w-[40%]  rounded-full overflow-hidden"
              src="${thumbnail}"
            />
          </div>
          <div class="w-[70%] sm:w-[50%]  h-full">

            <h1 class="text-sm sm:text-xl mb-0 sm:mb-2 line-clamp-1">
              ${channeltitle}
            </h1>
            <span class="text-xs sm:text-sm text-gray-600 my-1 sm:my-2 line-clamp-1">
              <span>${customUrl}</span>  
              <span class="hidden sm:inline-block"> • ${subscriber} subscriber</span>
            </span>
            <p class="block sm:hidden text-xs text-gray-600">${subscriber} subscriber</p>
            <button class="p-2 px-3 bg-black sm:hidden text-white rounded-full my-2 text-xs">Subscribe</button>
            <div class="text-xs mt-1 sm:h-10 overflow-hidden sm:text-sm text-gray-600 line-clamp-2">
             <p class="hidden sm:block">This is my intention to make people happy because if I want
              happiness for me then I have to give happiness. we all are doing
              something to become happy but most of the people are suffering
              from so many problems. we are trying to spread happiness by
              inspirational stories and my own experiences of life .This
              channel helps you to find real happiness .We are focusing on a
              most important question' who am I,. happiness is my intention is
              not just a YouTube channel it is a revolution for happiness
              which is not somewhere outside.Happiness is our basic nature but
              it is very disappointing that people are looking it somewhere
              outside. we don't try to understand that this is not somewhere
              outside. By this channel I want to spread my knowledge and those
              people's knowledge who did a big impact in history.These videos
              help people to find real happiness. You can watch Buddha stories
              and other motivational story and my own experiences of
              meditation .This channel helps you to discover yourself.</p> 
            </div>
          </div>
          <button class="ml-7 hidden sm:block ">Subscribe</button>`);
          searchVideoCon.appendChild(div);
            
      }
       else if(e.id.kind=="youtube#video"){
            let div = document.createElement("div");
            let className = `flex flex-col justify-start sm:flex-row items-start w-[100%] sm:rounded-xl cursor-pointer show-hover-video-comp sm:w-[96%] lg:w-[97%] mx-auto my-2 sm:my-4`;
            div.setAttribute("class" , className);
            div.addEventListener("click" , function(){
                window.location.href =`http://127.0.0.1:5500/pages/video.html?videoId=${e.id.videoId}`;
            });
            let thumbnail = e.snippet.thumbnails.medium.url;
            let title = e.snippet.title;
            let channeltitle = e.snippet.channelTitle;
            let publishAt = e.snippet.publishTime;
            let videoDetail = await getVideoDetailByVideoId(e.id.videoId);
            let videoStatistics = videoDetail.items[0].statistics;
            let codedDuration = videoDetail.items[0].contentDetails.duration;
            let duration = getDuration(codedDuration);
            let [detail ,logo] = await channelDetail(e.snippet.channelId);
            
            div.insertAdjacentHTML("afterbegin" , `
            <div
              class=" w-full sm:w-1/2 lg:w-1/3 relative overflow-hidden mr-4"
            >
              <img
                src="${thumbnail}"
                class=" w-full sm:rounded-xl overflow-hidden"
                alt="thumbnail"
              />
              <div
                class="text-white rounded-sm absolute bottom-0 right-0 z-50"
                style="
                  position: absolute;
                  background: rgba(0, 0, 0, 0.7);
                  padding: 2px 5px;
                  font-size: 0.7rem;
                  right: 8px;
                  bottom: 8px;
                "
              >
                ${duration}
              </div>
              <div
                class="absolute z-[1000] -right-full p-1 video-comp"
                style="top: 3px"
              >
                <svg
                  class="bg-black p-1 w-[24px] sm:w-[30px] "
                  width="24"
                  height="24"
                  focusable="false"
                  style="
                    pointer-events: none;
                    display: block;
                    height: 100%;
                    filter: invert(1);
                    background: white;
                  "
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M22 7H2v1h20V7zm-9 5H2v-1h11v1zm0 4H2v-1h11v1zm2 3v-8l7 4-7 4z"
                  />
                </svg>
                <svg
                  class="mt-1 p-1 "
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  focusable="false"
                  style="
                    pointer-events: none;
                    display: block;
                    height: 100%;
                    filter: invert(1);
                    background: white;
                  "
                >
                  <path
                    d="M17 18v1H6v-1h11zm-.5-6.6-.7-.7-3.8 3.7V4h-1v10.4l-3.8-3.8-.7.7 5 5 5-4.9z"
                  />
                </svg>
              </div>
            </div>
            <div class="flex items-start justify-between w-full p-4 px-2 sm:px-1 sm:p-0 sm:w-[60%] lg:w-[75%] video-details">
              <div class="flex items-start">
                <img class="w-[6rem] mr-4 rounded-full block sm:hidden overflow-hidden sm:w-9" src="${logo}" />
                <div class="">
                  <h2
                    class="text-black text-sm sm:text-lg line-clamp-2 text-overflow overflow-hidden"
                  >
                    ${title}
                  </h2>

                  <p class="text-gray-700 text-xs sm:text-sm line-clamp-1 sm:mt-1 mb-1 sm:mb-3">
                    ${videoStatistics.viewCount /1000}k views • Streamed ${publishAt}
                  </p>
                  <div class="flex gap-2">
                    <img class="w-9 rounded-full hidden sm:block overflow-hidden sm:w-9" src="${logo}" />
                    <p class="text-gray-700 text-sm mt-1 line-clamp-1 ">
                      ${channeltitle}
                    </p>
                  </div>
                </div>
              </div>
              <i class=" mt-2 text-xl ml-5 sm:ml-3"
              > <svg enable-background="new 0 0 24 24" height="24" viewBox="0 0 24 24" width="24" focusable="false" style="pointer-events: none; display: block; width: 19px; height: 100%;"><path d="M12 16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5zM10.5 12c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5zm0-6c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5-1.5.67-1.5 1.5z"/></svg></i
            >
            </div>

            `);
            searchVideoCon.appendChild(div);
        }
        else if(e.id.kind == "youtube#playlist" ){
           
        }
    });
}

searchVideoCon.addEventListener("scroll" , function(){
    
      if (scrollTrigger && this.scrollHeight < this.scrollTop + 700)
      {
        if(nextToken !== undefined ){
          scrollTrigger=false;
          // alert(nextToken)
          sendSearchDataRequest(query,40,nextToken);
          // console.log("triggered" , nxtToken);
        }
        
      }
    //  console.log(e.scrollHeight, e.scrollTop + 700);
    });
