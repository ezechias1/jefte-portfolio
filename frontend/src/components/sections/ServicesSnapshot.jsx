import { Link } from 'react-router-dom';
import { Film, Camera, Image } from 'lucide-react';
import Reveal from '../ui/Reveal';

const services = [
  {
    icon: Film,
    title: 'Film Editing',
    desc: 'From raw footage to polished narrative. Colour grading, sound design, motion graphics — every frame intentional.',
    tags: ['Premiere Pro', 'After Effects', 'DaVinci Resolve'],
  },
  {
    icon: Camera,
    title: 'Event Videography',
    desc: 'Weddings, corporate events, launches, concerts. Cinematic coverage that makes the moment timeless.',
    tags: ['4K Production', 'Drone', 'Multi-cam'],
  },
  {
    icon: Image,
    title: 'Photography',
    desc: 'Portraits, products, events. Clean, editorial imagery that works across print and digital.',
    tags: ['Lightroom', 'Studio', 'On-location'],
  },
];

export default function ServicesSnapshot() {
  return (
    <section className="py-24 bg-carbon/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <Reveal><p className="section-label">What I Do</p></Reveal>
            <Reveal delay={0.1}><h2 className="section-title">Services</h2></Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link to="/services" className="btn-ghost">Full Services <span className="ml-2">→</span></Link>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, desc, tags }, i) => (
            <Reveal key={title} delay={i * 0.12}>
              <div className="border border-ash/40 p-8 hover:border-gold/40 transition-colors duration-400 group h-full flex flex-col">
                <div className="w-10 h-10 border border-ash group-hover:border-gold transition-colors flex items-center justify-center mb-6">
                  <Icon size={18} className="text-gold" />
                </div>
                <h3 className="font-display text-2xl text-ivory mb-3">{title}</h3>
                <p className="text-silver text-sm leading-relaxed flex-1 mb-6">{desc}</p>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <span key={tag} className="text-[10px] font-mono tracking-wider text-mist border border-ash/40 px-2 py-1 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
