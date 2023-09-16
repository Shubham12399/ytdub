// function addVideoIntoPlaylist(data) {
//     // let channelName = channelDetail.items[0].snippet.title;
//     data.items.map((videoObj) => {
//       // let videoDetails = getEachVideoDetails(videoObj[0].id.videoId);
//       // console.log(videoObj[0].id.videoId);
//       // let videoStatistics = videoDetails.items[0].statistics;
//       let thumbnail = videoObj.snippet.thumbnails.medium.url;
//       let title = videoObj.snippet.title;
//       let channelTitle = videoObj.snippet.channelTitle;
//       playlistVideos.forEach((e, i) => {
//         const classList = `flex justify-start items-start w-full rounded-xl cursor-pointer  post-item mb-0 pr-2 py-1 hover:bg-gray-200 playlist-video-item`;
//         const parentDiv = document.createElement("div");
//         parentDiv.addEventListener("click", function(){
//           alert("hello")
//           localStorage.setItem("thumbnail" , thumbnail);
//           videoThumbnail.setAttribute("src" , localStorage.getItem('thumbnail'));
//           window.location.reload();
//         });
//         parentDiv.setAttribute("class", classList);
//         parentDiv.insertAdjacentHTML(
//           "afterbegin",
//           `
//                          <i class="material-symbols-rounded text-4xl i-effect mr-0 text-gray-700 mt-4 pl-2">arrow_left</i>
//                          <div class="flex justify-between w-full ">
//                          <div class="px-0 py-0 ml-1 pb-1 flex items-start justify-start video-details ">
//                            <div class="pb-0 play-video-playlist-video-item-thumbnail">
//                              <img src="${thumbnail}" class="rounded-lg w-full overflow-hidden" alt="thumbnail" />
//                            </div>
                   
//                              <div class="flex items-start ml-4 ">
//                                <div class="ml-0">
//                                  <h2
//                                    class="text-black text-sm max-h-10 font-medium text-overflow overflow-hidden h-14 line-clamp-2">
//                                    ${title}
//                                  </h2>
                   
//                                  <p class="text-gray-700 text-xs mt-0">
//                                   ${channelTitle}
//                                  </p>
//                                </div>
//                              </div>
//                            </div>
//                            <i class="material-symbols-rounded mt-2 text-xl ml-3">more_vert</i>
//                          </div>`
//         );
//         e.appendChild(parentDiv);
//       });
  
//       function insertVideoIntoPlayVideoVideosCon(){
//         const classList = `flex justify-between items-start w-full rounded-xl cursor-pointer post-item mb-0 mx-1 my-2`;
//         const parentDiv = document.createElement("div");
//         parentDiv.addEventListener("click", function(){
//           localStorage.setItem("thumbnail" , thumbnail);
//           videoThumbnail.setAttribute("src" , localStorage.getItem('thumbnail'));
//           this.outerHTML = '';
//           window.location.reload();
//           alert("helllll")
//         });
//         parentDiv.setAttribute("class" , classList);
//         parentDiv.insertAdjacentHTML("afterbegin" , `<div class="flex justify-start">
//         <div class="pb-0 play-video-video-img-con">
//           <img
//             src="${thumbnail}"
//             class="rounded-lg w-full overflow-hidden"
//             alt="thumbnail"
//           />
//         </div>
  
//         <div
//           class="px-0 py-0 ml-4 pb-1 flex items-start justify-start video-details"
//         >
//           <div class="flex items-start">
//             <div class="ml-0">
//               <h2
//                 class="text-black text-sm max-h-10 font-medium text-overflow overflow-hidden h-14 line-clamp-2"
//               >
//                 ${title}
//               </h2>
//               <p class="line-clamp-1 text-sm mt-1 text-gray-600">
//                 ${channelTitle}
//               </p>
//               <p class="text-gray-700 text-xs mt-0">
//                 7k views - 2 days ago
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <i class="material-symbols-rounded mt-2 text-xl ml-3"
//         >more_vert</i
//       >`);
//         playVideoVideosCon.appendChild(parentDiv);
//       }
//       insertVideoIntoPlayVideoVideosCon();
//     });
//   }
  
//   addVideoIntoPlaylist(videosApi);
//   videoThumbnail.setAttribute("src" , localStorage.getItem('thumbnail')!==null ? localStorage.getItem('thumbnail'): null );
//   // setThumbnail();
  