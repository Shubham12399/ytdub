const barMenu = document.querySelector("#bar_menu");
const closeBarMenu = document.querySelector("#close_bar_menu");
const snipMenu = document.querySelector("#snip-menu-id");
const cstmWManage = document.querySelector("#cstm-w-manage-id");
const allPostItems = Array.from(document.querySelectorAll(".post-item"));
const postCon = Array.from(document.querySelectorAll(".post-container"));
const pageLinkArray = Array.from(document.querySelectorAll(".pg-link"));

// const videoContainer = Array.from(document.querySelector('.video-container'));
// if i am using arrow function in event listener this keywoard return window object
barMenu.addEventListener("click", function () {
  this.classList.toggle("hover_effect");
  // snipMenu.classList.toggle("snip-menu");
  // cstmWManage.classList.toggle("cstm-w-manage");
  if (document.body.clientWidth >= 640 && document.body.clientWidth < 1024 ) {
    snipMenu.classList.add("snip-menu");
    cstmWManage.classList.add("cstm-w-manage");
    snipMenu.classList.toggle("left-zero");
  } else {
    snipMenu.classList.toggle("snip-menu");
    cstmWManage.classList.toggle("cstm-w-manage");
    snipMenu.classList.remove("left-zero");
  }
  allPostItems.forEach((postItem) => {
    postItem.classList.toggle("lg-w-manage");
  });
  postCon.forEach((postConElem) => {
    postConElem.classList.toggle("post-lg-con");
  });
  
});

// alert("tststst")
closeBarMenu.addEventListener("click" , ()=>{
  snipMenu.classList.toggle("snip-menu");
  snipMenu.classList.toggle("left-zero");
});
function createSnipLinkToolTip(linkToolTipName) {
  // alert("helo")
  return `<span class="tooltip-link">${linkToolTipName}</span>`;
}

pageLinkArray.forEach((linkElem, index) => {
  let snipLinkToolTip = createSnipLinkToolTip(
    linkElem.querySelector(".lg-menu-link").textContent
  );
  // console.log(snipLinkToolTip);
  document
    .querySelectorAll(".pg-link")
    [index].insertAdjacentHTML("beforeend", snipLinkToolTip);
});

const postItems = Array.from(document.querySelectorAll('.post-item'));

// postItems.forEach((e)=>{
//   e.addEventListener("click" , ()=>{
//     window.location.pathname="/pages/video.html"
//     // console.log(window.location.pathname)
//   })
// })