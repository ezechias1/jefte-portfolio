import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import ReactPlayer from 'react-player/lazy';
import api from '../utils/api';
import PageTransition from '../components/ui/PageTransition';
import Reveal from '../components/ui/Reveal';

const FILTERS = [
  { value: 'all', label: 'All Work' },
  { value: 'video', label: 'Video' },
  { value: 'photography', label: 'Photography' },
  { value: 'editing', label: 'Editing' },
];

// Fallback demo items when DB is empty
const DEMO_ITEMS = Array.from({ length: 9 }, (_, i) => ({
  _id: String(i + 1),
  title: ['Brand Film', 'Wedding Day', 'Music Video', 'Documentary', 'Portrait Series', 'Corporate Event', 'Fashion Shoot', 'Short Film', 'Social Media Campaign'][i],
  category: ['video', 'photography', 'editing', 'video', 'photography', 'video', 'photography', 'editing', 'video'][i],
  mediaType: ['video', 'image', 'video', 'video', 'image', 'video', 'image', 'video', 'video'][i],
  thumbnailUrl: null,
  mediaUrl: null,
  client: ['Luxe Co.', null, 'Artist Name', null, null, 'Corp Inc.', null, null, 'Brand X'][i],
  year: 2024,
}));

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [videoModal, setVideoModal] = useState(null);

  useEffect(() => {
    api.get('/portfolio')
      .then(({ data }) => setItems(data.data?.length > 0 ? data.data : DEMO_ITEMS))
      .catch(() => setItems(DEMO_ITEMS))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter);
  const imageItems = filtered.filter(i => i.mediaType === 'image');
  const lightboxSlides = imageItems.map(i => ({ src: i.mediaUrl || i.thumbnailUrl || '/placeholder.jpg', alt: i.title }));

  const openLightbox = (item) => {
    if (item.mediaType === 'image') {
      const idx = imageItems.findIndex(i => i._id === item._id);
      setLightboxIndex(idx);
      setLightboxOpen(true);
    } else {
      setVideoModal(item);
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Portfolio — Jefte</title>
        <meta name="description" content="Explore Jefte's portfolio of film editing, videography and photography work." />
      </Helmet>

      {/* Header */}
      <section className="pt-36 pb-16 max-w-7xl mx-auto px-6">
        <Reveal><p className="section-label">Creative Portfolio</p></Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl font-light text-ivory leading-none mb-6">
            The Work
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-silver max-w-lg leading-relaxed">
            A curated selection of film, video and photography work. Each project is a story — built frame by frame.
          </p>
        </Reveal>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <div className="flex flex-wrap gap-2 border-b border-ash/40 pb-6">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={`px-5 py-2 text-xs tracking-widest uppercase font-mono transition-all duration-200 ${
                filter === value
                  ? 'bg-gold text-obsidian'
                  : 'border border-ash text-silver hover:border-gold hover:text-gold'
              }`}
            >
              {label}
            </button>
          ))}
          <span className="ml-auto text-mist text-xs font-mono self-center">
            {filtered.length} item{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-graphite animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <AnimatePresence>
              {filtered.map((item, i) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  onClick={() => openLightbox(item)}
                  className="group relative cursor-pointer overflow-hidden bg-carbon border border-ash/30 aspect-[4/3] hover:border-gold/30 transition-colors duration-300"
                >
                  {/* Media */}
                  {item.thumbnailUrl || item.mediaUrl ? (
                    <img
                      src={item.thumbnailUrl || item.mediaUrl}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-graphite to-carbon flex items-center justify-center">
                      <div className="text-ash/20">
                        {item.mediaType === 'video'
                          ? <Play size={40} />
                          : <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8"><rect x="3" y="3" width="18" height="18" rx="1"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                        }
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                    <p className="text-gold text-[10px] tracking-ultra uppercase mb-1 font-mono">{item.category}</p>
                    <h3 className="font-display text-xl text-ivory">{item.title}</h3>
                    {item.client && <p className="text-mist text-xs mt-0.5">Client: {item.client}</p>}
                    {item.year && <p className="text-ash text-xs mt-0.5">{item.year}</p>}
                  </div>

                  {/* Play icon for videos */}
                  {item.mediaType === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-14 h-14 rounded-full border-2 border-gold flex items-center justify-center bg-obsidian/60 backdrop-blur-sm">
                        <Play size={18} className="text-gold ml-1" />
                      </div>
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3 left-3 opacity-80">
                    <span className="bg-obsidian/90 text-gold text-[9px] tracking-widest uppercase px-2 py-1 font-mono">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="py-32 text-center">
            <p className="text-mist text-sm tracking-widest uppercase">No items in this category yet.</p>
          </div>
        )}
      </div>

      {/* Image lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={lightboxSlides}
      />

      {/* Video modal */}
      <AnimatePresence>
        {videoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-obsidian/95 z-50 flex items-center justify-center p-4"
            onClick={() => setVideoModal(null)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full max-w-4xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-gold text-xs font-mono tracking-widest uppercase">{videoModal.category}</p>
                  <h3 className="font-display text-2xl text-ivory">{videoModal.title}</h3>
                </div>
                <button onClick={() => setVideoModal(null)} className="text-silver hover:text-ivory p-2">
                  <X size={20} />
                </button>
              </div>
              {videoModal.embedUrl || videoModal.mediaUrl ? (
                <div className="relative aspect-video bg-carbon">
                  <ReactPlayer
                    url={videoModal.embedUrl || videoModal.mediaUrl}
                    width="100%"
                    height="100%"
                    controls
                    playing
                    className="react-player"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-carbon border border-ash flex items-center justify-center">
                  <p className="text-mist text-sm">Video URL not set</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
