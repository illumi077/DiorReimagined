const lenis = new Lenis()

lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 900)
})

gsap.ticker.lagSmoothing(0)

const body = document.body;
let lastScroll = 0

lenis.on('scroll',(instance)=>{
    let currentScroll = instance.scroll;
    if (currentScroll <= 0){
        body.classList.remove('scroll-up')
    } 
    if (currentScroll > lastScroll && !body.classList.contains('scroll-down')){
        body.classList.remove('scroll-up')
        body.classList.add('scroll-down')
    }
    if (currentScroll < lastScroll && body.classList.contains('scroll-down')){
        body.classList.remove('scroll-down')
        body.classList.add('scroll-up')
    }

    lastScroll = currentScroll;

})

let sections = gsap.utils.toArray('.section')
console.log(sections);
sections.forEach(section => {
    gsap.to(section,{
        yPercent:100,
        ease:'none',
        scrollTrigger:{
            trigger:section,
            start:'bottom bottom',
            end:'bottom top',
            scrub:true
        }
    })
});

const track = document.getElementById("image-track");

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -80);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) {
    image.animate({
      objectPosition: `${100 + (nextPercentage + 10)}% center`
    }, { duration: 1200, fill: "forwards" });
  }
}

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);

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


gsap.to('#page3 .video-div',{
  width: '100%',
  height: '100%',
  ease: "expoScale(0.5,7,none)",
  duration:2,
  scrollTrigger:{
    trigger:"#page3 .video-div",
    scroller:"body",
    start:"top bottom",
    end:"bottom bottom",
    scrub:true
  }
})

gsap.from('#page3 .overlay',{
  opacity:0,
  ease:'easeInOut',
  duration:3,
  delay:1,
  scrollTrigger:{
    trigger:'#page3',
    scroller:'body',
    start:"top top",
    end:"top top",
    scrub:true,
  }
})

gsap.to('#shows .scroll-heading',{
  xPercent:-705,
  scrollTrigger:{
    trigger:'#shows',
    scroller:'body',
    start:"top 0",
    end:"top -300%",
    scrub:3,
    pin:"#shows"
  }
})


const galleryContainer = document.querySelector('.model-container')
const galleryItems = document.querySelectorAll('.model')
const indicator = document.querySelector('.circle')

const defaultItemFlex = "0 1 10vw"
const hoverItemFlex = "1 1 50vw"

const updateGalleryItems = () => {
  galleryItems.forEach((item)=>{
    let flex = defaultItemFlex;
    if (item.isHovered){
      flex = hoverItemFlex;
    }
    item.style.flex = flex;
  })
};
galleryItems[0].isHovered = true;
updateGalleryItems();

galleryItems.forEach((item) => {
  item.addEventListener("mouseenter",() => {
    galleryItems.forEach((otherItem) => {
      otherItem.isHovered = otherItem === item;
    });
    updateGalleryItems();
  });
});

galleryContainer.addEventListener('mousemove', (e) => {
  indicator.style.left = `${
    e.clientX - galleryContainer.getBoundingClientRect().left
  }px`
})