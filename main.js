// main.js
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
let smoother;

const pageScripts = {
  home: function () {
    if (window.innerWidth > 991) {
      ScrollTrigger.create({
        trigger: ".usp-cards-section",
        start: "top top",
        end: "bottom bottom",
        pin: ".panel",
        pinSpacing: false,
        scrub: false
      });

      const pinHeight = document.querySelector('.usp-cards-section .pin-height');
      const circles = document.querySelectorAll('.uc-circle');

      gsap.fromTo('.usp-cards-section .uc-circles', {y: '0%'}, {
        y: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: pinHeight,
          start: 'top top',
          end: 'bottom bottom',
          pin: '.usp-cards-section .uc-container',
          scrub: true
        }
      });

      let angle = 3, 
          halfRange = (circles.length - 1) * angle / 2,
          rot = -halfRange;

      const distPerCard = (pinHeight.clientHeight - window.innerHeight) / circles.length;

      circles.forEach((circle, index) => {
        gsap.to(circle, {
          rotation: rot,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: pinHeight,
            start: 'top top-=' + (distPerCard) * index,
            end: '+=' + (distPerCard),
            scrub: true
          }  
        });

        gsap.to(circle.querySelector('.uc-card'), {
          rotation: rot,
          y: '-50%',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: pinHeight,
            start: 'top top-=' + (distPerCard) * index,
            end: '+=' + (distPerCard),
            scrub: true
          }  
        });

        rot += angle;
      });

      gsap.to('.scroll', {
        autoAlpha: 0,
        duration: 0.2,
        scrollTrigger: {
          trigger: '.mwg_effect031',
          start: 'top top',
          end: 'top top-=1',
          toggleActions: "play none reverse none"
        }
      });
    }
  },

  howitworks: function () {
    // Vimeo play on scroll
    document.querySelectorAll("video").forEach(video => {
      new IntersectionObserver(entries => {
        entries.forEach(entry => entry.isIntersecting ? video.play() : (video.pause(), video.currentTime = 0));
      }).observe(video);
    });

    if (window.innerWidth > 991) {
      ScrollTrigger.create({
        trigger: ".usp-cards-section",
        start: "top top",
        end: "bottom bottom",
        pin: ".panel",
        pinSpacing: false,
        scrub: false
      });

      const pinHeight = document.querySelector('.usp-cards-section .pin-height');
      const circles = document.querySelectorAll('.uc-circle');

      gsap.fromTo('.usp-cards-section .uc-circles', {
        y: '0%'
      }, {
        y: '0%',
        ease: 'none',
        scrollTrigger: {
          trigger: pinHeight,
          start: 'top top',
          end: 'bottom bottom',
          pin: '.usp-cards-section .uc-container',
          scrub: true
        }
      });

      let angle = 3, 
          halfRange = (circles.length - 1) * angle / 2,
          rot = -halfRange;

      const distPerCard = (pinHeight.clientHeight - window.innerHeight) / circles.length;

      circles.forEach((circle, index) => {
        gsap.to(circle, {
          rotation: rot,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: pinHeight,
            start: 'top top-=' + (distPerCard) * index,
            end: '+=' + (distPerCard),
            scrub: true
          }  
        });

        gsap.to(circle.querySelector('.uc-card'), {
          rotation: rot,
          y: '-50%',
          ease: 'power1.out',
          scrollTrigger: {
            trigger: pinHeight,
            start: 'top top-=' + (distPerCard) * index,
            end: '+=' + (distPerCard),
            scrub: true
          }  
        });

        rot += angle;
      });

      gsap.to('.scroll', {
        autoAlpha: 0,
        duration: 0.2,
        scrollTrigger: {
          trigger: '.mwg_effect031',
          start: 'top top',
          end: 'top top-=1',
          toggleActions: "play none reverse none"
        }
      });

      const slides = document.querySelectorAll('.mwg_effect031 .slide');

      slides.forEach((slide, index) => {
        const contentWrapper = slide.querySelector('.content-wrapper');
        const content = slide.querySelector('.content');
        const isTabletOrSmaller = window.matchMedia("(max-width: 991px)").matches;
        const startValue = isTabletOrSmaller ? 'top 10%' : 'top 20%';

        if (index !== slides.length - 1) {
          gsap.to(content, {
            rotationZ: (Math.random() - 0.5) * 10,
            scale: 0.7,
            rotationX: 40,
            ease: 'power1.in',
            scrollTrigger: {
              pin: contentWrapper,
              trigger: slide,
              start: startValue,
              end: '+=' + window.innerHeight,
              scrub: true
            }
          });
        }

        gsap.to(content, {
          autoAlpha: 0,
          ease: 'power1.in',
          scrollTrigger: {
            trigger: content,
            start: 'top -80%',
            end: '+=' + 0.2 * window.innerHeight,
            scrub: true
          }
        });
      });
    }
  }
};

function cleanupAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();
}

function runPageScripts() {
  const page = document.body.getAttribute('data-page');
  cleanupAnimations();
  if (pageScripts[page]) {
    pageScripts[page]();
    console.log(`✅ Animaties uitgevoerd voor: ${page}`);
  } else {
    console.log(`⚠️ Geen scripts gevonden voor: ${page}`);
  }
}

const swup = new Swup({ containers: [".swup-container"] });

document.addEventListener('DOMContentLoaded', () => {
  smoother = ScrollSmoother.create({
    wrapper: "#smooth-wrapper",
    content: "#smooth-content",
    smooth: 1.5,
    effects: true
  });
  runPageScripts();
});

swup.on('contentReplaced', () => {
  window.scrollTo(0, 0);
  ScrollTrigger.refresh();
  runPageScripts();
});
