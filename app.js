
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
    if (window.innerWidth > 0) {
      // Target each section and apply the animation
      document.querySelectorAll(".video_scale_animation-main").forEach((section) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: section, 
            start: "top top", 
            end: "+=" + (window.innerHeight * 6), 
            scrub: 0.3, 
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
  


  // function renderingInCanvas() {
  //   const imagePath = './Player+ Sample/Player+'; 
  //   const totalImages = 78; 
  //   const canvas = document.getElementById('animation-canvas'); 
  //   const ctx = canvas.getContext('2d'); 
  //   let lastFrame = -1; 

  //   const images = [];
  //   for (let i = 0; i < totalImages; i++) {
  //     const img = new Image();
  //     img.src = `${imagePath}${String(i).padStart(2, '0')}.png`;
  //     images.push(img); 
  //   }

  //   ScrollTrigger.create({
  //     trigger: '.sticky__elements--section4', 
  //     start: 'top top', 
  //     end: "+=" + (window.innerHeight * 5), 
  //     markers: false, 
  //     pin: true, 
  //     scrub: 0.2, 
  //     onEnter: () => { 
  //       console.log('Animation started');
  //     },
  //     onUpdate: ({ progress }) => {
  //       if (progress > 0) {
  //         const frame = Math.floor(progress * (totalImages - 1)); 
  //         if (frame !== lastFrame) {
  //           lastFrame = frame;            
  //           ctx.clearRect(0, 0, canvas.width, canvas.height);
  //           ctx.drawImage(images[frame], 0, 0, canvas.width, canvas.height);
  //         }
  //       }
  //     },
  //     onLeave: () => { 
  //       console.log('Animation stopped');
  //     }
  //   });
  // }
  
  // renderingInCanvas();



  function renderingInCanvas() {
    const imagePath = './Player+ Sample/Player+'; 
    const totalImages = 78; 
    const canvas = document.getElementById('animation-canvas'); 
    const ctx = canvas.getContext('2d'); 
    let lastFrame = -1; 
  
    const images = [];
    const imageAspectRatio = 1920 / 1080; // Aspect ratio of the images (width / height)
  
    // Set the canvas size to match the user's viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
    // Calculate the image width and height based on the viewport, maintaining the aspect ratio
    let imageWidth = window.innerWidth;
    let imageHeight = window.innerWidth / imageAspectRatio;
  
    if (imageHeight > window.innerHeight) {
      imageHeight = window.innerHeight;
      imageWidth = window.innerHeight * imageAspectRatio;
    }
  
    // Calculate the position to center the image
    const offsetX = (canvas.width - imageWidth) / 2;  // Horizontal offset to center the image
    const offsetY = (canvas.height - imageHeight) / 2; // Vertical offset to center the image
  
    for (let i = 0; i < totalImages; i++) {
      const img = new Image();
      img.src = `${imagePath}${String(i).padStart(2, '0')}.png`;
      images.push(img);
    }
  
    ScrollTrigger.create({
      trigger: '.sticky__elements--section4', 
      start: 'top top', 
      end: "+=" + (window.innerHeight * 5), 
      markers: false, 
      pin: true, 
      scrub: 0.2, 
      onEnter: () => { 
        console.log('Animation started');
      },
      onUpdate: ({ progress }) => {
        if (progress > 0) {
          const frame = Math.floor(progress * (totalImages - 1)); 
          if (frame !== lastFrame) {
            lastFrame = frame;            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            // Draw the image at the calculated position to keep it centered
            ctx.drawImage(images[frame], offsetX, offsetY, imageWidth, imageHeight);
          }
        }
      },
      onLeave: () => { 
        console.log('Animation stopped');
      }
    });
  }
  
  renderingInCanvas();
  
  
  
  function updatingSrc() {
    const videos = document.querySelectorAll('.myVideo');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  
    let isScrolling;
    let lastTimeUpdate = 0;
  
    // Loop through each video to set up independent logic for scroll interaction
    videos.forEach((video, index) => {
      let lastTime = performance.now();
      let frameCount = 0;
      let fps = 0;
      
      // Create FPS display for each video
      const fpsDisplay = document.createElement('div');
      fpsDisplay.style.position = 'absolute';
      fpsDisplay.style.top = '10px';
      fpsDisplay.style.right = '10px';
      fpsDisplay.style.color = 'rgb(68, 255, 0)';
      fpsDisplay.style.fontSize = '2vw';
      fpsDisplay.style.fontFamily = 'Arial, sans-serif';
      fpsDisplay.style.zIndex = '1000'; // Ensure it's on top of the video
      video.parentElement.style.position = 'relative'; // Ensure positioning context
      video.parentElement.appendChild(fpsDisplay);
  
      // Event listener for scroll
      window.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
    
        requestAnimationFrame(() => {
          frameCount++;
          const now = performance.now();
          const delta = now - lastTime;
          
          // Calculate FPS for each video (on a per-video basis)
          if (delta >= 1000) { // Calculate FPS every second
            fps = frameCount;
            frameCount = 0;
            lastTime = now;
          }
          
          // Update FPS display
          fpsDisplay.textContent = `FPS: ${fps}`;
  
          const scrollPosition = window.scrollY;
          const videoRect = video.getBoundingClientRect();
    
          // Calculate the scroll percentage for the current video
          const scrollPercentage = Math.min(
            (scrollPosition - videoRect.top + window.innerHeight) / documentHeight,
            1
          );
  
          // Log total duration and current time for debugging
          console.log(`Video #${index + 1} - Total Duration: ${video.duration}, Current Time: ${video.currentTime}`);
          
          // Check if the video is in the viewport to start or stop it
          if (videoRect.top <= window.innerHeight && videoRect.bottom >= 0) {
            // Video is in view, play the video if it's not already playing
            if (video.paused) {
              video.muted = true; // Mute video for autoplay to work
              video.play().catch(error => {
                console.error(`Video #${index + 1} play failed:`, error);
              });
            }
  
            // Update the video's current time based on the scroll percentage (only if the video is in the viewport)
            if (performance.now() - lastTimeUpdate > 22) { // To limit to ~60 FPS
              video.currentTime = scrollPercentage * video.duration;
              lastTimeUpdate = performance.now();
            }
          } else {
            // Video is out of view, pause it
            if (!video.paused) {
              video.pause();
            }
          }
        });
    
        // Pause videos after scrolling stops (debounce)
        isScrolling = setTimeout(() => {
          videos.forEach((vid) => {
            if (!vid.paused) {
              vid.pause();
            }
          });
        }, 2);
      });
    });
  }
  
  updatingSrc();



