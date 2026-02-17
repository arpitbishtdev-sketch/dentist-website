import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./ServicesReveal.css";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Teeth Cleaning",
    text: "Professional cleaning removes plaque, tartar, and stains to keep your smile healthy and bright.",
    image:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1771319305/img1_y1bltj.jpg",
  },
  {
    title: "Root Canal Treatment",
    text: "Pain-free root canal treatment to save infected teeth and restore natural function.",
    image:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1771319087/img2_z47ebn.jpg",
  },
  {
    title: "Dental Implants",
    text: "Permanent solution for missing teeth with natural look and strong functionality.",
    image:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1771319093/img3_mysrij.jpg",
  },
  {
    title: "Teeth Whitening",
    text: "Advanced whitening treatment for a brighter and confident smile.",
    image:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1771322125/img4_dqp2qi.jpg",
  },
  {
    title: "Braces / Aligners",
    text: "Modern orthodontic solutions to straighten teeth comfortably.",
    image:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1771322128/img5_e6zj29.jpg",
  },
  {
    title: "Emergency Dental Care",
    text: "Immediate care for tooth pain and urgent dental problems.",
    image:
      "https://res.cloudinary.com/dirixa5no/image/upload/v1771322141/img6_vmyc6q.jpg",
  },
];

export default function ServicesReveal() {
  const mainRef = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const rows = gsap.utils.toArray(".premium-row");

      rows.forEach((row) => {
        const imgContainer = row.querySelector(".img-wrapper");
        const image = row.querySelector("img");
        const textElements = row.querySelectorAll(".reveal-text");
        const goldLine = row.querySelector(".gold-decorator");

        // 1. Image Scale & Reveal
        // gsap.fromTo(
        //   image,
        //   { scale: 1.4, filter: "grayscale(100%)" },
        //   {
        //     scale: 1,
        //     filter: "grayscale(0%)",
        //     duration: 2,
        //     ease: "power2.out",
        //     scrollTrigger: {
        //       trigger: row,
        //       start: "top 80%",
        //     },
        //   },
        // );

        gsap.from(image, {
          scale: 1.2,
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 85%",
          },
        });

        // 2. Gold Line Reveal
        gsap.fromTo(
          goldLine,
          { width: 0 },
          {
            width: "80px",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { trigger: row, start: "top 75%" },
          },
        );

        // 3. Staggered Text Entrance
        gsap.fromTo(
          textElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 70%",
            },
          },
        );
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="service-reveal-container" ref={mainRef}>
      <div className="bg-texture"></div>

      <div className="section-header">
        <p className="overline reveal-text">Our Dental Excellence</p>
        <h1 className="reveal-text">Bespoke Oral Care</h1>
        <div className="header-gold-line"></div>
      </div>

      <div className="rows-wrapper">
        {services.map((service, i) => (
          <div
            key={i}
            className={`premium-row ${i % 2 !== 0 ? "reverse" : ""}`}
          >
            <div className="img-column">
              <div className="img-wrapper">
                <div className="img-border-accent"></div>
                <img src={service.image} alt={service.title} />
              </div>
            </div>

            <div className="text-column">
              <div className="text-content">
                <div className="gold-decorator"></div>
                <span className="service-index reveal-text">0{i + 1}</span>
                <h2 className="reveal-text">{service.title}</h2>
                <p className="reveal-text">{service.text}</p>
                <button className="explore-btn reveal-text">
                  <span className="btn-text">Explore Service</span>
                  <span className="btn-arrow">→</span>
                  <div className="btn-fill"></div>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
