import type { Transition, Variants } from "motion/react";

export const duration = {
    fast: 0.2,
    normal: 0.4,
    slow: 0.6,
} as const;

export const easing = {
    smooth: [0.25, 0.1, 0.25, 1] as const,
    decelerate: [0, 0, 0.2, 1] as const,
    gentle: [0.4, 0, 0, 1] as const,
};

export const transition = {
    fast: { duration: duration.fast, ease: easing.smooth } satisfies Transition,
    normal: { duration: duration.normal, ease: easing.decelerate } satisfies Transition,
    slow: { duration: duration.slow, ease: easing.decelerate } satisfies Transition,
} as const;

export function fadeInUp(y: number = 16, d: number = duration.normal): Variants {
    return {
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: d, ease: easing.decelerate } },
    };
}

export function fadeInLeft(x: number = -16, d: number = duration.normal): Variants {
    return {
        hidden: { opacity: 0, x },
        visible: { opacity: 1, x: 0, transition: { duration: d, ease: easing.decelerate } },
    };
}

export function fadeIn(d: number = duration.normal): Variants {
    return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: d, ease: easing.smooth } },
    };
}

export function staggerContainer(staggerDelay: number = 0.08, delayChildren: number = 0): Variants {
    return {
        hidden: {},
        visible: {
            transition: { staggerChildren: staggerDelay, delayChildren },
        },
    };
}

export function scaleIn(d: number = duration.normal): Variants {
    return {
        hidden: { opacity: 0, scale: 0.96, y: 8 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: d, ease: easing.decelerate } },
        exit: { opacity: 0, scale: 0.96, y: 8, transition: { duration: duration.fast, ease: easing.smooth } },
    };
}

export function overlayFade(d: number = duration.fast): Variants {
    return {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: d } },
        exit: { opacity: 0, transition: { duration: d } },
    };
}

export function slideDown(d: number = duration.normal): Variants {
    return {
        hidden: { opacity: 0, height: 0 },
        visible: {
            opacity: 1,
            height: "auto",
            transition: { duration: d, ease: easing.decelerate },
        },
        exit: {
            opacity: 0,
            height: 0,
            transition: { duration: duration.fast, ease: easing.smooth },
        },
    };
}

export const viewportOnce = { once: true, margin: "-80px 0px" as const };
