import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

const stats = [
  { value: '150+', label: 'Projects Delivered' },
  { value: '8+', label: 'Years Experience' },
  { value: '50+', label: 'Happy Clients' },
  { value: '12', label: 'Awards & Features' },
];

export default function StatsBar() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section ref={ref} className="border-y border-ash/40 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="text-center"
          >
            <p className="font-display text-4xl md:text-5xl text-gold font-light">{value}</p>
            <p className="text-mist text-xs tracking-widest uppercase mt-2">{label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
