document.addEventListener("DOMContentLoaded", () => {
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
  


  // function videoUpdatingSrc() {
  //   const videos = document.querySelectorAll("#myVideo"); // Select all videos with the same ID
  
  //   videos.forEach((video) => {
  //     let src = video.currentSrc || video.src;
  //     console.log(video, src);
  
  //     function once(el, event, fn, opts) {
  //       var onceFn = function (e) {
  //         el.removeEventListener(event, onceFn);
  //         fn.apply(this, arguments);
  //       };
  //       el.addEventListener(event, onceFn, opts);
  //     }
  
  //     once(document.documentElement, "touchstart", function (e) {
  //       video.play();
  //       video.pause();
  //     });
  
  //     let tl = gsap.timeline({
  //       defaults: { duration: 1 },
  //       scrollTrigger: {
  //         trigger: ".sticky__elements--section2",
  //         start: "top top",
  //         end: "bottom bottom",
  //         scrub: true,
  //       },
  //     });
  
  //     once(video, "loadedmetadata", () => {
  //       tl.fromTo(
  //         video,
  //         {
  //           currentTime: 0,
  //         },
  //         {
  //           currentTime: video.duration || 1,
  //         }
  //       );
  //     });
  
  //     if (window["fetch"]) {
  //       fetch(src)
  //         .then((response) => response.blob())
  //         .then((response) => {
  //           var blobURL = URL.createObjectURL(response);
  //           var t = video.currentTime;
  //           once(document.documentElement, "touchstart", function (e) {
  //             video.play();
  //             video.pause();
  //           });
  
  //           video.setAttribute("src", blobURL);
  //           video.currentTime = t + 0.01;
  //         });
  //     }
  //   });
  // }
  
  // videoUpdatingSrc();

  function updatingSrc() {
    // Select all videos with the class 'myVideo'
    const videos = document.querySelectorAll('.myVideo');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    let isScrolling;
    let lastTimeUpdate = 0; // To track the last time the video time was updated
  
    window.addEventListener('scroll', () => {
      // Clear timeout to prevent pausing while scrolling
      clearTimeout(isScrolling);
  
      // Limit the frequency of updates to once per animation frame
      requestAnimationFrame(() => {
        // Loop through each video and update based on scroll position
        videos.forEach(video => {
          // Get the scroll position and the video position in the document
          const scrollPosition = window.scrollY;
          const videoRect = video.getBoundingClientRect();
  
          // Calculate the scroll percentage for the specific video
          const scrollPercentage = Math.min(
            (scrollPosition - videoRect.top + window.innerHeight) / (documentHeight),
            1
          );
  
          // Play the video immediately when it enters the viewport
          if (videoRect.top <= window.innerHeight && videoRect.bottom >= 0 && video.paused) {
            video.play().catch(error => {
              // Handle any play() errors, like autoplay restrictions
              console.error('Video play failed:', error);
            });
          }
  
          // Update the video's current time based on the scroll percentage (only if the video is in the viewport)
          if (videoRect.top <= window.innerHeight && videoRect.bottom >= 0) {
            // Only update if it's not already updated recently (to prevent excessive updates)
            if (performance.now() - lastTimeUpdate > 16) { // 16ms = ~60 FPS
              video.currentTime = scrollPercentage * video.duration;
              lastTimeUpdate = performance.now(); // Update the time of last update
            }
          }
  
          // Pause the video when it's out of the viewport
          if (videoRect.bottom < 0 || videoRect.top > window.innerHeight) {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      });
  
      // Set a timeout to pause videos after scrolling stops
      isScrolling = setTimeout(() => {
        videos.forEach(video => {
          if (!video.paused) {
            video.pause();
          }
        });
      }, 2); // Adjust delay as needed (shorter for quicker pause)
    });
  }

    updatingSrc();
  

  
  
  
  
});


