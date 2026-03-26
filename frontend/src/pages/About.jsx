import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import PageTransition from '../components/ui/PageTransition';
import Reveal from '../components/ui/Reveal';

const skills = [
  { category: 'Editing & Post', tools: ['Adobe Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro X'] },
  { category: 'Photography', tools: ['Adobe Lightroom', 'Photoshop', 'Capture One'] },
  { category: 'Production', tools: ['Sony FX3', 'BMPCC 6K', 'DJI Mavic 3', 'Ronin RS3'] },
  { category: 'Audio', tools: ['Adobe Audition', 'Logic Pro', 'Rode', 'Zoom H6'] },
];

const timeline = [
  { year: '2016', event: 'Started filming with a borrowed DSLR. Never looked back.' },
  { year: '2018', event: 'First professional music video shoot. Learned everything on set.' },
  { year: '2020', event: 'Launched freelance studio. Weddings, corporates, brands.' },
  { year: '2022', event: 'Expanded to full post-production. Editing for international clients.' },
  { year: '2024', event: 'Based in Cape Town. Shooting globally. Telling stories that matter.' },
];

export default function About() {
  return (
    <PageTransition>
      <Helmet>
        <title>About — Jefte</title>
        <meta name="description" content="Jefte is a Cape Town-based film editor, videographer and photographer with 8+ years of experience." />
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-0 max-w-7xl mx-auto px-6">
        <Reveal><p className="section-label">About Me</p></Reveal>
        <Reveal delay={0.1}>
          <h1 className="font-display text-6xl md:text-8xl font-light text-ivory leading-none">
            The Person<br />
            <em className="text-gold">Behind the Lens</em>
          </h1>
        </Reveal>
      </section>

      {/* Main content */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Photo */}
          <Reveal direction="left">
            <div className="relative">
              <div className="aspect-[3/4] bg-graphite border border-ash/40 overflow-hidden">
                {/* Replace with Jefte's actual photo */}
                <div className="w-full h-full bg-gradient-to-br from-graphite via-smoke to-carbon flex items-center justify-center">
                  <p className="text-mist text-xs tracking-widest uppercase">[ Professional Photo ]</p>
                </div>
              </div>
              {/* Decorative frame */}
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold/20 pointer-events-none" />
              {/* Gold accent */}
              <div className="absolute top-0 left-0 w-16 h-1 bg-gold" />
            </div>
          </Reveal>

          {/* Text */}
          <div className="space-y-8">
            <Reveal delay={0.1}>
              <div className="space-y-4 text-silver leading-relaxed">
                <p className="text-xl font-display text-ivory font-light">
                  I'm Jefte — a visual storyteller based in Cape Town, South Africa.
                </p>
                <p>
                  I started with a camera and a vision: to capture moments the way they feel, not just the way they look. Eight years later, I've worked with brands, artists, couples and corporations — each project teaching me something new about the power of a single frame.
                </p>
                <p>
                  My work lives at the intersection of technical precision and emotional authenticity. Whether I'm colour-grading a fashion film at 2am or capturing golden-hour portraits, I bring the same intentionality to every pixel.
                </p>
                <p>
                  When the camera isn't rolling, I'm studying films, obsessing over typography, or hiking up Table Mountain for the light.
                </p>
              </div>
            </Reveal>

            {/* Quick facts */}
            <Reveal delay={0.2}>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-ash/40">
                {[
                  ['Based in', 'Cape Town, SA'],
                  ['Available for', 'Local & Travel'],
                  ['Languages', 'English, Afrikaans'],
                  ['Experience', '8+ Years'],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="text-mist text-xs tracking-widest uppercase mb-1">{label}</p>
                    <p className="text-ivory text-sm">{value}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-20 bg-carbon/40">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal><p className="section-label">Tools & Skills</p></Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display text-5xl font-light text-ivory mb-12">The Craft</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map(({ category, tools }, i) => (
              <Reveal key={category} delay={i * 0.08}>
                <div className="border border-ash/40 p-6 h-full">
                  <p className="text-gold text-xs font-mono tracking-widest uppercase mb-4">{category}</p>
                  <ul className="space-y-2">
                    {tools.map(tool => (
                      <li key={tool} className="text-silver text-sm flex items-center gap-2">
                        <span className="w-1 h-1 bg-gold rounded-full flex-shrink-0" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-6">
        <Reveal><p className="section-label">The Journey</p></Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-5xl font-light text-ivory mb-12">Timeline</h2>
        </Reveal>

        <div className="relative">
          <div className="absolute left-16 top-0 bottom-0 w-px bg-ash/40" />
          <div className="space-y-8">
            {timeline.map(({ year, event }, i) => (
              <Reveal key={year} delay={i * 0.1}>
                <div className="flex items-start gap-8">
                  <div className="w-32 flex-shrink-0 text-right">
                    <span className="font-mono text-gold text-sm">{year}</span>
                  </div>
                  <div className="relative">
                    <div className="absolute -left-[33px] top-1.5 w-2 h-2 rounded-full bg-gold border-2 border-obsidian" />
                    <p className="text-silver leading-relaxed">{event}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
