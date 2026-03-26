import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import api from '../../utils/api';
import Reveal from '../ui/Reveal';

export default function FeaturedWork() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/portfolio/featured')
      .then(({ data }) => setItems(data.data || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  // Placeholder items for when DB is empty
  const displayItems = items.length > 0 ? items : [
    { _id: '1', title: 'Brand Film — Luxe Co.', category: 'video', mediaType: 'video', thumbnailUrl: null },
    { _id: '2', title: 'Wedding Day', category: 'photography', mediaType: 'image', thumbnailUrl: null },
    { _id: '3', title: 'Music Video Edit', category: 'editing', mediaType: 'video', thumbnailUrl: null },
    { _id: '4', title: 'Corporate Event', category: 'video', mediaType: 'video', thumbnailUrl: null },
    { _id: '5', title: 'Portrait Series', category: 'photography', mediaType: 'image', thumbnailUrl: null },
    { _id: '6', title: 'Documentary Cut', category: 'editing', mediaType: 'video', thumbnailUrl: null },
  ];

  const categoryColor = { video: 'Video', photography: 'Photography', editing: 'Editing' };

  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <Reveal><p className="section-label">Selected Work</p></Reveal>
          <Reveal delay={0.1}><h2 className="section-title">Featured Projects</h2></Reveal>
        </div>
        <Reveal delay={0.2}>
          <Link to="/portfolio" className="btn-ghost">
            All Projects <span className="ml-2">→</span>
          </Link>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayItems.slice(0, 6).map((item, i) => (
          <Reveal key={item._id} delay={i * 0.08}>
            <Link to="/portfolio" className="group block relative overflow-hidden bg-carbon border border-ash/30 aspect-[4/3] card-hover">
              {/* Thumbnail */}
              {item.thumbnailUrl || item.mediaUrl ? (
                <img
                  src={item.thumbnailUrl || item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-graphite to-carbon flex items-center justify-center">
                  <div className="text-ash/30">
                    {item.mediaType === 'video' ? <Play size={32} /> : (
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                      </svg>
                    )}
                  </div>
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex flex-col justify-end p-5">
                <p className="text-gold text-xs tracking-widest uppercase mb-1">{categoryColor[item.category]}</p>
                <h3 className="font-display text-xl text-ivory">{item.title}</h3>
                {item.client && <p className="text-silver text-xs mt-1">{item.client}</p>}
              </div>

              {/* Always-visible badge */}
              <div className="absolute top-3 left-3">
                <span className="bg-obsidian/80 text-gold text-[10px] tracking-widest uppercase px-2 py-1 font-mono">
                  {categoryColor[item.category]}
                </span>
              </div>

              {item.mediaType === 'video' && (
                <div className="absolute top-3 right-3">
                  <div className="w-7 h-7 rounded-full bg-obsidian/80 flex items-center justify-center">
                    <Play size={10} className="text-gold ml-0.5" />
                  </div>
                </div>
              )}
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
