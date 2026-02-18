import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import StaggeredMenu from "./StaggeredMenu";
import "./Navbar.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const menuItems = [
  { label: "Home", ariaLabel: "Go to home page", link: "/" },
  { label: "About", ariaLabel: "Learn about us", link: "/about" },
  { label: "Services", ariaLabel: "View our services", link: "/services" },
  { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
];

const socialItems = [
  { label: "Twitter", link: "https://twitter.com" },
  { label: "GitHub", link: "https://github.com" },
  { label: "LinkedIn", link: "https://linkedin.com" },
];

const centerNavItems = [
  { label: "Services", link: "/service" },
  { label: "Implants", link: "/implants" },
  { label: "Price", link: "/price" },
  { label: "Book Appointment", link: "/appointment", highlight: true },
];

const mobileMenuItems = [
  ...menuItems,
  {
    label: "Price",
    ariaLabel: "View pricing",
    link: "/price",
  },
  {
    label: "Appointment",
    ariaLabel: "Book appointment",
    link: "/appointment",
  },
];

const Navbar = () => {
  const navRef = useRef();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /* Detect screen resize */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* GSAP scroll animation */
  useEffect(() => {
    gsap.set(navRef.current, {
      backgroundColor: "rgba(255,255,255,0)",
      backdropFilter: "blur(0px)",
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      borderBottom: "1px solid rgba(0,0,0,0)",
    });

    gsap.to(navRef.current, {
      backgroundColor: "rgba(255,255,255,0.72)",
      backdropFilter: "blur(18px)",
      boxShadow: `
        0 4px 20px rgba(0,0,0,0.06),
        0 1px 0 rgba(255,255,255,0.6) inset
      `,
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      ease: "power2.out",
      scrollTrigger: {
        trigger: document.body,
        start: "top -60",
        end: "top -180",
        scrub: true,
      },
    });
  }, []);

  return (
    <div ref={navRef} className="navbar-wrapper">
      {/* CENTER NAV (desktop only) */}
      <div className="center-nav">
        {centerNavItems.map((item, index) => (
          <a
            key={index}
            href={item.link}
            className={item.highlight ? "appointment-btn" : ""}
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* RIGHT MENU */}
      <StaggeredMenu
        isFixed={true}
        position="right"
        items={isMobile ? mobileMenuItems : menuItems}
        socialItems={socialItems}
        displaySocials={true}
        displayItemNumbering={true}
        menuButtonColor="#3e73e6"
        openMenuButtonColor="#0c0c0c"
        changeMenuColorOnOpen={true}
        colors={["#3e73e6", "#2e84e7"]}
        logoUrl="/logo.svg"
        accentColor="#3e73e6"
      />
    </div>
  );
};

export default Navbar;
