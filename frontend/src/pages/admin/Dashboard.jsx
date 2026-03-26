import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Images, Calendar, FileText, Clock } from 'lucide-react';
import api from '../../utils/api';

function StatCard({ label, value, sub, icon: Icon, to }) {
  return (
    <Link to={to} className="border border-ash/40 p-6 hover:border-gold/40 transition-colors group">
      <div className="flex items-start justify-between mb-4">
        <Icon size={18} className="text-gold" />
        {sub && <span className="text-xs font-mono text-amber bg-amber/10 px-2 py-0.5">{sub}</span>}
      </div>
      <p className="font-display text-4xl text-ivory">{value ?? '—'}</p>
      <p className="text-mist text-xs tracking-widest uppercase mt-2">{label}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/admin/stats')
      .then(({ data }) => setStats(data.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const serviceLabel = { 'video-editing': 'Video Editing', 'event-videography': 'Videography', 'photography': 'Photography', 'other': 'Other' };
  const statusColor = { pending: 'text-amber', confirmed: 'text-emerald-400', cancelled: 'text-red-400', completed: 'text-mist', new: 'text-amber', reviewed: 'text-blue-400', quoted: 'text-gold' };

  return (
    <div>
      <div className="mb-8">
        <p className="text-mist text-xs tracking-widest uppercase mb-1">Welcome back</p>
        <h1 className="font-display text-4xl text-ivory">Dashboard</h1>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <div key={i} className="border border-ash/40 p-6 h-28 animate-pulse bg-graphite/30" />)}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Portfolio Items" value={stats?.portfolio} icon={Images} to="/admin/portfolio" />
          <StatCard label="Total Bookings" value={stats?.bookings?.total} sub={stats?.bookings?.pending ? `${stats.bookings.pending} pending` : null} icon={Calendar} to="/admin/bookings" />
          <StatCard label="Quote Requests" value={stats?.quotes?.total} sub={stats?.quotes?.new ? `${stats.quotes.new} new` : null} icon={FileText} to="/admin/quotes" />
          <StatCard label="Response Time" value="< 48h" icon={Clock} to="/admin/bookings" />
        </div>
      )}

      {/* Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent bookings */}
        <div className="border border-ash/40 p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-ivory font-body font-medium">Recent Bookings</h2>
            <Link to="/admin/bookings" className="text-gold text-xs tracking-widest uppercase hover:underline">View all</Link>
          </div>
          {stats?.recentBookings?.length === 0 ? (
            <p className="text-mist text-sm">No bookings yet.</p>
          ) : (
            <div className="space-y-3">
              {stats?.recentBookings?.map(b => (
                <div key={b._id} className="flex items-center justify-between py-2 border-b border-ash/30 last:border-0">
                  <div>
                    <p className="text-ivory text-sm">{b.name}</p>
                    <p className="text-mist text-xs">{serviceLabel[b.service]}</p>
                  </div>
                  <span className={`text-xs font-mono uppercase ${statusColor[b.status]}`}>{b.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent quotes */}
        <div className="border border-ash/40 p-6">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-ivory font-body font-medium">Recent Quotes</h2>
            <Link to="/admin/quotes" className="text-gold text-xs tracking-widest uppercase hover:underline">View all</Link>
          </div>
          {stats?.recentQuotes?.length === 0 ? (
            <p className="text-mist text-sm">No quote requests yet.</p>
          ) : (
            <div className="space-y-3">
              {stats?.recentQuotes?.map(q => (
                <div key={q._id} className="flex items-center justify-between py-2 border-b border-ash/30 last:border-0">
                  <div>
                    <p className="text-ivory text-sm">{q.name}</p>
                    <p className="text-mist text-xs capitalize">{q.projectType?.replace('-', ' ')}</p>
                  </div>
                  <span className={`text-xs font-mono uppercase ${statusColor[q.status]}`}>{q.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
