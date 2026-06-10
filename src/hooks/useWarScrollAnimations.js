import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWarScrollAnimations() {
  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.from(".scene-nav", {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-kicker, .hero-title-line, .hero-copy, .hero-actions, .hero-socials", {
        y: 70,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: "power4.out",
        delay: 0.35,
      });

      gsap.to(".giant-word", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: ".cinema-shell",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      gsap.to(".hero-video-wrap", {
        scale: 1.14,
        filter: "brightness(0.55) contrast(1.15)",
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-scene",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-content", {
        yPercent: -18,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-scene",
          start: "35% top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray(".scene").forEach((section) => {
        const heading = section.querySelector(".scene-title");
        const text = section.querySelector(".scene-text");
        const cards = section.querySelectorAll(".reveal-card");

        
        if (heading) {
          gsap.from(heading, {
            y: 90,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 70%",
            },
          });
        }

        if (text) {
          gsap.from(text, {
            y: 50,
            opacity: 0,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: text,
              start: "top 82%",
            },
          });
        }

        if (cards.length) {
          gsap.from(cards, {
            y: 80,
            opacity: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 62%",
            },
          });
        }
      });

      const mm = gsap.matchMedia();

mm.add("(min-width: 981px)", () => {
  const missionTrack = document.querySelector(".mission-track");

  if (!missionTrack) return undefined;

  const animation = gsap.to(missionTrack, {
    x: () => -(missionTrack.scrollWidth - window.innerWidth + 120),
    ease: "none",
    scrollTrigger: {
      trigger: ".missions-scene",
      start: "top top",
      end: () => `+=${missionTrack.scrollWidth}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
    },
  });

  return () => {
    animation.kill();
  };
});

mm.add("(max-width: 980px)", () => {
  gsap.set(".mission-track", {
    clearProps: "all",
  });

  ScrollTrigger.getAll().forEach((trigger) => {
    if (trigger.trigger?.classList?.contains("missions-scene")) {
      trigger.kill();
    }
  });
});
      gsap.utils.toArray(".video-scene").forEach((section) => {
        const video = section.querySelector(".scene-video-layer");

        if (video) {
          gsap.fromTo(
            video,
            { scale: 1.08, opacity: 0.18 },
            {
              scale: 1,
              opacity: 0.46,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);
}