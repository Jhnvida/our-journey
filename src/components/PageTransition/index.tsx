import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { pageTransition } from "../../lib/animations";

interface PageTransitionProps {
    children: ReactNode;
    className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
    return (
        <motion.div initial="hidden" animate="visible" exit="exit" variants={pageTransition} className={className}>
            {children}
        </motion.div>
    );
}
