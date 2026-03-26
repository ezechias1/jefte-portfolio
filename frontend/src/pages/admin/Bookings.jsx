import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled', 'completed'];
const SERVICE_LABELS = { 'video-editing': 'Video Editing', 'event-videography': 'Videography', 'photography': 'Photography', 'other': 'Other' };
const STATUS_COLORS = { pending: 'text-amber border-amber/30 bg-amber/5', confirmed: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5', cancelled: 'text-red-400 border-red-400/30 bg-red-400/5', completed: 'text-mist border-ash/40 bg-graphite/30' };

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  const fetchBookings = () => {
    const params = filterStatus ? `?status=${filterStatus}` : '';
    api.get(`/bookings${params}`)
      .then(({ data }) => setBookings(data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchBookings(); }, [filterStatus]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/bookings/${id}`, { status });
      toast.success('Status updated.');
      fetchBookings();
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
    } catch { toast.error('Update failed.'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-mist text-xs tracking-widest uppercase mb-1">Manage</p>
          <h1 className="font-display text-4xl text-ivory">Bookings</h1>
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="input-field w-40 bg-graphite text-sm"
        >
          <option value="">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-graphite/30 animate-pulse" />)}</div>
      ) : bookings.length === 0 ? (
        <div className="border border-ash/40 py-20 text-center">
          <p className="text-mist text-sm">No bookings found.</p>
        </div>
      ) : (
        <div className="border border-ash/40 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-ash/40 bg-graphite/30">
              <tr>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono">Client</th>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono hidden md:table-cell">Service</th>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono hidden lg:table-cell">Date</th>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {bookings.map((b) => (
                <tr key={b._id} className="border-b border-ash/20 hover:bg-graphite/20 transition-colors cursor-pointer" onClick={() => setSelected(b)}>
                  <td className="px-4 py-3">
                    <p className="text-ivory">{b.name}</p>
                    <p className="text-mist text-xs">{b.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-silver text-xs">{SERVICE_LABELS[b.service]}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-mist text-xs">
                    {b.date ? new Date(b.date).toLocaleDateString('en-ZA') : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-mono px-2 py-1 border ${STATUS_COLORS[b.status]}`}>{b.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select
                      value={b.status}
                      onChange={e => { e.stopPropagation(); updateStatus(b._id, e.target.value); }}
                      onClick={e => e.stopPropagation()}
                      className="bg-graphite border border-ash text-silver text-xs px-2 py-1 focus:outline-none focus:border-gold"
                    >
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail panel */}
      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-obsidian/80 z-40" onClick={() => setSelected(null)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-carbon border-l border-ash/40 z-50 overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl text-ivory">Booking Detail</h2>
                <button onClick={() => setSelected(null)} className="text-mist hover:text-ivory"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                {[
                  ['Client', selected.name],
                  ['Email', selected.email],
                  ['Phone', selected.phone || '—'],
                  ['Service', SERVICE_LABELS[selected.service]],
                  ['Date', selected.date ? new Date(selected.date).toDateString() : '—'],
                  ['Submitted', new Date(selected.createdAt).toLocaleString('en-ZA')],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-4">
                    <span className="text-mist text-xs tracking-widest uppercase w-24 flex-shrink-0 pt-0.5">{label}</span>
                    <span className="text-ivory text-sm">{val}</span>
                  </div>
                ))}

                {selected.message && (
                  <div>
                    <p className="text-mist text-xs tracking-widest uppercase mb-2">Message</p>
                    <p className="text-silver text-sm leading-relaxed bg-graphite/40 p-3">{selected.message}</p>
                  </div>
                )}

                <div className="pt-4 border-t border-ash/40">
                  <p className="text-mist text-xs tracking-widest uppercase mb-2">Update Status</p>
                  <div className="flex flex-wrap gap-2">
                    {STATUS_OPTIONS.map(s => (
                      <button key={s} onClick={() => updateStatus(selected._id, s)}
                        className={`text-xs px-3 py-1.5 border transition-colors ${selected.status === s ? 'border-gold text-gold' : 'border-ash text-mist hover:border-silver hover:text-silver'}`}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-mist text-xs tracking-widest uppercase mb-2">Quick Reply via Email</p>
                  <a href={`mailto:${selected.email}?subject=Re: Your Booking Request&body=Hi ${selected.name},%0A%0AThanks for your booking request!%0A%0A`}
                    className="btn-outline w-full justify-center text-xs">
                    Open Email Client
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
