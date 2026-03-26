import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const STATUS_OPTIONS = ['new', 'reviewed', 'quoted', 'accepted', 'declined'];
const STATUS_COLORS = {
  new: 'text-amber border-amber/30 bg-amber/5',
  reviewed: 'text-blue-400 border-blue-400/30 bg-blue-400/5',
  quoted: 'text-gold border-gold/30 bg-gold/5',
  accepted: 'text-emerald-400 border-emerald-400/30 bg-emerald-400/5',
  declined: 'text-red-400 border-red-400/30 bg-red-400/5',
};
const BUDGET_LABELS = {
  'under-5k': 'Under R5k', '5k-10k': 'R5k–R10k', '10k-25k': 'R10k–R25k',
  '25k-50k': 'R25k–R50k', '50k-plus': 'R50k+', 'discuss': 'Discuss',
};

export default function AdminQuotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [filterStatus, setFilterStatus] = useState('');

  const fetchQuotes = () => {
    const params = filterStatus ? `?status=${filterStatus}` : '';
    api.get(`/quotes${params}`)
      .then(({ data }) => setQuotes(data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchQuotes(); }, [filterStatus]);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/quotes/${id}`, { status });
      toast.success('Status updated.');
      fetchQuotes();
      if (selected?._id === id) setSelected(prev => ({ ...prev, status }));
    } catch { toast.error('Update failed.'); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-mist text-xs tracking-widest uppercase mb-1">Manage</p>
          <h1 className="font-display text-4xl text-ivory">Quote Requests</h1>
        </div>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="input-field w-40 bg-graphite text-sm">
          <option value="">All Status</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
      </div>

      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-graphite/30 animate-pulse" />)}</div>
      ) : quotes.length === 0 ? (
        <div className="border border-ash/40 py-20 text-center">
          <p className="text-mist text-sm">No quote requests found.</p>
        </div>
      ) : (
        <div className="border border-ash/40 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-ash/40 bg-graphite/30">
              <tr>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono">Client</th>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono hidden md:table-cell">Project</th>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono hidden lg:table-cell">Budget</th>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q._id} className="border-b border-ash/20 hover:bg-graphite/20 transition-colors cursor-pointer" onClick={() => setSelected(q)}>
                  <td className="px-4 py-3">
                    <p className="text-ivory">{q.name}</p>
                    <p className="text-mist text-xs">{q.email}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-silver text-xs capitalize">{q.projectType?.replace('-', ' ')}</td>
                  <td className="px-4 py-3 hidden lg:table-cell text-mist text-xs">{BUDGET_LABELS[q.budgetRange] || '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-mono px-2 py-1 border ${STATUS_COLORS[q.status]}`}>{q.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <select value={q.status} onChange={e => { e.stopPropagation(); updateStatus(q._id, e.target.value); }} onClick={e => e.stopPropagation()}
                      className="bg-graphite border border-ash text-silver text-xs px-2 py-1 focus:outline-none focus:border-gold">
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {selected && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-obsidian/80 z-40" onClick={() => setSelected(null)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-carbon border-l border-ash/40 z-50 overflow-y-auto p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-display text-2xl text-ivory">Quote Detail</h2>
                <button onClick={() => setSelected(null)} className="text-mist hover:text-ivory"><X size={18} /></button>
              </div>

              <div className="space-y-4">
                {[
                  ['Client', selected.name],
                  ['Email', selected.email],
                  ['Phone', selected.phone || '—'],
                  ['Project Type', selected.projectType?.replace('-', ' ')],
                  ['Budget', BUDGET_LABELS[selected.budgetRange] || '—'],
                  ['Deadline', selected.deadline ? new Date(selected.deadline).toDateString() : '—'],
                  ['Submitted', new Date(selected.createdAt).toLocaleString('en-ZA')],
                ].map(([label, val]) => (
                  <div key={label} className="flex gap-4">
                    <span className="text-mist text-xs tracking-widest uppercase w-24 flex-shrink-0 pt-0.5">{label}</span>
                    <span className="text-ivory text-sm capitalize">{val}</span>
                  </div>
                ))}

                <div>
                  <p className="text-mist text-xs tracking-widest uppercase mb-2">Project Description</p>
                  <p className="text-silver text-sm leading-relaxed bg-graphite/40 p-3">{selected.description}</p>
                </div>

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

                <a href={`mailto:${selected.email}?subject=Re: Your Quote Request&body=Hi ${selected.name},%0A%0AThanks for your project brief!%0A%0A`}
                  className="btn-outline w-full justify-center text-xs mt-4 block text-center">
                  Reply via Email
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
