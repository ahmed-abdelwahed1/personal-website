"use client";

import { motion } from "framer-motion";
import { FaLinkedinIn, FaGithub, FaMediumM } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface HeroData {
  name: string;
  title: string;
  bio: string;
  openTo: string;
  email: string;
  linkedin: string;
  github: string;
  x: string;
  medium: string;
  cvFile: string;
}

export default function Hero({ data }: { data: HeroData }) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="hero" id="hero">
      <motion.div
        className="container hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="hero-name" variants={item}>
          Hi, I&apos;m {data.name}
        </motion.h1>

        <motion.p className="hero-title" variants={item}>
          {data.title}
        </motion.p>

        <motion.div className="hero-divider divider" variants={item} />

        <motion.p className="hero-bio" variants={item}>
          {data.bio}
        </motion.p>

        <motion.p className="hero-open" variants={item}>
          {data.openTo}
        </motion.p>

        <motion.div className="hero-actions" variants={item}>
          <div className="hero-buttons">
            <a href={data.cvFile} className="btn btn-primary" download>
              Download CV
            </a>
            <a href={`mailto:${data.email}`} className="btn btn-outline">
              Contact me
            </a>
          </div>

          <div className="hero-social">
            <a
              href={data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
            >
              <FaLinkedinIn />
            </a>
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href={data.x}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="X (Twitter)"
            >
              <FaXTwitter />
            </a>
            <a
              href={data.medium}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon"
              aria-label="Medium"
            >
              <FaMediumM />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
