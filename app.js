document.addEventListener("DOMContentLoaded", function () {
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

  // function videoScalingAnimation() {
  //   if (window.innerWidth > 0) {
      
  //     document.querySelectorAll(".video_scale_animation-main").forEach((section) => {
  //       gsap.timeline({
  //         scrollTrigger: {
  //           trigger: section, 
  //           start: "top top", 
  //           end: "+=" + (window.innerHeight * 6), 
  //           scrub: 0.3, 
  //           markers: false, 
  //           pin: true, 
  //         }
  //       })
  //       .from(section.querySelector(".has_video_scale"), {
  //         scale: 0.7,  
  //         borderRadius: "20px",
  //       })
  //       .to(section.querySelector(".has_video_scale"), {
  //         scale: 1,
  //         borderRadius: "0px",
  //       });
  //     });
  //   }
  // }
  // videoScalingAnimation();
    

  

  function updatingSrc() {
    const videos = document.querySelectorAll('.myVideo');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;

    let isScrolling;
    let lastTimeUpdate = 0;

    
    videos.forEach((video, index) => {
      let lastTime = performance.now();
      let frameCount = 0;
      let fps = 0;
      
      
      const fpsDisplay = document.createElement('div');
      fpsDisplay.style.position = 'absolute';
      fpsDisplay.style.top = '10px';
      fpsDisplay.style.right = '10px';
      fpsDisplay.style.color = 'rgb(68, 255, 0)';
      fpsDisplay.style.fontSize = '2vw';
      fpsDisplay.style.fontFamily = 'Arial, sans-serif';
      fpsDisplay.style.zIndex = '1000'; 
      video.parentElement.style.position = 'relative'; 
      video.parentElement.appendChild(fpsDisplay);

      
      window.addEventListener('scroll', () => {
        clearTimeout(isScrolling);
    
        requestAnimationFrame(() => {
          frameCount++;
          const now = performance.now();
          const delta = now - lastTime;
          
          
          if (delta >= 1000) { 
            fps = frameCount;
            frameCount = 0;
            lastTime = now;
          }
          
          
          fpsDisplay.textContent = `FPS: ${fps}`;

          const scrollPosition = window.scrollY;
          const videoRect = video.getBoundingClientRect();
    
          
          const scrollPercentage = Math.min(
            (scrollPosition - videoRect.top + window.innerHeight) / documentHeight,
            1
          );

          
          console.log(`Video #${index + 1} - Total Duration: ${video.duration}, Current Time: ${video.currentTime}`);
          
          
          if (videoRect.top <= window.innerHeight && videoRect.bottom >= 0) {
            
            if (video.paused) {
              video.muted = true; 
              video.play().catch(error => {
                console.error(`Video #${index + 1} play failed:`, error);
              });
            }

            
            if (performance.now() - lastTimeUpdate > 22) { 
              video.currentTime = scrollPercentage * video.duration;
              lastTimeUpdate = performance.now();
            }
          } else {
            
            if (!video.paused) {
              video.pause();
            }
          }
        });
    
        
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

  function velocitySlider() {
    const sliders = document.querySelectorAll(".siteVelocity__slider");
    let baseSpeed = 1; // initial speed
    let scrollSpeedFactor = 5; // scroll speed

    sliders.forEach(slider => {
        let direction = parseInt(slider.dataset.direction, 10) || 1;
        let images = Array.from(slider.children);
        let position = 0;
        let speed = baseSpeed;
        const imgWidth = images[0].offsetWidth + 20;
        const totalWidth = imgWidth * images.length;

        
        while (slider.offsetWidth < window.innerWidth * 2) {
            images.forEach(img => {
                let clone = img.cloneNode(true);
                slider.appendChild(clone);
            });
        }

        function animate() {
            position += speed * direction;

          
            if (position >= totalWidth) {
                position -= totalWidth;
            } else if (position <= -totalWidth) {
                position += totalWidth;
            }

            gsap.set(slider, { x: -position });

            
            speed = Math.max(baseSpeed, speed * 0.95);

            requestAnimationFrame(animate);
        }

        function handleScroll(event) {
            let delta = event.deltaY || -event.wheelDelta;
            speed = baseSpeed + Math.min(Math.abs(delta), scrollSpeedFactor); 
        }

        window.addEventListener("wheel", handleScroll);
        animate();
    });
  }

  velocitySlider();

  function sectionBugHandler() {
    console.log("Bug activated for section!");

    gsap.timeline()
      // Make it visible immediately
      .to(".sectionBug__container", {
         opacity: 1,
         scale: 1,
         visibility: "visible",
         duration: 0.1,
         ease: "power2.out"
      })
      // Animate from the bottom (y:200) to y:0
      .to(".sectionBug__container", {
         y: 0,
         duration: 1,
         ease: "power2.out"
      }, 0) // start at the same time as the above
      // Expand the width using a cubic-bezier easing for a smooth effect
      .to(".sectionBug__container", {
         width: "30%",
         duration: 0.1,
         ease: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      }, 0);
  }

  ScrollTrigger.create({
    trigger: ".sectionHas__bug",
    start: "top center",
    onEnter: sectionBugHandler,
    onLeaveBack: () => {
      console.log("Bug removed!");
      gsap.to(".sectionBug__container", {
        opacity: 0,
        scale: 0.5,
        visibility: "hidden",
        y: 200,           // Return it offscreen at the bottom
        // width: "50px",    // Shrink back to the original width
        duration: 0.1,
        ease: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      });
    }
  });



});




function renderingInCanvas() {
  const imagePath = './image-src-2/Home Banner_A03_';
  const totalImages = 450; // 000 to 449
  const canvas = document.getElementById('animation-canvas');
  const ctx = canvas.getContext('2d');
  let lastFrame = -1;
  let images = [];
  let loadedImages = 0;
  const imageAspectRatio = 1440 / 650;

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let imageWidth = window.innerWidth;
  let imageHeight = window.innerWidth / imageAspectRatio;

  if (imageHeight > window.innerHeight) {
    imageHeight = window.innerHeight;
    imageWidth = window.innerHeight * imageAspectRatio;
  }

  const offsetX = (canvas.width - imageWidth) / 2;
  const offsetY = (canvas.height - imageHeight) / 2;

  function startAnimation() {
    ScrollTrigger.create({
      trigger: '.sticky__elements--section4',
      start: 'top top',
      end: "+=" + (window.innerHeight * 5),
      markers: false,
      pin: true,
      scrub: 0.2,
      onUpdate: ({ progress }) => {
        if (progress > 0) {
          const frame = Math.floor(progress * (totalImages - 1));
          if (frame !== lastFrame) {
            lastFrame = frame;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(images[frame], offsetX, offsetY, imageWidth, imageHeight);
          }
        }
      }
    });
  }

  for (let i = 0; i < totalImages; i++) {
    const img = new Image();
    img.src = `${imagePath}${String(i).padStart(3, '0')}.webp`;

    img.onload = () => {
      loadedImages++;
      if (loadedImages === 1) {
        ctx.drawImage(img, offsetX, offsetY, imageWidth, imageHeight);
      }
      if (loadedImages === totalImages) {
        startAnimation();
      }
    };

    img.onerror = () => {
      console.error(`Error loading image: ${img.src}`);
    };

    images.push(img);
  }
}

renderingInCanvas();




// Configuration array for text scenes
const textScenes = [
  { selector: "#textBlock1", fadeInDuration: 1, holdDuration: 1, fadeOutDuration: 1, yOffset: 30 },
  { selector: "#textBlock2", fadeInDuration: 1, holdDuration: 1, fadeOutDuration: 1, yOffset: 30 },
  { selector: "#textBlock3", fadeInDuration: 1, holdDuration: 1, fadeOutDuration: 1, yOffset: 30 }
];

// Create a GSAP timeline linked to the scroll area.
const textTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: '.sticky__elements--section4',
    start: 'top top',
    end: "+=" + (window.innerHeight * 5),
    scrub: 0.2,
    markers: false
  }
});

// Dynamically build timeline using the configuration array.
textScenes.forEach((scene, index) => {
  textTimeline
    .fromTo(scene.selector, 
      { opacity: 0, y: scene.yOffset }, 
      { opacity: 1, y: 0, duration: scene.fadeInDuration }
    )
    .to(scene.selector, { opacity: 0, duration: scene.fadeOutDuration }, "+=" + scene.holdDuration);
});
