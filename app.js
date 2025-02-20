
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
  

  function updatingSrc() {
    
    const videos = document.querySelectorAll('.myVideo');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    let isScrolling;
    let lastTimeUpdate = 0; 
  
    window.addEventListener('scroll', () => {
      
      clearTimeout(isScrolling);
  
      
      requestAnimationFrame(() => {
        
        videos.forEach(video => {
          
          const scrollPosition = window.scrollY;
          const videoRect = video.getBoundingClientRect();
  
          
          const scrollPercentage = Math.min(
            (scrollPosition - videoRect.top + window.innerHeight) / (documentHeight),
            1
          );
  
          
          if (videoRect.top <= window.innerHeight && videoRect.bottom >= 0 && video.paused) {
            video.play().catch(error => {
              
              console.error('Video play failed:', error);
            });
          }
  
          
          if (videoRect.top <= window.innerHeight && videoRect.bottom >= 0) {
            
            if (performance.now() - lastTimeUpdate > 16) { 
              video.currentTime = scrollPercentage * video.duration;
              lastTimeUpdate = performance.now(); 
            }
          }
  
          
          if (videoRect.bottom < 0 || videoRect.top > window.innerHeight) {
            if (!video.paused) {
              video.pause();
            }
          }
        });
      });
  
      
      isScrolling = setTimeout(() => {
        videos.forEach(video => {
          if (!video.paused) {
            video.pause();
          }
        });
      }, 2); 
    });
  }

    updatingSrc();
  

  
  
  
  


