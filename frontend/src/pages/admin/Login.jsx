import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    setError('');
    try {
      await login(data.email, data.password);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="min-h-screen bg-obsidian flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-display text-3xl text-ivory tracking-widest">JEFTE</p>
          <p className="text-mist text-xs mt-2 tracking-widest uppercase">Admin Panel</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="border border-ash/40 p-8 space-y-5">
          <div>
            <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-2">Email</label>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="admin@jefte.com"
              className="input-field"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="block text-xs font-mono tracking-widest uppercase text-silver mb-2">Password</label>
            <div className="relative">
              <input
                {...register('password', { required: true })}
                type={showPw ? 'text' : 'password'}
                placeholder="••••••••"
                className="input-field pr-10"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mist hover:text-silver"
              >
                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-obsidian border-t-transparent rounded-full animate-spin" />
                Signing in...
              </span>
            ) : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
