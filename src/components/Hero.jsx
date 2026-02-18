import React, { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Hero.css";

// Assets
import toothImg from "../assets/bg.png";
import DoctorCard from "./DoctorCard";
import DoctorTeam from "../pages/DoctorTeam";
import AchievementsCarousel from "./AchievementsCarousel";
import CurvedLoop from "./CurvedLoop";
import ServicesReveal from "./ServicesReveal";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const goldGradient =
    "bg-gradient-to-r from-[#111] via-[#d4af37] to-[#111] bg-[length:200%_auto] bg-clip-text text-transparent";

  const heroRef = useRef();
  const imageRef = useRef();
  const [expandRect, setExpandRect] = useState(null);

  const xTo = useRef(null);
  const yTo = useRef(null);

  // MAGNETIC PARALLAX LOGIC
  const handleMouseMove = (e) => {
    if (window.innerWidth < 1024) return;
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 400) {
      xTo.current(dx * 0.15);
      yTo.current(dy * 0.15);
    } else {
      xTo.current(0);
      yTo.current(0);
    }
  };

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Setup QuickTo for smooth parallax
      xTo.current = gsap.quickTo(imageRef.current, "x", {
        duration: 0.8,
        ease: "power3.out",
      });
      yTo.current = gsap.quickTo(imageRef.current, "y", {
        duration: 0.8,
        ease: "power3.out",
      });

      const tl = gsap.timeline();

      // Entrance Animations
      tl.from(".bg-text-giant", {
        opacity: 0,
        x: 100,
        duration: 2,
        ease: "expo.out",
      })
        .from(
          ".animate-left",
          {
            x: -100,
            opacity: 0,
            stagger: 0.2,
            duration: 1.2,
            ease: "power4.out",
          },
          "-=1.5",
        )
        .from(".animate-right", { x: 100, opacity: 0, duration: 1.2 }, "-=1")

        .from(".side-indicator", { height: 0, opacity: 0, duration: 1 }, "-=1");

      // IMPORTANT: don't change xPercent / yPercent
      gsap.set(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        rotationY: 8,
        force3D: true,
      });

      // smooth spawn EXACT SAME PLACE
      gsap.to(imageRef.current, {
        scale: 1,
        opacity: 1,
        rotationY: 0,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.2,
      });

      // subtle floating (no position reset)
      gsap.to(imageRef.current, {
        y: "+=12",
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // Background Scroll Effect
      gsap.to(".bg-text-giant", {
        x: -150,
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          scrub: 1,
        },
      });
    }, heroRef);

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  return (
    <>
      <section className="hero" ref={heroRef}>
        {/* PREMIUM LAYERS */}
        <div className="noise-overlay"></div>
        <div className="bg-text-giant">SMILE</div>

        <div className="side-indicator">
          <div className="line"></div>
          <span className="num">01</span>
        </div>

        <div className="hero-container">
          {/* LEFT CONTENT */}
          <div className="hero-left">
            <p className="hero-sub animate-left">
              From preventive care to complex restorations, a comprehensive
              approach to your dental health.
            </p>

            <h1 className="hero-title animate-left">
              <span className="light">Modern</span>
              <br />
              <span className="light">Care for a</span>
              <br />
              <span className="bold gold-text">Perfect</span>
              <br />
              <span className="bold">Smile</span>
            </h1>

            <div className="hero-bottom animate-left">
              <div className="info-block">
                <span className="label">ESTABLISHED</span>
                <span className="val">Best Dentistry 2025</span>
              </div>
              <div className="info-block">
                <span className="label">LOCATION</span>
                <span className="val">India | GMT +5:30</span>
              </div>
            </div>
          </div>

          {/* CENTER IMAGE */}
          <div className="hero-right animate-image" ref={imageRef}>
            <img src={toothImg} alt="Dental 3D" className="main-3d-asset" />
          </div>

          {/* RIGHT TEXT */}
          <div className="hero-right-text animate-right">
            <div className="vertical-line"></div>

            <p>
              Select from our team of highly skilled and experienced dentists
            </p>

            {/* ADD THIS HERE */}
            <DoctorCard onOpenTeam={(rect) => setExpandRect(rect)} />

            <div className="hero-bottom-right">
              <span className="label">TECHNOLOGY</span>
              <span className="val">Advanced AI Diagnostic</span>
            </div>
          </div>
        </div>
      </section>

      <CurvedLoop
        texts={[
          <span className="gold-text font-serif tracking-widest uppercase">
            Award-Winning Dental Care ✦
          </span>,
          <span className="gold-text font-serif tracking-widest uppercase">
            Trusted Excellence ★
          </span>,
        ]}
        velocity={60}
      />

      <AchievementsCarousel />
      <ServicesReveal />
      {expandRect && (
        <DoctorTeam rect={expandRect} onClose={() => setExpandRect(null)} />
      )}
    </>
  );
}
