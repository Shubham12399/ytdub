let focusor = document.querySelector(".focusor");
let loader = document.querySelector(".loader");
let nav = document.querySelector(".navigation");
let postBody = document.querySelector(".post-body");
let home = document.querySelector(".home");
let explore = document.querySelector(".explore");
let create = document.querySelector(".create");
let subscription = document.querySelector(".subscription");
let library = document.querySelector(".library");
var poChild = document.querySelectorAll(".po-child");
var navPostSec = document.querySelector(".nav-post-sec");
let footer = document.querySelector("footer");
let toggle = true;

//if(window.navigator.onLine){
//console.log("online");
//}
// loading function
let bodyLoader = () => {
  setTimeout(() => {
    loader.style.display = "none";
  }, 1500);
  document.body.style.overflow = "auto";
};
function toggleIconName() {
  if (toggle == true) {
    for (let i = 0; i < 3; i++) {
      let border = document.getElementsByClassName("icons-nav-sec")[i];
      border.style.borderBottom = "3px solid transparent";
    } // for

    //    iconName.style.width='0px';
    nav.style.width = "50px";
    toggle = false;
    postBody.style.width = "calc(100vw - 50px)";
    // } // for
  } // if
  else {
    for (let i = 0; i < 3; i++) {
      let border = document.getElementsByClassName("icons-nav-sec")[i];
      border.style.borderBottom = "3px solid #f3f3f3";
    }
    //    iconName.style.width='100px';
    nav.style.width = "160px";
    toggle = true;
    postBody.style.width = "calc(100vw - 160px)";
    //    }
  } // else
}

let toggle2 = true;

let iEffects = document.getElementsByClassName("i-effect");

for (let i = 0; i < iEffects.length + 1; i++) {
  let iEffect = iEffects[i];
  // ADDEVENTLISTNER
  iEffect?.addEventListener("click", () => {
    iEffect.style.setProperty("--anim", "i-effect-anim .5s ease");

    for (var p = 0; p < iEffects.length + 1; p++) {
      var iFill = document.querySelectorAll("i");
      iFill[p].classList.replace(
        "material-icons-round",
        "material-symbols-rounded"
      );
    }

    iEffect.classList.replace(
      "material-symbols-rounded",
      "material-icons-round"
    );

    let icon = 9;
    if (iEffect.innerText == "home") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        poChild[0].style.filter = "blur(0px)";
        poChild[0].style.overflow = "auto";
        if (i == 0) {
          continue;
        }
        poChild[i].style.display = "none";
      }
    } else if (iEffect.innerText == "explore") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        poChild[0].style.display = "block";
        poChild[0].style.filter = "blur(4px)";
        poChild[0].style.overflow = "hidden";
        if (i == 1) {
          continue;
        }
        poChild[i].style.display = "none";
      }
    } else if (iEffect.innerText == "add_circle") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        if (i == 2) {
          continue;
        }
        poChild[i].style.display = "none";
        focusor.style.display = "block";
      }
    } else if (iEffect.innerText == "subscriptions") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        if (i == 3) {
          continue;
        }
        poChild[i].style.display = "none";
      }
    } else if (iEffect.innerText == "video_library") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        if (i == 4) {
          continue;
        }
        poChild[i].style.display = "none";
      }
    } else if (iEffect.innerText == "notifications") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        if (i == 5) {
          continue;
        }
        poChild[i].style.display = "none";
      }
    } else if (iEffect.innerText == "cast") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        if (i == 6) {
          continue;
        }
        poChild[i].style.display = "none";
      }
    } else if (iEffect.innerText == "search") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        if (i == 7) {
          continue;
        }
        poChild[i].style.display = "none";
      }
    } else if (iEffect.innerText == "account_circle") {
      for (let i = 0; i < icon; i++) {
        poChild[i].style.display = "block";
        if (i == 8) {
          continue;
        }
        poChild[i].style.display = "none";
      }
    }

    setTimeout(() => {
      iEffect.style.setProperty("--anim", "none");
    }, 500);
  });
}

// tap the icon and show pages

let videoInterface = document.querySelector(".video-interface");
let videoHtml = document.querySelector("#video");
var gridItemsArr = [];
var newgridItemsArr = [];

for (let r = 0; r < 13; r++) {
  var gridItems = document.querySelectorAll(".grid-items")[r];
  gridItemsArr.push(gridItems);
}
for (let v = 0; v < 13; v++) {
  var videoInterfaceItems = document.querySelectorAll(".videoInterfaceSlider")[
    v
  ];
  newgridItemsArr.push(videoInterfaceItems);
}
gridItemsArr.forEach(function (item, index, arrays) {
  item?.addEventListener("click", function () {
    videoHtml.innerHTML = `<video controls autoplay poster ="/storage/emulated/0/Images/Youtube thumbnail/img${index}.jpg">
    <source src="/storage/emulated/0/Videos Of You Tube/vid${index}.mp4"       
                        type="video/mp4" >
                                                                  
                    </video>`;
    playVideo();
    let video = document.querySelector("video");
    video.play();
  });
});
newgridItemsArr.forEach(function (el, index, array) {
  el?.addEventListener("click", () => {
    videoHtml.innerHTML = `<video controls autoplay poster ="/storage/emulated/0/Images/Youtube thumbnail/img${
      index + 1
    }.jpg">
   
       <source src="/storage/emulated/0/Videos Of You Tube/vid${
         index + 1
       }.mp4"       
                        type="video/mp4" > 
                    </video>`;
    array.forEach((l) => {
      el.style.display = "flex";
    });
    el.style.display = "none";
    playVideo();
    let video = document.querySelector("video");
    video.play();
  });
});

function playVideo() {
  navPostSec.style.display = "none";
  videoInterface.style.display = "grid";
  videoInterface.style.background = "white";
  footer.style.display = "none";
}
function backVideoInterface() {
  videoInterface.style.display = "none";
  videoInterface.style.background = "white";
  footer.style.display = "flex";
  navPostSec.style.display = "flex";
  let video = document.querySelector("video");
  video?.pause();
  gridItemsArr.forEach((e) => {
    //e.style.display='block !important'; /* right section video */
  });
}
let commentAddCon = document.querySelector(".commentAddCon");
let commentValue = document.querySelector("#commentValue");
let commentTime = new Date();
let numberOfComment = document.querySelector("#numberOfComment");
//let arrCommentNo=[];
function addComment() {
  let commentHTML = `<div class="comments"><div class="com-user"><img src="/storage/emulated/0/Images/pngwing.com (21).png" alt=""></img><span> Edited on ${commentTime.toLocaleDateString()} ago.</span></div><div class="com-text"><p>${
    commentValue.value
  }</p></div><hr></div>`;
  if (commentValue.value.replace(/\s/g, "").length == 0) {
    commentAddCon.innerHTML += "";
  } else {
    commentAddCon.innerHTML += commentHTML;
    localStorage.setItem("comm", commentAddCon.innerHTML);
    Htmlcomment();
  }
  commentValue.value = "";
}
let Htmlcomment = () => {
  commentAddCon.innerHTML = localStorage.getItem("comm");
  let array = Array.from(commentAddCon.children);
  numberOfComment.textContent = array.length;
};
Htmlcomment();
//localStorage.removeItem('comm');
// console.log(n.replace(/\s/g, "").length);
function closeexplore() {
  //document.body.style="background:red;"
  setTimeout(() => {
    poChild[0].style.filter = "blur(0px)";
    poChild[0].style.overflow = "auto";
    poChild[1].style.display = "none";
  }, 300);
}
