const lenis = new Lenis();

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 900);
});

gsap.ticker.lagSmoothing(0);
const loadingOverlay = document.getElementById('loading-overlay');
const images = document.querySelectorAll('img');
const videos = document.querySelectorAll('video');
videos.forEach(video => video.pause());
document.body.style.overflow = "hidden";

function areAllLoaded(images, videos) {

  for (let i = 0; i < images.length; i++) {
    if (!images[i].complete) {
      return false;
    }
  }
  for (let i = 0; i < videos.length; i++) {
    if (videos[i].readyState !== 4) { 
      return false;
    }
  }
  return true;
}


window.addEventListener('load', function() {
  const startTime = performance.now(); 


  if (areAllLoaded(images, videos)) {
    hideLoader(startTime); 
  } else {
    
    images.forEach(image => {
      image.addEventListener('load', () => {
        hideLoader(startTime);
      });
    });

    videos.forEach(video => {
      video.addEventListener('loadedmetadata', () => {
        hideLoader(startTime);
      });
    });
  }
});


function hideLoader(startTime) {
  const elapsedTime = performance.now() - startTime;

  
  const minDuration = 2000; 
  const delay = Math.max(minDuration - elapsedTime, 0); 
  console.log(elapsedTime);
  setTimeout(() => {
    document.body.style.overflow = "visible";
    gsap.to(loadingOverlay, { 
      duration: 1, yPercent: -100, ease: "power2.out",
      onComplete: () => {
      loadingOverlay.style.visibility = 'hidden';
    }});
    videos.forEach(video => video.play());    
  }, delay);
}



const body = document.body;
let lastScroll = 0;

lenis.on("scroll", (instance) => {
  let currentScroll = instance.scroll;
  if (currentScroll <= 0) {
    body.classList.remove("scroll-up");
  }
  if (currentScroll > lastScroll && !body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-up");
    body.classList.add("scroll-down");
  }
  if (currentScroll < lastScroll && body.classList.contains("scroll-down")) {
    body.classList.remove("scroll-down");
    body.classList.add("scroll-up");
  }

  lastScroll = currentScroll;
});

let sections = gsap.utils.toArray(".section");
console.log(sections);
sections.forEach((section) => {
  gsap.to(section, {
    yPercent: 100,
    ease: "none",
    scrollTrigger: {
      trigger: section,
      start: "bottom bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});

const track = document.getElementById("image-track");

const handleOnDown = (e) => (track.dataset.mouseDownAt = e.clientX);

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";
  track.dataset.prevPercentage = track.dataset.percentage;
};

const handleOnMove = (e) => {
  if (track.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
    maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100,
    nextPercentageUnconstrained =
      parseFloat(track.dataset.prevPercentage) + percentage,
    nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -80);

  track.dataset.percentage = nextPercentage;

  track.animate(
    {
      transform: `translate(${nextPercentage}%, -50%)`,
    },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of track.getElementsByClassName("image")) {
    image.animate(
      {
        objectPosition: `${100 + (nextPercentage + 10)}% center`,
      },
      { duration: 1200, fill: "forwards" }
    );
  }
};

window.onmousedown = (e) => handleOnDown(e);

window.ontouchstart = (e) => handleOnDown(e.touches[0]);

window.onmouseup = (e) => handleOnUp(e);

window.ontouchend = (e) => handleOnUp(e.touches[0]);

window.onmousemove = (e) => handleOnMove(e);

window.ontouchmove = (e) => handleOnMove(e.touches[0]);

// gsap.to("#page2 .cards",{
//     xPercent:-120,
//     ease:"none",
//     scrollTrigger:{
//         trigger:'#page2',
//         scroller:'body',
//         start:"top 0%",
//         end:'top -100%',
//         pin:true,
//         scrub:1
//     }
// })

gsap.to("#page3 .video-div", {
  width: "100%",
  height: "100%",
  ease: "expoScale(0.5,7,none)",
  duration: 2,
  scrollTrigger: {
    trigger: "#page3 .video-div",
    scroller: "body",
    start: "top bottom",
    end: "bottom bottom",
    scrub: true,
  },
});

gsap.from("#page3 .overlay", {
  opacity: 0,
  ease: "easeInOut",
  duration: 3,
  delay: 1,
  scrollTrigger: {
    trigger: "#page3",
    scroller: "body",
    start: "top top",
    end: "top top",
    scrub: true,
  },
});

const isMobile = window.matchMedia("(max-width: 768px)");

if (!isMobile.matches) {
    gsap.to("#shows .scroll-heading", {
        xPercent: -650,
        scrollTrigger: {
            trigger: "#shows",
            scroller: "body",
            start: "top 0",
            end: "top -300%",
            scrub: 3,
            pin: "#shows",
        },
    });
}
if (!isMobile.matches){
  gsap.from(".page4 img", {
    yPercent: 100,
    stagger: 1,
    scrollTrigger: {
      trigger: ".page4",
      scroller: "body",
      start: "top 0%",
      end: "top -200%",
      pin: true,
      scrub: 2,
    },
  });
}else{
  gsap.from(".page4 img", {
    yPercent: 100,
    stagger: 1,
    scrollTrigger: {
      trigger: ".page4",
      scroller: "body",
      start: "top 0%",
      end: "top -50%",
      pin: true,
      scrub: 2,
    },
  });
}

const galleryContainer = document.querySelector(".model-container");
const galleryItems = document.querySelectorAll(".model");
const indicator = document.querySelector(".circle");

let defaultItemFlex = "0 1 10vw";
let hoverItemFlex = "1 1 50vw";

const updateGalleryItems = () => {
  galleryItems.forEach((item) => {
    if (isMobile.matches) {
      defaultItemFlex = "0 1 30vw";
      item.style.flex = defaultItemFlex
    } else {
      flex = item.isHovered ? hoverItemFlex : defaultItemFlex;
    }

    item.style.flex = flex;
  });
};


galleryItems[0].isHovered = true;
updateGalleryItems();

galleryItems.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    galleryItems.forEach((otherItem) => {
      otherItem.isHovered = otherItem === item;
    });
    updateGalleryItems();
  });
});

galleryContainer.addEventListener("mousemove", (e) => {
  indicator.style.left = `${
    e.clientX - galleryContainer.getBoundingClientRect().left
  }px`;
});

//toggle reset button

function toggleResetBtn() {
  const resetBtn = document.querySelector('.reset');
  resetBtn.classList.toggle('active');
}

// Switch left, right, and middle
function switchBanner(event, name) {
  event.preventDefault();
  const page5 = document.querySelector('#page5');
  if (!page5.classList.contains(name)) {
      page5.className = 'page5';
      page5.classList.add(name);
      toggleResetBtn();
  }
  if (window.innerWidth <= 600) { // Hide switch buttons only on mobile view
      hideSwitchButtons();
  }
}

// Reset Banner
function resetBanner(event) {
  event.preventDefault();
  const page5 = document.querySelector('#page5');
  page5.className = 'page5';
  toggleResetBtn();
  if (window.innerWidth <= 600) { // Show switch buttons only on mobile view
      showSwitchButtons();
  }
}

// Hide switch buttons
function hideSwitchButtons() {
  const switchButtons = document.querySelectorAll('.switch-btn');
  switchButtons.forEach(button => {
      button.style.display = 'none';
  });
}

// Show switch buttons
function showSwitchButtons() {
  const switchButtons = document.querySelectorAll('.switch-btn');
  switchButtons.forEach(button => {
      button.style.display = 'block';
  });
}