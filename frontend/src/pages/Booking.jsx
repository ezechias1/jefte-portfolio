import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import PageTransition from '../components/ui/PageTransition';
import Reveal from '../components/ui/Reveal';
import { FormField, Input, Select, Textarea } from '../components/ui/FormFields';

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/bookings', data);
      setSubmitted(true);
      reset();
    } catch {
      // Fallback: open mailto if API is unavailable
      const subject = encodeURIComponent(`Booking Request from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nService: ${data.service}\nDate: ${data.date || 'Flexible'}\n\n${data.message || ''}`);
      window.open(`mailto:jeftenotwstudios@gmail.com?subject=${subject}&body=${body}`, '_self');
      toast.success('Opening your email client...');
      setSubmitted(true);
      reset();
    }
  };

  const whatsapp = `https://wa.me/27761708151?text=Hi Jefte, I'd like to book a session.`;

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <Check size={28} className="text-gold" />
            </div>
            <h2 className="font-display text-4xl text-ivory mb-4">Request Received!</h2>
            <p className="text-silver leading-relaxed mb-8">
              Thanks for reaching out. I'll review your booking request and get back to you within 24–48 hours to confirm availability.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-outline">
              Submit Another
            </button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Book a Session — Jefte</title>
        <meta name="description" content="Book Jefte for your next film, video or photography project." />
      </Helmet>

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          {/* Left info */}
          <div className="lg:col-span-2">
            <Reveal><p className="section-label">Get in Touch</p></Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl font-light text-ivory leading-none mb-6">
                Book a<br /><em className="text-gold">Session</em>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-silver leading-relaxed mb-10">
                Fill in the details below and I'll confirm availability. No commitment needed at this stage — just a conversation.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="space-y-4 border-t border-ash/40 pt-8">
                {[
                  ['Response time', '24–48 hours'],
                  ['Based in', 'Cape Town, SA'],
                  ['Travel', 'Available nationwide'],
                ].map(([label, val]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-mist">{label}</span>
                    <span className="text-ivory">{val}</span>
                  </div>
                ))}

                <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                  className="btn-outline w-full justify-center mt-4 flex items-center gap-2 text-xs">
                  <MessageCircle size={13} />
                  WhatsApp Instead
                </a>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border border-ash/40 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Full Name" required error={errors.name?.message}>
                  <Input
                    register={register('name', { required: 'Name is required' })}
                    placeholder="Your name"
                    error={errors.name}
                  />
                </FormField>
                <FormField label="Email" required error={errors.email?.message}>
                  <Input
                    register={register('email', {
                      required: 'Email is required',
                      pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
                    })}
                    type="email"
                    placeholder="you@email.com"
                    error={errors.email}
                  />
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Phone">
                  <Input
                    register={register('phone')}
                    type="tel"
                    placeholder="+27 ..."
                  />
                </FormField>
                <FormField label="Service Needed" required error={errors.service?.message}>
                  <Select
                    register={register('service', { required: 'Please select a service' })}
                    error={errors.service}
                  >
                    <option value="">Select a service</option>
                    <option value="video-editing">Video Editing</option>
                    <option value="event-videography">Event Videography</option>
                    <option value="photography">Photography</option>
                    <option value="other">Other / Not sure</option>
                  </Select>
                </FormField>
              </div>

              <FormField label="Preferred Date">
                <Input
                  register={register('date')}
                  type="date"
                />
              </FormField>

              <FormField label="Tell me about your project" error={errors.message?.message}>
                <Textarea
                  register={register('message', { maxLength: { value: 1000, message: 'Max 1000 characters' } })}
                  rows={5}
                  placeholder="What's the occasion? Any specific requirements or ideas?"
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
                ) : 'Send Booking Request'}
              </button>

              <p className="text-mist text-xs text-center">
                By submitting you agree to be contacted about your booking.
              </p>
            </form>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
