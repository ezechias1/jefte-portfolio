import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, Instagram, Youtube, Mail, MessageCircle, MapPin, Phone } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import PageTransition from '../components/ui/PageTransition';
import Reveal from '../components/ui/Reveal';
import { FormField, Input, Textarea } from '../components/ui/FormFields';

const CONTACT = {
  email: 'jeftenotwstudios@gmail.com',
  phone: '076 170 8151',
  phoneTel: '+27761708151',
  whatsapp: 'https://wa.me/27761708151',
  location: 'Cape Town, South Africa',
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/contact', data);
      setSubmitted(true);
      reset();
    } catch {
      // Fallback: open mailto if API is unavailable
      const subject = encodeURIComponent(`New message from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
      window.open(`mailto:${CONTACT.email}?subject=${subject}&body=${body}`, '_self');
      toast.success('Opening your email client...');
      setSubmitted(true);
      reset();
    }
  };

  return (
    <PageTransition>
      <Helmet>
        <title>Contact — Jefte</title>
      </Helmet>

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left */}
          <div className="lg:col-span-2">
            <Reveal><p className="section-label">Say Hello</p></Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl font-light text-ivory leading-none mb-6">
                Let's<br /><em className="text-gold">Connect</em>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-silver leading-relaxed mb-10">
                Whether it's a project idea, a collaboration or just a question — I'm always open to a good conversation.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 border border-ash flex items-center justify-center flex-shrink-0">
                    <MapPin size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-mist tracking-widest uppercase">Location</p>
                    <p className="text-ivory text-sm">{CONTACT.location}</p>
                  </div>
                </div>

                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-4 group">
                  <div className="w-9 h-9 border border-ash group-hover:border-gold flex items-center justify-center flex-shrink-0 transition-colors">
                    <Mail size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-mist tracking-widest uppercase">Email</p>
                    <p className="text-ivory text-sm group-hover:text-gold transition-colors">{CONTACT.email}</p>
                  </div>
                </a>

                <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center gap-4 group">
                  <div className="w-9 h-9 border border-ash group-hover:border-gold flex items-center justify-center flex-shrink-0 transition-colors">
                    <Phone size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-mist tracking-widest uppercase">Phone</p>
                    <p className="text-ivory text-sm group-hover:text-gold transition-colors">{CONTACT.phone}</p>
                  </div>
                </a>

                <div className="flex gap-3 pt-4 border-t border-ash/40">
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors"
                    title="WhatsApp">
                    <MessageCircle size={15} />
                  </a>
                  <a href={`mailto:${CONTACT.email}`}
                    className="w-10 h-10 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors"
                    title="Email">
                    <Mail size={15} />
                  </a>
                  <a href={import.meta.env.VITE_INSTAGRAM_URL || '#'} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors"
                    title="Instagram">
                    <Instagram size={15} />
                  </a>
                  <a href={import.meta.env.VITE_YOUTUBE_URL || '#'} target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 border border-ash flex items-center justify-center text-silver hover:border-gold hover:text-gold transition-colors"
                    title="YouTube">
                    <Youtube size={15} />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="border border-ash/40 p-12 text-center"
              >
                <div className="w-14 h-14 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={24} className="text-gold" />
                </div>
                <h3 className="font-display text-3xl text-ivory mb-3">Message Sent!</h3>
                <p className="text-silver mb-6">I'll get back to you as soon as possible.</p>
                <button onClick={() => setSubmitted(false)} className="btn-outline">Send Another</button>
              </motion.div>
            ) : (
              <Reveal delay={0.1}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border border-ash/40 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField label="Name" required error={errors.name?.message}>
                      <Input register={register('name', { required: 'Name is required' })} placeholder="Your name" error={errors.name} />
                    </FormField>
                    <FormField label="Email" required error={errors.email?.message}>
                      <Input
                        register={register('email', {
                          required: 'Email is required',
                          pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                        })}
                        type="email" placeholder="you@email.com" error={errors.email}
                      />
                    </FormField>
                  </div>

                  <FormField label="Message" required error={errors.message?.message}>
                    <Textarea
                      register={register('message', {
                        required: 'Message is required',
                        maxLength: { value: 2000, message: 'Max 2000 characters' },
                      })}
                      rows={6}
                      placeholder="What's on your mind?"
                      error={errors.message}
                    />
                  </FormField>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : 'Send Message'}
                  </button>
                </form>
              </Reveal>
            )}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}
