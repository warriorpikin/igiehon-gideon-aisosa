import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useWarScrollAnimations() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    gsap.from(".scene-nav", {
      y: -24,
      opacity: 0,
      duration: 0.9,
      ease: "power4.out",
      delay: 0.15,
    });

    gsap.from(
      ".hero-kicker, .hero-title-line, .hero-copy, .hero-actions, .hero-socials",
      {
        y: 56,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power4.out",
        delay: 0.25,
      }
    );

    gsap.to(".giant-word", {
      xPercent: -16,
      ease: "none",
      scrollTrigger: {
        trigger: ".cinema-shell",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    gsap.to(".hero-video-wrap", {
      scale: 1.1,
      filter: "brightness(0.6) contrast(1.12)",
      ease: "none",
      scrollTrigger: {
        trigger: ".hero-scene",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    gsap.utils.toArray(".scene").forEach((section) => {
      const heading = section.querySelector(".scene-title");
      const text = section.querySelector(".scene-text");
      const cards = section.querySelectorAll(".reveal-card:not(.mission-card)");

      if (heading) {
        gsap.from(heading, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 72%",
          },
        });
      }

      if (text) {
        gsap.from(text, {
          y: 36,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
          scrollTrigger: {
            trigger: text,
            start: "top 85%",
          },
        });
      }

      if (cards.length) {
        gsap.from(cards, {
          y: 50,
          opacity: 0,
          duration: 0.75,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: {
            trigger: section,
            start: "top 68%",
          },
        });
      }
    });

    /*
      DESKTOP:
      Cinematic pinned horizontal mission scroll.
      Cards are now viewport-safe and readable.
    */
    mm.add("(min-width: 981px)", () => {
      const missionTrack = document.querySelector(".mission-track");

      if (!missionTrack) return undefined;

      gsap.set(".mission-track", {
        clearProps: "all",
      });

      gsap.set(".mission-card", {
        opacity: 1,
        y: 0,
      });

      const getScrollDistance = () =>
        Math.max(0, missionTrack.scrollWidth - window.innerWidth + 220);

      const animation = gsap.to(missionTrack, {
        x: () => -getScrollDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: ".missions-scene",
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
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

    /*
      MOBILE:
      No pinned GSAP. Native horizontal swipe with snap.
    */
    mm.add("(max-width: 980px)", () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger?.classList?.contains("missions-scene")) {
          trigger.kill(true);
        }
      });

      gsap.set(".missions-scene, .mission-track, .mission-card", {
        clearProps: "transform,x,y,opacity,width,height",
      });

      gsap.set(".mission-card", {
        opacity: 1,
      });

      gsap.from(".mission-card", {
        y: 34,
        opacity: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".missions-scene",
          start: "top 75%",
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      mm.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
}