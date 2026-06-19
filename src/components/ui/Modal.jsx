import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button";
import Icon from "./Icon";

export default function Modal({ open, title, children, onClose }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/40 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="glass-panel w-full max-w-lg rounded-xl p-6" initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }}>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-navy">{title}</h2>
              <Button variant="ghost" className="h-10 w-10 p-0" onClick={onClose} aria-label="Close modal">
                <Icon name="close" />
              </Button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
