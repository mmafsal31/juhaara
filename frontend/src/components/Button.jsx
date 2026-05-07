import { motion } from "framer-motion";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const styles = variant === "primary"
    ? "bg-emerald text-white hover:bg-[#092c20]"
    : "border border-mist bg-ivory text-emerald hover:border-gold";

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      className={`rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition ${styles} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}

