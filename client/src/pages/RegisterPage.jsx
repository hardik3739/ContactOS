import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Zap } from 'lucide-react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    try {
      const res = await api.post('/auth/register', data);
      login(res.data.token, res.data.user);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4 transition-colors duration-300">
      <div className="w-full max-w-sm">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-glow">
            <Zap size={16} className="text-white" />
          </div>
          <span className="font-semibold text-textMain text-xl tracking-tight">ContactOS</span>
        </div>

        <div className="glass rounded-2xl p-8 shadow-2xl card-hover">
          <div className="mb-8 text-center">
            <h1 className="text-xl font-bold text-textMain mb-1">Create an account</h1>
            <p className="text-sm text-textMuted">Start managing your contacts</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="text-xs font-medium text-textMuted block mb-1.5">Name</label>
              <input {...register('name', { required: true })} className="input" placeholder="Full name" />
            </div>
            <div>
              <label className="text-xs font-medium text-textMuted block mb-1.5">Email</label>
              <input {...register('email', { required: true })} type="email" className="input" placeholder="you@example.com" />
            </div>
            <div>
              <label className="text-xs font-medium text-textMuted block mb-1.5">Password</label>
              <input {...register('password', { required: true, minLength: 6 })} type="password" className="input" placeholder="••••••••" />
              {errors.password && <p className="text-[10px] text-red-500 mt-1">Min 6 chars</p>}
            </div>
            <button type="submit" disabled={isSubmitting} className="btn-primary w-full mt-2 py-2.5">
              {isSubmitting ? 'Creating account...' : 'Create account'}
            </button>
          </form>

          <p className="text-center text-xs text-textMuted mt-6">
            Already have an account? <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
