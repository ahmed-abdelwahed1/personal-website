"use client";

import { motion, type Variants } from "framer-motion";
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

const ease = [0.25, 0.1, 0.25, 1] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 1, ease },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  show: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.8, ease },
  },
};

const staggerIcons: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const iconPop: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease },
  },
};

export default function Hero({ data }: { data: HeroData }) {
  return (
    <section className="hero" id="hero">
      <motion.div
        className="container hero-content"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h1 className="hero-name" variants={fadeUp}>
          Hi, I&apos;m {data.name}
        </motion.h1>

        <motion.p className="hero-title" variants={fadeUp}>
          {data.title}
        </motion.p>

        <motion.div
          className="hero-divider divider"
          variants={scaleIn}
          style={{ originX: 0.5 }}
        />

        <motion.p className="hero-bio" variants={fadeIn}>
          {data.bio}
        </motion.p>

        <motion.p className="hero-open" variants={fadeIn}>
          {data.openTo}
        </motion.p>

        <motion.div className="hero-actions" variants={fadeUp}>
          <div className="hero-buttons">
            <a href={data.cvFile} className="btn btn-primary" download>
              Download CV
            </a>
            <a href={`mailto:${data.email}`} className="btn btn-outline">
              Contact me
            </a>
          </div>

          <motion.div
            className="hero-social"
            variants={staggerIcons}
          >
            {[
              { href: data.linkedin, icon: <FaLinkedinIn />, label: "LinkedIn" },
              { href: data.github, icon: <FaGithub />, label: "GitHub" },
              { href: data.x, icon: <FaXTwitter />, label: "X (Twitter)" },
              { href: data.medium, icon: <FaMediumM />, label: "Medium" },
            ].map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon"
                aria-label={link.label}
                variants={iconPop}
                whileHover={{ y: -3, scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
