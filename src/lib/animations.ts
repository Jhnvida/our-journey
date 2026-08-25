import type { Variants } from "framer-motion";

export const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

export const slideUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

export const slideRight: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, x: 20, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
    exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const scaleIn: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: [0.4, 0, 1, 1] } },
};

export const pageTransition: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
            when: "beforeChildren",
        },
    },
    exit: {
        opacity: 0,
        y: -15,
        transition: {
            duration: 0.3,
            ease: [0.4, 0, 1, 1],
        },
    },
};
