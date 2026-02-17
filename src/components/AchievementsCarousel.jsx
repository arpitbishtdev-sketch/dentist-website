import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./AchievementsCarousel.css";

// Badge Imports
import badge1 from "../assets/badges/badge1.jpg";
import badge2 from "../assets/badges/badge2.webp";
import badge3 from "../assets/badges/badge3.png";
import badge4 from "../assets/badges/badge4.png";
import badge5 from "../assets/badges/badge5.png";

gsap.registerPlugin(ScrollTrigger);

const logos = [badge1, badge2, badge3, badge4, badge5];

export default function AchievementsCarousel() {
  const sectionRef = useRef();
  const infiniteLogos = [...logos, ...logos, ...logos, ...logos];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // SELECT beams safely AFTER mount
      const beams = sectionRef.current?.querySelectorAll(".premium-beam");

      if (beams && beams.length) {
        gsap.fromTo(
          beams,
          { scaleX: 0, opacity: 0 },
          {
            scaleX: 1,
            opacity: 1,
            duration: 2,
            ease: "expo.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 90%",
            },
          },
        );
      }

      // Text Entrance
      const headers = sectionRef.current?.querySelectorAll(".header-anim");

      if (headers && headers.length) {
        gsap.from(headers, {
          y: 40,
          opacity: 0,
          filter: "blur(8px)",
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="achievements-section" ref={sectionRef}>
      <div className="bg-glow-layer"></div>

      <div className="achievements-header">
        <span className="premium-tag header-anim">Recognition</span>
        <h2 className="header-anim">Trusted by Global Standards</h2>
      </div>

      <div className="carousel-main-wrapper">
        <div className="premium-beam beam-top">
          <div className="shimmer-effect"></div>
        </div>

        <div className="marquee-mask">
          <div className="marquee-track">
            {infiniteLogos.map((logo, i) => (
              <div className="achievement-item" key={i}>
                <div className="logo-vault">
                  <img
                    src={logo}
                    alt="Recognition Badge"
                    className="colorful-logo"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="premium-beam beam-bottom">
          <div className="shimmer-effect"></div>
        </div>
      </div>
    </section>
  );
}
