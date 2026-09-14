"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay (seconds). Default 0. */
  delay?: number;
  /** Viewport amount before revealing. Default "some" so a tall block
   *  cannot stay opacity:0 when less than `amount` of it fits on screen. */
  amount?: number | "some" | "all";
  /** "mount" for above-the-fold shells; "view" for scroll-reveal. */
  trigger?: "view" | "mount";
};

export function Reveal({
  children,
  className,
  delay = 0,
  amount = "some",
  trigger = "view",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const shown = { opacity: 1, y: 0 } as const;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      {...(trigger === "mount"
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, amount } })}
      transition={{ duration: 0.55, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  amount?: number | "some" | "all";
  /** Stagger gap between children (seconds). */
  stagger?: number;
  as?: "div" | "ul" | "ol";
  role?: string;
  "aria-label"?: string;
};

/** Parent for staggered children — wrap lists; each child should be `RevealItem`. */
export function RevealStagger({
  children,
  className,
  amount = 0.15,
  stagger = 0.08,
  as: Tag = "div",
  role,
  "aria-label": ariaLabel,
}: RevealStaggerProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag =
    Tag === "ul" ? motion.ul : Tag === "ol" ? motion.ol : motion.div;
  const a11y = { role, "aria-label": ariaLabel };

  if (reduceMotion) {
    const StaticTag = Tag;
    return (
      <StaticTag className={className} {...a11y}>
        {children}
      </StaticTag>
    );
  }

  return (
    <MotionTag
      className={className}
      variants={{
        ...staggerContainer,
        show: {
          transition: { staggerChildren: stagger, delayChildren: 0.04 },
        },
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      {...a11y}
    >
      {children}
    </MotionTag>
  );
}

type RevealItemProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
};

export function RevealItem({
  children,
  className,
  as: Tag = "div",
}: RevealItemProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = Tag === "li" ? motion.li : motion.div;

  if (reduceMotion) {
    const StaticTag = Tag;
    return <StaticTag className={className}>{children}</StaticTag>;
  }

  return (
    <MotionTag className={className} variants={staggerItem}>
      {children}
    </MotionTag>
  );
}
