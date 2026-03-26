import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Pencil, Trash2, X, Star, StarOff, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../utils/api';

const EMPTY_FORM = { title: '', description: '', category: 'video', mediaType: 'image', embedUrl: '', client: '', year: new Date().getFullYear(), tags: '', featured: false, isPublished: true };

export default function AdminPortfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef();
  const { register, handleSubmit, reset, watch, setValue, formState: { isSubmitting } } = useForm({ defaultValues: EMPTY_FORM });

  const mediaType = watch('mediaType');

  const fetchItems = () => {
    api.get('/portfolio?all=true')
      .then(({ data }) => setItems(data.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchItems(); }, []);

  const openNew = () => { reset(EMPTY_FORM); setEditing(null); setShowForm(true); };
  const openEdit = (item) => {
    reset({ ...item, tags: item.tags?.join(', ') || '' });
    setEditing(item._id);
    setShowForm(true);
  };

  const onSubmit = async (data) => {
    try {
      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => { if (v !== undefined && v !== '') fd.append(k, v); });
      if (fileRef.current?.files[0]) fd.append('media', fileRef.current.files[0]);

      if (editing) {
        await api.put(`/portfolio/${editing}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Item updated!');
      } else {
        await api.post('/portfolio', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
        toast.success('Item added!');
      }
      setShowForm(false);
      fetchItems();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error saving item.');
    }
  };

  const deleteItem = async (id) => {
    if (!confirm('Delete this portfolio item?')) return;
    try {
      await api.delete(`/portfolio/${id}`);
      toast.success('Deleted.');
      fetchItems();
    } catch { toast.error('Error deleting item.'); }
  };

  const toggleField = async (id, field, current) => {
    try {
      await api.put(`/portfolio/${id}`, { [field]: !current });
      fetchItems();
    } catch { toast.error('Update failed.'); }
  };

  const categoryBadge = { video: 'text-blue-400', photography: 'text-emerald-400', editing: 'text-purple-400' };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-mist text-xs tracking-widest uppercase mb-1">Manage</p>
          <h1 className="font-display text-4xl text-ivory">Portfolio</h1>
        </div>
        <button onClick={openNew} className="btn-primary flex items-center gap-2 text-xs">
          <Plus size={14} /> Add Item
        </button>
      </div>

      {/* Items table */}
      {loading ? (
        <div className="space-y-2">{[...Array(5)].map((_, i) => <div key={i} className="h-14 bg-graphite/30 animate-pulse" />)}</div>
      ) : items.length === 0 ? (
        <div className="border border-ash/40 py-20 text-center">
          <p className="text-mist text-sm">No portfolio items yet.</p>
          <button onClick={openNew} className="btn-outline mt-4 text-xs">Add First Item</button>
        </div>
      ) : (
        <div className="border border-ash/40 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-ash/40 bg-graphite/30">
              <tr>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono">Title</th>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono hidden lg:table-cell">Type</th>
                <th className="text-center px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono">Featured</th>
                <th className="text-center px-4 py-3 text-mist text-xs tracking-widest uppercase font-mono">Published</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id} className="border-b border-ash/20 hover:bg-graphite/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {(item.thumbnailUrl || item.mediaUrl) && item.mediaType === 'image' ? (
                        <img src={item.thumbnailUrl || item.mediaUrl} alt="" className="w-10 h-8 object-cover bg-carbon flex-shrink-0" />
                      ) : (
                        <div className="w-10 h-8 bg-carbon flex-shrink-0" />
                      )}
                      <span className="text-ivory">{item.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`text-xs font-mono uppercase ${categoryBadge[item.category]}`}>{item.category}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-mist text-xs">{item.mediaType}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleField(item._id, 'featured', item.featured)} className="text-mist hover:text-gold transition-colors">
                      {item.featured ? <Star size={15} className="text-gold fill-gold" /> : <StarOff size={15} />}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => toggleField(item._id, 'isPublished', item.isPublished)} className="text-mist hover:text-ivory transition-colors">
                      {item.isPublished ? <Eye size={15} className="text-emerald-400" /> : <EyeOff size={15} />}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(item)} className="p-1.5 text-mist hover:text-gold transition-colors"><Pencil size={13} /></button>
                      <button onClick={() => deleteItem(item._id)} className="p-1.5 text-mist hover:text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Slide-in form */}
      <AnimatePresence>
        {showForm && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-obsidian/80 z-40"
              onClick={() => setShowForm(false)}
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-lg bg-carbon border-l border-ash/40 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-display text-2xl text-ivory">{editing ? 'Edit Item' : 'Add Portfolio Item'}</h2>
                  <button onClick={() => setShowForm(false)} className="text-mist hover:text-ivory"><X size={18} /></button>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">Title *</label>
                    <input {...register('title', { required: true })} className="input-field" placeholder="Project title" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">Category *</label>
                      <select {...register('category')} className="input-field bg-graphite">
                        <option value="video">Video</option>
                        <option value="photography">Photography</option>
                        <option value="editing">Editing</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">Media Type *</label>
                      <select {...register('mediaType')} className="input-field bg-graphite">
                        <option value="image">Image</option>
                        <option value="video">Video</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">
                      {mediaType === 'image' ? 'Upload Image' : 'Upload Video or Enter Embed URL'}
                    </label>
                    <input ref={fileRef} type="file" accept={mediaType === 'image' ? 'image/*' : 'video/*,image/*'} className="input-field text-mist file:mr-3 file:text-xs file:bg-graphite file:border-0 file:text-gold file:py-1 file:px-2" />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">Embed URL (YouTube / Vimeo)</label>
                    <input {...register('embedUrl')} className="input-field" placeholder="https://youtube.com/watch?v=..." />
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">Description</label>
                    <textarea {...register('description')} rows={3} className="input-field resize-none" placeholder="Short description..." />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">Client</label>
                      <input {...register('client')} className="input-field" placeholder="Client name" />
                    </div>
                    <div>
                      <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">Year</label>
                      <input {...register('year')} type="number" className="input-field" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-1.5">Tags (comma-separated)</label>
                    <input {...register('tags')} className="input-field" placeholder="wedding, cape town, cinematic" />
                  </div>

                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input {...register('featured')} type="checkbox" className="w-4 h-4 accent-gold" />
                      <span className="text-silver text-sm">Featured</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input {...register('isPublished')} type="checkbox" className="w-4 h-4 accent-gold" defaultChecked />
                      <span className="text-silver text-sm">Published</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-ash/40">
                    <button type="submit" disabled={isSubmitting} className="btn-primary flex-1 justify-center disabled:opacity-50 text-xs">
                      {isSubmitting ? 'Saving...' : (editing ? 'Save Changes' : 'Add Item')}
                    </button>
                    <button type="button" onClick={() => setShowForm(false)} className="btn-outline px-5 text-xs">Cancel</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
