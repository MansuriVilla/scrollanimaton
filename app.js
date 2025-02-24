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

  function videoScalingAnimation() {
    if (window.innerWidth > 0) {
      
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
    
  function renderingInCanvas() {
    const imagePath = './image-src/Player+'; 
    const totalImages = 78; 
    const canvas = document.getElementById('animation-canvas'); 
    const ctx = canvas.getContext('2d'); 
    let lastFrame = -1; 

    const images = [];
    const imageAspectRatio = 1920 / 1080;

    
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

    for (let i = 0; i < totalImages; i++) {
      const img = new Image();
      img.src = `${imagePath}${String(i).padStart(2, '0')}.webp`;
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
    let speed = 1; 
    let autoSpeed = 2; 

    sliders.forEach(slider => {
        let direction = parseInt(slider.dataset.direction, 10);
        let images = Array.from(slider.children);
        let position = 0;
        const imgWidth = images[0].offsetWidth + 20;
        const totalWidth = imgWidth * images.length;

        
        while (slider.offsetWidth < window.innerWidth * 2) {
            images.forEach(img => {
                let clone = img.cloneNode(true);
                slider.appendChild(clone);
            });
        }

        function animate() {
            position += (speed + autoSpeed) * direction;

            
            if (position >= totalWidth) {
                position -= totalWidth;
            } else if (position <= -totalWidth) {
                position += totalWidth;
            }

            gsap.set(slider, { x: -position });
            speed *= 0.95; 
            requestAnimationFrame(animate);
        }

        function handleScroll(event) {
            let delta = event.deltaY || -event.wheelDelta;
            speed = Math.min(Math.abs(delta), 20);
        }

        window.addEventListener("wheel", handleScroll);
        animate();
    });
  }
  velocitySlider();


});