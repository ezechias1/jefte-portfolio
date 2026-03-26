import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowDown, Play } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import PageTransition from '../components/ui/PageTransition';
import Reveal from '../components/ui/Reveal';
import FeaturedWork from '../components/sections/FeaturedWork';
import ServicesSnapshot from '../components/sections/ServicesSnapshot';
import StatsBar from '../components/sections/StatsBar';

export default function Home() {
  const videoRef = useRef(null);

  return (
    <PageTransition>
      <Helmet>
        <title>Jefte — Film Editor · Videographer · Photographer</title>
      </Helmet>

      {/* Hero */}
      <section className="relative min-h-screen flex flex-col justify-end overflow-hidden">
        {/* Background video/image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian/30 via-obsidian/20 to-obsidian z-10" />
          {/* Placeholder cinematic background — swap for real video/image */}
          <div
            className="w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at 30% 50%, #1a1208 0%, #080808 60%)',
            }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 z-[5]"
            style={{
              backgroundImage: 'linear-gradient(rgba(200,169,110,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,110,0.03) 1px, transparent 1px)',
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Hero content */}
        <div className="relative z-20 max-w-7xl mx-auto px-6 pb-24 pt-40 w-full">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="font-mono text-gold text-xs tracking-ultra uppercase mb-6"
          >
            Visual Storyteller
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(3.5rem,10vw,9rem)] font-light leading-none text-ivory mb-6"
          >
            Stories Worth
            <br />
            <em className="text-gold">Watching.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="font-body text-silver text-lg max-w-lg leading-relaxed mb-10"
          >
            Film editor, videographer and photographer based in Cape Town. Crafting cinematic visuals for brands, artists and moments that matter.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
            className="flex flex-wrap gap-4 items-center"
          >
            <Link to="/portfolio" className="btn-primary">View Work</Link>
            <Link to="/booking" className="btn-outline">Book Me</Link>
            <Link to="/quote" className="btn-ghost flex items-center gap-2">
              <span className="w-6 h-px bg-silver" />
              Request Quote
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
        >
          <p className="font-mono text-mist text-[10px] tracking-ultra uppercase">Scroll</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} className="text-gold" />
          </motion.div>
        </motion.div>

        {/* Side text */}
        <div className="absolute right-6 bottom-24 z-20 hidden lg:block">
          <p className="font-mono text-mist/50 text-[10px] tracking-ultra uppercase"
            style={{ writingMode: 'vertical-rl' }}>
            Film Editor · Videographer · Photographer
          </p>
        </div>
      </section>

      {/* Stats */}
      <StatsBar />

      {/* Reel section */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Reveal><p className="section-label">Highlight Reel</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">The Work</h2></Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/portfolio" className="btn-ghost">
              Full Portfolio <span className="ml-2">→</span>
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="relative aspect-video bg-carbon border border-ash/40 overflow-hidden group">
            {/* Replace src with actual reel URL */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="w-20 h-20 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer group-hover:bg-gold/10 transition-colors"
                >
                  <Play size={28} className="text-gold ml-1" />
                </motion.div>
                <p className="text-mist text-xs tracking-widest uppercase">2024 Showreel</p>
              </div>
            </div>
            {/* Replace this div with: <ReactPlayer url="YOUR_REEL_URL" width="100%" height="100%" controls /> */}
          </div>
        </Reveal>
      </section>

      {/* Featured work grid */}
      <FeaturedWork />

      {/* Services snapshot */}
      <ServicesSnapshot />

      {/* CTA banner */}
      <section className="py-24 border-y border-ash/40">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <Reveal>
            <p className="section-label text-center">Ready to create?</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl md:text-7xl font-light text-ivory mb-6">
              Let's tell your story
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-silver mb-10 max-w-md mx-auto">
              Whether it's a wedding, a brand film or a music video — every project deserves to be seen.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/booking" className="btn-primary">Book a Session</Link>
              <Link to="/quote" className="btn-outline">Get a Quote</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
