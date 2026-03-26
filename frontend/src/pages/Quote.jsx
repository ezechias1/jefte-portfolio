import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import PageTransition from '../components/ui/PageTransition';
import Reveal from '../components/ui/Reveal';
import { FormField, Input, Select, Textarea } from '../components/ui/FormFields';

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      await api.post('/quotes', data);
      setSubmitted(true);
      reset();
    } catch {
      const subject = encodeURIComponent(`Quote Request from ${data.name}`);
      const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}\nProject: ${data.projectType}\nBudget: ${data.budgetRange || 'Not specified'}\nDeadline: ${data.deadline || 'Flexible'}\n\n${data.description}`);
      window.open(`mailto:jeftenotwstudios@gmail.com?subject=${subject}&body=${body}`, '_self');
      toast.success('Opening your email client...');
      setSubmitted(true);
      reset();
    }
  };

  if (submitted) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
            <div className="w-16 h-16 border-2 border-gold rounded-full flex items-center justify-center mx-auto mb-8">
              <Check size={28} className="text-gold" />
            </div>
            <h2 className="font-display text-4xl text-ivory mb-4">Quote Request Sent!</h2>
            <p className="text-silver leading-relaxed mb-8">
              I'll review your project details and send a tailored proposal within 48 hours.
            </p>
            <button onClick={() => setSubmitted(false)} className="btn-outline">Submit Another</button>
          </motion.div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <Helmet>
        <title>Request a Quote — Jefte</title>
      </Helmet>

      <section className="pt-36 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
          <div className="lg:col-span-2">
            <Reveal><p className="section-label">Pricing</p></Reveal>
            <Reveal delay={0.1}>
              <h1 className="font-display text-5xl md:text-6xl font-light text-ivory leading-none mb-6">
                Request a<br /><em className="text-gold">Quote</em>
              </h1>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="text-silver leading-relaxed mb-8">
                Every project is unique. Share your vision and I'll put together a detailed proposal with pricing, timeline and deliverables.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="space-y-3 border border-ash/40 p-6">
                <p className="text-gold text-xs font-mono tracking-widest uppercase">What to expect</p>
                {[
                  'Detailed scope breakdown',
                  'Transparent pricing (no hidden fees)',
                  'Timeline & milestones',
                  'Deliverables list',
                  'Response within 48 hours',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-silver">
                    <Check size={12} className="text-gold flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 border border-ash/40 p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Full Name" required error={errors.name?.message}>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Phone">
                  <Input register={register('phone')} type="tel" placeholder="+27 ..." />
                </FormField>
                <FormField label="Project Type" required error={errors.projectType?.message}>
                  <Select register={register('projectType', { required: 'Select a project type' })} error={errors.projectType}>
                    <option value="">Select type</option>
                    <option value="wedding">Wedding Film</option>
                    <option value="corporate">Corporate / Brand</option>
                    <option value="music-video">Music Video</option>
                    <option value="documentary">Documentary</option>
                    <option value="photography">Photography</option>
                    <option value="social-media">Social Media Content</option>
                    <option value="other">Other</option>
                  </Select>
                </FormField>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField label="Budget Range">
                  <Select register={register('budgetRange')}>
                    <option value="">Prefer not to say</option>
                    <option value="under-5k">Under R5,000</option>
                    <option value="5k-10k">R5,000 – R10,000</option>
                    <option value="10k-25k">R10,000 – R25,000</option>
                    <option value="25k-50k">R25,000 – R50,000</option>
                    <option value="50k-plus">R50,000+</option>
                    <option value="discuss">Let's discuss</option>
                  </Select>
                </FormField>
                <FormField label="Project Deadline">
                  <Input register={register('deadline')} type="date" />
                </FormField>
              </div>

              <FormField label="Project Description" required error={errors.description?.message}>
                <Textarea
                  register={register('description', {
                    required: 'Please describe your project',
                    minLength: { value: 20, message: 'Please provide more detail (min 20 characters)' },
                  })}
                  rows={6}
                  placeholder="Tell me about the project — what do you need, what's the vision, any references or inspiration?"
                  error={errors.description}
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
                ) : 'Send Quote Request'}
              </button>
            </form>
          </Reveal>
        </div>
      </section>
    </PageTransition>
  );
}
