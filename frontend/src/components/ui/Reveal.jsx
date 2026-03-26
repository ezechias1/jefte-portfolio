import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Reveal({ children, delay = 0, className = '', direction = 'up' }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.12 });

  const directions = {
    up: { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } },
    left: { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 32 }, visible: { opacity: 1, x: 0 } },
    fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={directions[direction]}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
