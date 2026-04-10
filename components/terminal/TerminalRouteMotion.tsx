"use client";

import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;
export default function TerminalRouteMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col flex-1 min-h-0 overflow-hidden"
      initial={{ opacity: 0.96 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.32, ease }}
    >
      {children}
    </motion.div>
  );
}
