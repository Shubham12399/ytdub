import {myApiKeyRef as myApiKey} from "./refrences.js";
import {channelIdRef as channelId}  from "./refrences.js";


async function getVideoDetailByVideoId(videoId){
    let videoDetail = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${myApiKey}
    `);
    videoDetail = await videoDetail.json();
    console.log("videoDetails : " , videoDetail);
    return videoDetail;
};


// async function getVideoData() {
//   // let videoRes = await fetch(
//   //   `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=UCPzqyqw2SFjU24g0aN_5CzQ&part=snippet%2Cid&order=date&maxResults=50`
//   // );
//   let videoRes = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&part=snippet&maxResults=100&chart=mostPopular`
//   );
  
//   let res_three = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=UCc7gpqMnnOSbU_F2-5MVVZw&part=snippet%2Cid&order=date&maxResults=50`
//   );
//   let res_two = await fetch(
//     `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=UCWdnZ4Whvgo_1mKJSl48emA&part=snippet%2Cid&order=date&maxResults=50`
//   );
//   videoRes = await videoRes.json();
//   res_two = await res_two.json();
//   res_three = await res_three.json();
//   videoRes.items = [...videoRes.items , ...res_two.items , ...res_three.items];
//   // console.log(videoRes.items)
//   return videoRes;
//   // console.log(videoRes)
// };

async function getVideoData(maxResult,pageToken) {

  // let videoRes = await fetch(
  //   `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=UCPzqyqw2SFjU24g0aN_5CzQ&part=snippet%2Cid&order=date&maxResults=50`
  // );
  let videoRes = await fetch(
    `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&part=snippet&maxResults=${maxResult}&chart=mostPopular${pageToken==null?"":"&pageToken=" + pageToken}`
  );
  
  console.log(`https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&part=snippet&maxResults=${maxResult}&chart=mostPopular${pageToken==null?"":"&pageToken=" + pageToken}`)
  console.log("pagetoke" , pageToken);
  // let res_three = await fetch(
  //   `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=UCc7gpqMnnOSbU_F2-5MVVZw&part=snippet%2Cid&order=date&maxResults=${maxResult}`
  // );
  // let res_two = await fetch(
  //   `https://www.googleapis.com/youtube/v3/search?key=${myApiKey}&channelId=UCWdnZ4Whvgo_1mKJSl48emA&part=snippet%2Cid&order=date&maxResults=${maxResult}`
  // );
  videoRes = await videoRes.json();
  // res_two = await res_two.json();
  // res_three = await res_three.json();
  // videoRes.items = [...videoRes.items , ...res_two.items , ...res_three.items];
  videoRes.items = [...videoRes.items ];
  let nextPageToken = videoRes.nextPageToken;
  console.log("nexttoken" , nextPageToken)
  // console.log(videoRes.items)
  return [videoRes,nextPageToken];
  // console.log(videoRes)
};




export default getVideoData;
export const getVideoDetailByVideoIdRef = getVideoDetailByVideoId;
