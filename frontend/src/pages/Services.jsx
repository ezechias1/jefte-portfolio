import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Film, Camera, Image, Check, MessageCircle } from 'lucide-react';
import PageTransition from '../components/ui/PageTransition';
import Reveal from '../components/ui/Reveal';

const services = [
  {
    icon: Film,
    title: 'Video Editing & Post-Production',
    tagline: 'Where the story truly comes to life.',
    description: 'I take your raw footage and transform it into a cinematic story. From wedding films to brand commercials — precise cuts, colour grading, sound design and motion graphics that elevate the final product.',
    includes: [
      'Full offline & online editing',
      'Professional colour grading (DaVinci Resolve)',
      'Motion graphics & titles',
      'Sound design & audio mixing',
      'Multiple revisions included',
      'Export in all formats (4K, web, social)',
    ],
    pricing: 'From R3,500 / project',
    turnaround: '3–10 business days',
    cta: '/quote',
  },
  {
    icon: Camera,
    title: 'Event Videography',
    tagline: 'Every moment, every emotion — preserved.',
    description: 'Weddings, corporate events, product launches, concerts, graduations. I arrive prepared and capture the full story — from the quiet moments to the big ones.',
    includes: [
      'Full-day coverage available',
      '4K cinema-quality footage',
      'Drone aerial footage',
      'Multiple camera angles',
      'Highlight film (2–5 min)',
      'Full footage delivery',
    ],
    pricing: 'From R8,000 / event',
    turnaround: '2–3 weeks post-event',
    cta: '/booking',
  },
  {
    icon: Image,
    title: 'Photography',
    tagline: 'Stills that speak.',
    description: 'Editorial, portrait, product and event photography. Clean, high-impact images that work across websites, social media, print and campaign materials.',
    includes: [
      'Portrait & lifestyle sessions',
      'Product photography',
      'Event & conference photography',
      'Professional editing & retouching',
      'High-res & web-optimised delivery',
      'Commercial usage rights included',
    ],
    pricing: 'From R2,500 / session',
    turnaround: '3–5 business days',
    cta: '/booking',
  },
];

const addons = [
  'Same-day turnaround (+50%)',
  'Rush editing (48hr)',
  'Social media cuts (9:16 format)',
  'Subtitles & captions',
  'Script & storyboard consultation',
  'Drone footage only packages',
];

export default function Services() {
  const whatsapp = `https://wa.me/${(import.meta.env.VITE_WHATSAPP_NUMBER || '+27000000000').replace(/\D/g, '')}?text=Hi Jefte, I'd like to discuss a project.`;

  return (
    <PageTransition>
      <Helmet>
        <title>Services — Jefte</title>
        <meta name="description" content="Film editing, event videography and photography services by Jefte. Based in Cape Town." />
      </Helmet>

      {/* Header */}
      <section className="pt-36 pb-16 max-w-7xl mx-auto px-6">
        <Reveal><p className="section-label">What I Offer</p></Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl font-light text-ivory leading-none">
            Services
          </h1>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-silver max-w-lg mt-6 leading-relaxed">
            Every project is different. These are the core offerings — but I'm always open to discussing custom scopes and collaborations.
          </p>
        </Reveal>
      </section>

      {/* Service cards */}
      <section className="py-8 max-w-7xl mx-auto px-6 space-y-6 pb-24">
        {services.map(({ icon: Icon, title, tagline, description, includes, pricing, turnaround, cta }, i) => (
          <Reveal key={title} delay={i * 0.1}>
            <div className="border border-ash/40 hover:border-gold/30 transition-colors duration-400 p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left */}
                <div className="lg:col-span-2">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-10 h-10 border border-gold/40 flex items-center justify-center">
                      <Icon size={18} className="text-gold" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] text-gold tracking-ultra uppercase">{tagline}</p>
                    </div>
                  </div>
                  <h2 className="font-display text-3xl md:text-4xl text-ivory mb-4">{title}</h2>
                  <p className="text-silver leading-relaxed mb-8">{description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {includes.map(item => (
                      <div key={item} className="flex items-start gap-3">
                        <Check size={13} className="text-gold mt-0.5 flex-shrink-0" />
                        <span className="text-silver text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right */}
                <div className="border border-ash/40 p-6 flex flex-col gap-6 self-start">
                  <div>
                    <p className="text-mist text-xs tracking-widest uppercase mb-1">Starting from</p>
                    <p className="font-display text-3xl text-gold">{pricing}</p>
                  </div>
                  <div>
                    <p className="text-mist text-xs tracking-widest uppercase mb-1">Turnaround</p>
                    <p className="text-ivory text-sm">{turnaround}</p>
                  </div>
                  <div className="space-y-3 pt-2 border-t border-ash/40">
                    <Link to={cta} className="btn-primary w-full justify-center text-xs">
                      {cta === '/booking' ? 'Book This' : 'Request Quote'}
                    </Link>
                    <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                      className="btn-outline w-full justify-center text-xs flex items-center gap-2">
                      <MessageCircle size={13} />
                      WhatsApp Me
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* Add-ons */}
      <section className="py-16 bg-carbon/40 border-t border-ash/40">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal><p className="section-label">Extras</p></Reveal>
          <Reveal delay={0.1}><h2 className="font-display text-4xl text-ivory mb-8">Add-Ons</h2></Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {addons.map((addon, i) => (
              <Reveal key={addon} delay={i * 0.06}>
                <div className="border border-ash/30 px-4 py-3 flex items-center gap-3">
                  <span className="w-1.5 h-1.5 bg-gold rounded-full flex-shrink-0" />
                  <span className="text-silver text-sm">{addon}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <p className="text-mist text-sm mt-8">
              Not seeing what you need?{' '}
              <Link to="/contact" className="text-gold hover:underline">Get in touch</Link>
              {' '}and let's figure it out together.
            </p>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
