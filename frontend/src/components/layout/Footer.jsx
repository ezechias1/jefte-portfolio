import { Link } from 'react-router-dom';
import { Instagram, Youtube, Mail, MessageCircle, Phone } from 'lucide-react';

const CONTACT = {
  email: 'jeftenotwstudios@gmail.com',
  phone: '+27761708151',
  whatsapp: 'https://wa.me/27761708151',
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-ash/40 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <Link to="/" className="font-display text-3xl font-light tracking-widest text-ivory">JEFTE</Link>
            <p className="text-mist text-xs mt-2 tracking-widest uppercase">Film Editor · Videographer · Photographer</p>
          </div>

          <nav className="flex flex-wrap gap-6">
            {[['/', 'Home'], ['/portfolio', 'Work'], ['/about', 'About'], ['/services', 'Services'], ['/booking', 'Book Me'], ['/contact', 'Contact']].map(([to, label]) => (
              <Link key={to} to={to} className="text-silver hover:text-gold text-xs tracking-widest uppercase transition-colors">
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" title="WhatsApp"
              className="w-9 h-9 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors">
              <MessageCircle size={15} />
            </a>
            <a href={`mailto:${CONTACT.email}`} title="Email"
              className="w-9 h-9 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors">
              <Mail size={15} />
            </a>
            <a href={`tel:${CONTACT.phone}`} title="Call"
              className="w-9 h-9 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors">
              <Phone size={15} />
            </a>
            <a href={import.meta.env.VITE_INSTAGRAM_URL || '#'} target="_blank" rel="noopener noreferrer" title="Instagram"
              className="w-9 h-9 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors">
              <Instagram size={15} />
            </a>
            <a href={import.meta.env.VITE_YOUTUBE_URL || '#'} target="_blank" rel="noopener noreferrer" title="YouTube"
              className="w-9 h-9 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors">
              <Youtube size={15} />
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-ash/30 flex flex-col md:flex-row justify-between items-center gap-3 text-mist text-xs">
          <p>&copy; {year} Jefte. All rights reserved.</p>
          <p className="tracking-widest">CRAFTED WITH INTENT</p>
        </div>
      </div>
    </footer>
  );
}
