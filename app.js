document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);


const lenis = new Lenis();
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  lenis.raf(time * 1000)
});
gsap.ticker.lagSmoothing(0);


  gsap.to(".has__moving--img", {
    immediateRender: false,
    top: "20%",
    scrollTrigger: {
      trigger: ".sticky__elements--section2",
      start: "top 50%",
      end: "80% 90%",
      scrub: 1,
      toggleActions: "play none none reset",
    },

    duration: 1,
  });
  gsap.to(".has__moving--img", {
    immediateRender: false,
    top: "50%",
    scrollTrigger: {
      trigger: ".sticky__elements--section3",
      start: "top 50%",
      end: "80% 90%",
      scrub: 1,
      toggleActions: "play none none reset",
     
      
    },
    
    duration: 1,
  });

  function videoScalingAnimation() {
    if (window.innerWidth > 768) {
      // Target each section and apply the animation
      document.querySelectorAll(".video_scale_animation-main").forEach((section) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: section, 
            start: "top top", 
            end: "+=" + (window.innerHeight * 5), 
            scrub: 0.2, 
            markers: false, 
            pin: true, 
          }
        })
        .from(section.querySelector(".has_video_scale"), {
          scale: 0.7,
          borderRadius: "20px",
        })
        .to(section.querySelector(".has_video_scale"), {
          scale: 1,
          borderRadius: "0px",
        });
      });
    }
  }
  
  videoScalingAnimation();
  


  function videoUpdatingSrc() {
    const videos = document.querySelectorAll("#myVideo"); // Select all videos with the same ID
  
    videos.forEach((video) => {
      let src = video.currentSrc || video.src;
      console.log(video, src);
  
      function once(el, event, fn, opts) {
        var onceFn = function (e) {
          el.removeEventListener(event, onceFn);
          fn.apply(this, arguments);
        };
        el.addEventListener(event, onceFn, opts);
      }
  
      once(document.documentElement, "touchstart", function (e) {
        video.play();
        video.pause();
      });
  
      let tl = gsap.timeline({
        defaults: { duration: 1 },
        scrollTrigger: {
          trigger: ".sticky__elements--section2",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
  
      once(video, "loadedmetadata", () => {
        tl.fromTo(
          video,
          {
            currentTime: 0,
          },
          {
            currentTime: video.duration || 1,
          }
        );
      });
  
      if (window["fetch"]) {
        fetch(src)
          .then((response) => response.blob())
          .then((response) => {
            var blobURL = URL.createObjectURL(response);
            var t = video.currentTime;
            once(document.documentElement, "touchstart", function (e) {
              video.play();
              video.pause();
            });
  
            video.setAttribute("src", blobURL);
            video.currentTime = t + 0.01;
          });
      }
    });
  }
  
  videoUpdatingSrc();
  
});


